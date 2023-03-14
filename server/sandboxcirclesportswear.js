/* eslint-disable no-console, no-process-exit */
const circlesportswearbrand = require('./eshops/circlesportswearbrand');


async function sandbox (eshop = 'https://shop.circlesportswear.com/collections/t-shirts-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlesportswearbrand.scrape(eshop);

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
