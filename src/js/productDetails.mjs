import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // fetch
  product = await findProductById(productId);
  // if no product found, exit
  if (!product) return;

  // render
  renderProductDetails();
  updateCartCount();

  // add to cart button
  const addButton = document.getElementById("addToCart");
  if (addButton) {
    addButton.onclick = addToCart;
  }
}

function addToCart() {
  const cart = getLocalStorage("so-cart");
  cart.push(product);
  setLocalStorage("so-cart", cart);

  // trigger icon animation
  const cartIcon = document.querySelector(".cart");
  if (cartIcon) {
    cartIcon.classList.add("animate-cart");
    setTimeout(() => cartIcon.classList.remove("animate-cart"), 400);
  }
  updateCartCount();
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;

  const imagePath = product.Image.replace("../", "/");
  document.querySelector("#productImage").src = imagePath;
  document.querySelector("#productImage").alt = product.Name;

  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
  if (product.Colors && product.Colors[0]) {
    document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName;
  }
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
} 
