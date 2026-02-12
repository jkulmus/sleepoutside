import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="/product.html?id=${product.id}">
            <img src="${product.Image}" alt="${product.Name}"/>
            <h2 class="card__brand">${product.Brand}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="card__price">$${product.SuggestedRetailPrice}</p>
        </a>
    </li>
    `;
}

function filterFeatured(list) {
    return list.slice(0, 4);
}

export default async function productList(category, selector) {
    const parentElement = document.querySelector(selector);

    const data = await getData(category);

    const featured = filterFeatured(data);

    renderListWithTemplate(
        productCardTemplate,
        parentElement,
        featured
    );
}
