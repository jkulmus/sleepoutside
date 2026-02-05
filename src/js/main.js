import productList from "./productList.mjs";
import { updateCartCount } from "./utils.mjs";

window.addEventListener("load", () => {
    updateCartCount();
    productList("tents", ".product-list");
});