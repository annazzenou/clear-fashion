// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let allProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectFilter = document.querySelector('#filter-select');
const selectFilter2 = document.querySelector('#filter-select');

const selectSort = document.querySelector('#sort-select');

const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbRecentProducts = document.querySelector('#nbRecentProducts');
const spanNbBrands = document.querySelector('#nbBrands');

const spanP50Price = document.querySelector('#span50');
const spanP90Price = document.querySelector('#span90');
const spanP95Price = document.querySelector('#span95');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  allProducts = result;
  currentProducts = [...allProducts];
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */

const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

const filterProductsByBrand = brand => {
  const filteredProducts = currentProducts.filter(product => product.brand === brand);
  render(filteredProducts, {currentPage: 1, count: filteredProducts.length, pageCount: 1});
};

const filterProductsByReasonablePrice = filters => {
  const priceFilter = currentProducts.filter(product => product.price <= 50);
  render(priceFilter, {currentPage: 1, count: priceFilter.length, pageCount: 1});
};

const filterProductsByRecent = filters => {
  const recentFilter = currentProducts.filter(product => {
    const releasedDate = new Date(product.released);
    const today = new Date();
    const diffTime = Math.abs(today-releasedDate);
    const diffDays = Math.ceil(diffTime/(1000*60*60*24));
    return diffDays <=50; //50 days to check if the function works but should be 14 days according to the subject
  });
  render(recentFilter, {currentPage: 1, count: recentFilter.length, pageCount: 1});
};


const sortProducts = sortType => {
  let sortedProducts = [...currentProducts];
  switch(sortType) {
    case 'price-asc':
      sortedProducts.sort((a,b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a,b) => b.price - a.price);
      break;
    case 'date-asc':
      sortedProducts.sort((a,b) => {
      const date1 = new Date(a.released);
      const date2 = new Date(b.released);
      return date1 - date2;
      });
      break;
    case 'date-desc':
      sortedProducts.sort((a,b) => {
        const date1 = new Date(a.released);
        const date2 = new Date(b.released);
        return date2 - date1;
        });
      break;
    }
  render(sortedProducts, {currentPage: 1, count: sortedProducts.length, pageCount: 1});
};







/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;


  const brands = [...new Set(currentProducts.map(product => product.brand))];
  const options = brands
    .map(brand => `<option value="${brand}">${brand}</option>`)
    .join('');

  selectBrand.innerHTML = `<option value="">All brands</option>${options}`;

  const filters = ['By reasonable price', 'By recent products'];
  const options2 = filters
    .map(filters => `<option value="${filters}">${filters}</option>`)
    .join('');

  selectFilter.innerHTML = `<option value="">All filters</option>${options2}`;
  selectFilter2.innerHTML = `<option value="">All filters</option>${options2}`;


  spanNbProducts.innerHTML = count;
  spanNbRecentProducts.innerHTML = filterProductsByRecent.length ;
  spanNbBrands.innerHTML = brands.length;

  const { p50, p90, p95 } = calculatePricePercentiles();

  spanP50Price.innerHTML = `${p50.toFixed(2)} €`;
  spanP90Price.innerHTML = `${p90.toFixed(2)} €`;
  spanP95Price.innerHTML = `${p95.toFixed(2)} €`;

};


const calculatePricePercentiles = () => {
  const prices = currentProducts.map(product => product.price);
  const p50 = percentile(prices, 50);
  const p90 = percentile(prices, 90);
  const p95 = percentile(prices, 95);
  return { p50, p90, p95 };   
};

const percentile = (arr, p) => {
  if (arr.length === 0) return 0;
  const k = Math.floor((arr.length - 1) * p / 100);
  return quickselect(arr, k);
};

const quickselect = (arr, k) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const lows = arr.filter(x => x < pivot);
  const highs = arr.filter(x => x > pivot);
  const pivots = arr.filter(x => x === pivot);
  if (k < lows.length) {
    return quickselect(lows, k);
  } else if (k < lows.length + pivots.length) {
    return pivots[0];
  } else {
    return quickselect(highs, k - lows.length - pivots.length);
  }
};


const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


selectPage.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), undefined);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', () => { 
  const selectedBrand = selectBrand.value;
  filterProductsByBrand(selectedBrand);
});

selectFilter.addEventListener('change', () => { 
  const selectedFilter = selectFilter.value;
  filterProductsByReasonablePrice(selectedFilter);
});

selectFilter2.addEventListener('change', () => { 
  const selectedFilter2 = selectFilter2.value;
  filterProductsByRecent(selectedFilter2);
});

selectSort.addEventListener('change', () => {
  const selectedSort = selectSort.value;
  sortProducts(selectedSort);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
