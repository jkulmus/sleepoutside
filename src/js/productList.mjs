import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}"/>
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default async function productList(category, selector) {
    const parentElement = document.querySelector(selector);
    const data = await getData(category);
    const featured = data.slice(0, 4);
    renderListWithTemplate(productCardTemplate, parentElement, featured);
}
