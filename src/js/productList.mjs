import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const originalPrice = product.SuggestedRetailPrice ?? product.FinalPrice;
  const finalPrice = product.FinalPrice ?? originalPrice;
  const hasDiscount = originalPrice > finalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  return `
    <li class="product-card">
      ${
        hasDiscount
          ? `<span class="discount__badge">${discountPercentage}% OFF</span>`
          : ""
      }
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>

      ${
        hasDiscount
          ? `
            <p>
              <span class="card__price">$${Number(originalPrice).toFixed(2)}</span>
              <span class="sale__price">$${Number(finalPrice).toFixed(2)}</span>
              </p>
            `
            : `<p class="product-card__price">$${Number(finalPrice).toFixed(2)}</p>`
      }
    </a>
  </li>
  `;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  if (!el) return;

  const products = await getProductsByCategory(category);
  renderListWithTemplate(productCardTemplate, el, products);

  const title = document.querySelector(".title");
  if (title) {
    title.textContent = category.replace("-", " ");
  }
}
