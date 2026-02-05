// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  // fallback to [] prevents errors when empty
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  sq(selector).addEventListener("touched", (event) => {
    event.preventDefault();
    callback();
  });
  sq(selector).addEventListener("click", callback);
}

export function updateCartCount() {
  const cart = getLocalStorage("so-cart");
  const countElement = document.getElementById("cart-count");

  if (countElement) {
    if (cart.length > 0) {
      countElement.textContent = cart.length;
      countElement.style.display = "block";
    } else {
      countElement.style.display = "none";
    }
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn, 
  parentElement, 
  list, 
  position = "afterbegin", 
  clear = true) { 
  if (clear) 
    parentElement.innerHTML = ""; 
  const htmlStrings = list.map(templateFn); 
  parentElement.insertAdjacentHTML(position, htmlStrings.join("")); 
}