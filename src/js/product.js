import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

await loadHeaderFooter();

const productId = getParam("product");

if (productId) {
    productDetails(productId);
} else {
    console.error("No product ID found");
}