const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');



/**
 * Parse webpage e-shop for Circle Sportswear
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-grid-container .grid__item')
    .map((i, element) => {
      const name = $(element)
        .find('.full-unstyled-link')
        .text()
        .trim()
        .replace(/ /g, '');
        
      const cutoffIndex = name.indexOf('\n');
      const newName = name.substring(0, cutoffIndex);
      
      const price = parseInt($(element).find('.money').text().replace('€',''),10);
      const brand = 'Circle Sportswear';


      return {newName, price, brand};
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
      const products = parse(body);

      // Write the products to a JSON file
      fs.writeFileSync('productsciclesportswear.json', JSON.stringify(products, null, 2));

      return products;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
