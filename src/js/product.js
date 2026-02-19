import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // always store the cart as an array
  const cart = getLocalStorage("so-cart");
  const cartArray = Array.isArray(cart) ? cart : [];
  cartArray.push(product);
  setLocalStorage("so-cart", cartArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.currentTarget.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
