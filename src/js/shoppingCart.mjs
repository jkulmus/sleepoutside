import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const groupedItems = groupedCartItems(cartItems);
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
    totalEl.textContent = total.toFixed(2);
  }

  if (summaryEl) {
    summaryEl.style.display = "block";
  }

  addRemoveListeners(groupedItems);
}

function groupedCartItems(items) {
  const grouped = {};

  items.forEach((item) => {
    const id = item.Id;
    if (!grouped[id]) {
      grouped[id] = {
        ...item,
        quantity: item.quantity || 1
      };
    } else {
      grouped[id].quantity += item.quantity || 1;
    }
  });

  return Object.values(grouped);
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || "";
  const color = item.Colors?.[0]?.ColorName || "N/A";
  const quantity = item.quantity || 1;
  const lineTotal = (item.FinalPrice * quantity).toFixed(2);

  return  `
    <li class="cart-card divider">
      <span class="cart-card__remove" data-id="${item.Id}" aria-label="Remove item">✖</span>

      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${image}" alt="${item.Name}" />
      </a>

      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: ${quantity}</p>
      <p class="cart-card__price">$${lineTotal}</p>
    </li>
  `;
}

function addRemoveListeners(groupedItems) {
  const removeButtons = document.querySelectorAll(".cart-card__remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      removeItemFromCart(id, groupedItems);
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
          quantity: item.quantity - 1,
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
        quantity: 1
      });
    }
  });

  setLocalStorage("so-cart", expandedItems);
  shoppingCart();
}

function calculateListTotal(list) {
  return list.reduce((sum, item) => {
    return sum + item.FinalPrice * (item.quantity || 1);
  }, 0);
}