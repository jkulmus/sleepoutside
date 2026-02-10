import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartCount } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  outputEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-card__remove")) {
      const idToRemove = e.target.dataset.id;
      removeFromCart(idToRemove);
    }
  });
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");

  const index = cartItems.findIndex((item) => item.Id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  
  setLocalStorage("so-cart", cartItems);
  ShoppingCart();
  updateCartCount();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}