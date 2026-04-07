import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  try {
    product = await findProductById(productId);

    if (!product || !product.Id) {
      throw new Error("Product data was not returned correctly.");
    }

    renderProductDetails();

    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", addToCart);
    }
  } catch  {
    const section = document.querySelector(".product-detail");
    if (section) {
      section.innerHTML = `
      <h2>Product Not Found</h2>
      <p>Sorry, this product could not be loaded.</p>
      `;
    }

    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.style.display = "none";
    }
  }
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart") || [];
  const existingItem = cartContents.find((item) => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cartContents.push({
      ...product,
      quantity: 1,
    });
  }

  setLocalStorage("so-cart", cartContents);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails() {
  const brandName = product.Brand?.Name || "";
  const productName = product.NameWithoutBrand || "";
  const finalPrice = product.FinalPrice || "";
  const originalPrice = product.SuggestedRetailPrice ?? finalPrice;
  const hasDiscount = originalPrice > finalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  document.querySelector("#productName").innerText = brandName;
  document.querySelector("#productNameWithoutBrand").innerText = productName;

  document.querySelector("#productImage").src = product.Images.PrimaryLarge || "";
  document.querySelector("#productImage").alt = product.Name || "Product image";

  document.querySelector("#productFinalPrice").innerText = Number(finalPrice).toFixed(2);

  const originalPriceEl = document.querySelector("#productOriginalPrice");
  const discountBadgeEl = document.querySelector("#discountBadge");

  if (hasDiscount) {
    originalPriceEl.innerText = Number(originalPrice).toFixed(2);
    discountBadgeEl.innerText = `${discountPercent}% OFF`;
    originalPriceEl.style.display = "inline";
    discountBadgeEl.style.display = "inline-block";
  } else {
    originalPriceEl.style.display = "none";
    discountBadgeEl.style.display = "none";
  }

  document.querySelector("#productColorName").innerText =
    product.Colors?.[0]?.ColorName || "N/A";

  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple || "<p>No description available.</p>";
    
  document.querySelector("#addToCart").dataset.id = product.Id;
}
