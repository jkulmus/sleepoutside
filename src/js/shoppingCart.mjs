import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() { 
  const cartItems = getLocalStorage("so-cart") || [];
  const groupedItems = groupCartItems(cartItems); 
  const outputEl = document.querySelector(".product-list");
  const totalEl = document.querySelector("#cart-total");
  const summaryEl = document.querySelector(".cart-summary");

  if (!outputEl) return;

  if (groupedItems.length === 0) {
    outputEl.innerHTML = "<li class='cart-empty'>Your cart is empty.</li>";
    if (totalEl) totalEl.textContent = "0.00";
    if (summaryEl) summaryEl.style.display = "none";
    return;
  }

  renderListWithTemplate(cartItemTemplate, outputEl, groupedItems);

  const total = calculateListTotal(groupedItems);
  if (totalEl) {
    total.textContent = total.toFixed(2);
  }

  if (summaryEl) {
    summaryEl.style.display = "block";
  }

  addRemoveListeners(groupedItems);
}

function groupCartItems(items) {
  const grouped = {};

  items.forEach((item) => {
    const id = item.Id;
    if (!grouped[id]) {
      grouped[id] = {
        ...item,
        quantity: item.quantity || 1,
      };
    } else {
      grouped[id].quantity += item.quantity || 1;
    }
  });

  return Object.values(grouped);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function addRemoveListeners(groupedItems) {
  const removeButtons = document.querySelectorAll(".cart-card_remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      removeItemFromCart(id, groupItems);
    });
  });
}

function removeItemFromCart(id, groupedItems) {
  const updatedItems = [];

  groupedItems.forEach((item) => {
    if (item.Id === id) {
      if ((item.quantity || 1) > 1) {
        updatedItems.push({
          ...item,
          quantity: item.quantity -1,
        });
      }
    } else {
      updatedItems.push(item);
    }
  });

  const expandedItems = [];

  updatedItems.forEach((item) => {
    const quantity = item.quantity || 1;
    for (let i = 0; i < quantity; i++) {
      expandedItems.push({
        ...item,
        quantity: 1,
      });
    }
  });

  setLocalStorage("so-cart", expandedItems);
  shoppingCart();
}