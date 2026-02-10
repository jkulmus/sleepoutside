import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alert.js";

loadHeaderFooter();
loadAlerts();

productList(".product-list", "tents");