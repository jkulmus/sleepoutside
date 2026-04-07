import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { setBreadcrumb } from "./breadcrumb.mjs";

loadHeaderFooter();

async function loadList(){
    const category = getParam("category") || "tents";
    const products = await productList(category, ".product-list");

    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    setBreadcrumb(`${categoryName} (${products.length} items)`);
}

loadList();