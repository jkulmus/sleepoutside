import { findProductById } from "./externalServices.mjs";
import { 
  setLocalStorage, 
  getLocalStorage, 
  alertMessage 
} from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  try {
    product = await findProductById(productId);
    console.log("Loaded product:", product);

    if (!product || !product.Id) {
      throw new Error("Product data was not returned correctly.");
    }

    renderProductDetails();

    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", addToCart);
    }
  } catch (error) {
    console.error("Error loading product details:", error);
    const section = document.querySelector(".product-detail");
    if (section) {
      section.innerHTML = "<p>Sorry, this product could not be loaded.</p>";
    }
  }
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart") || [];
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = 
    product.Brand?.Name || "";

  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand || "";

  document.querySelector("#productImage").src = 
    product.Images.PrimaryLarge || "";

  document.querySelector("#productImage").alt = 
    product.Name || "Product image";

  document.querySelector("#productFinalPrice").innerText = 
    product.FinalPrice ?? "";

  document.querySelector("#productColorName").innerText =
    product.Colors?.[0]?.ColorName || "N/A";

  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple || "<p>No description available.</p>";
    
  document.querySelector("#addToCart").dataset.id = product.Id;
}
