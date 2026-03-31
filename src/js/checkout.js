import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

await loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );
}

const checkoutForm = document.querySelector("#checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout(e.target);
  });
}