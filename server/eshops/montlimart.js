const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs =require('fs');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.products-list .products-list__block*')
    .map((i, element) => {
      const name = $(element)
        .find('.text-reset')
        .text()
        .trim()
        .replace(/\s/g, ' ');

      const color = $(element)
        .find('.product-miniature__color')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.product-miniature__pricing')
          .text(),
        10
      );
      if(color != ''){
        const brand = 'CircleSportswear';
        return {name, color, price};
      }
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();
      const products = parse(body);

      // Write the products to a JSON file
      fs.writeFileSync('productsmonlimart.json', JSON.stringify(products, null, 2));

      return products;
    }
    
    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};