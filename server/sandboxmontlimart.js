/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./eshops/montlimartbrand');
// https://www.montlimart.com/99-vetements
// https://www.montlimart.com/101-t-shirts
const montlimart = require('./eshops/montlimart');


async function sandbox (eshop = 'https://www.montlimart.com/101-t-shirts') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimart.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
