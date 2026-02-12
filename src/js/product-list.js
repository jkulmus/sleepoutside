import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);




const label = category
  .split("-")
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(" ");

document.querySelector("h1").textContent = `Top Products: ${label}`;

productList(".product-list", catagory);