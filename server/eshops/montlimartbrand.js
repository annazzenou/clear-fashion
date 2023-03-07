const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');




/**
 * Parse webpage e-shop for Montlimart
 * @param  {String} data - html response
 * @return {Array} products
 */
const parseMontlimart = data => {
  const $ = cheerio.load(data);

  return $('.product-list .product-list__block*')
    .map((i, element) => {
      const name = $(element)
        .find('.product-miniature__title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseFloat(
        $(element)
          .find('.product-miniature__pricing')
          .text()
      );
      const category = 'Montlimart';

      return { name, price, category};
    })
    .get();
};

/**
 * Scrape all the products for a given url page and store them in a JSON file
 * @param  {[type]}  url
 * @return {Array|null}
 */


module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();
      const products2 = parseMontlimart(body);

      // Write the products to a JSON file
      fs.writeFileSync('products.json', JSON.stringify(products2, null, 2));

      return products;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
