const urlAPI = "http://localhost:3333/api/admin/products";

const fetchAPI = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const allProduct = data.allProduct;
    // console.log(data.allProduct);
    generateData(allProduct);
  } catch (error) {
    console.log(error.message);
  }
};
console.log(fetchAPI(urlAPI));
const product = document.querySelector(".product");

const generateData = (data) => {
  const showhtml = data.map((value, index) => {
    return `
    <div class="all-product">
    <img src=${value.thumbnail} alt="" class="product-thumbnail">
    <h5 class="product-name">${value.productName}</h5>
    <p class="product-price">${value.price}</p>
    </div>
`;
  });
  product.innerHTML = showhtml;
};
