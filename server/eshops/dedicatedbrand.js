const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');


/**
 * Parse webpage e-shop for Dedicated
 * @param  {String} data - html response
 * @return {Array} products
 */
const parseDedicated = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );
      const brand = 'Dedicated';


      return {name, price, brand};
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
      const products = parseDedicated(body);

      // Write the products to a JSON file
      fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

      return products;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
