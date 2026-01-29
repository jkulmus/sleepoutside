import { getData } from '/productData.mjs';

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

function renderList(list, parentElement) {
    const htmlString = list.map(productCardTemplate);
    parentElement.adjacentHTML("afterbegin", htmlString.join(''));
}

export default async function productList(category, selector) {
    const parentElement = document.querySelector(selector);
    const data = await getData(category);
    renderList(data, parentElement);
}
