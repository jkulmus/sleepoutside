import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const originalPrice = product.SuggestedRetailPrice;
    const final = product.FinalPrice ?? originalPrice;

    const discount = final < originalPrice;
    const discountPercentage = discount
        ? Math.round(((originalPrice - final) / originalPrice) * 100)
        : 0;
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
        <p class="discount__badge">
            -${discountPercentage}%</span>
        </p>
        <img
          src="${product.Image}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${final}</p>
        <p class="card__price">$${originalPrice}
        <p class="sale__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default async function productList(selector, category) { 
  const el = document.querySelector(selector); 
  
  const products = await getData(category);

  renderListWithTemplate(productCardTemplate, el, products); 
}
