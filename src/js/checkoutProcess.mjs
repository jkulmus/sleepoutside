import {
    setLocalStorage,
    getLocalStorage,
    alertMessage,
    removeAllAlerts,
} from "./utils.mjs"
import { checkout } from "./externalServices.mjs"

// Helper function
function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(([key, value]) => {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity || 1,
    }));
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,

    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = normalizeCart(getLocalStorage(key) || []);
        this.calculateItemSummary();
        this.calculateOrdertotal();
    },

    calculateItemSummary: function() {
        const summaryElement = document.querySelector(
            `${this.outputSelector} #cartTotal`
        );
        const itemNumElement = document.querySelector(
            `${this.outputSelector} #num-items`  
        );

        const totalItems = this.list.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );

        this.itemTotal = this.list.reduce(
            (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
            0
        );

        if (itemNumElement) {
            itemNumElement.innerText = totalItems;
        }

        if (summaryElement) {
            summaryElement.innerText = this.itemTotal.toFixed(2);
        }
    },

    calculateOrderTotal: function () {
        const totalItems = this.list.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );

        this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);

        this.displayOrderTotals();
    },

    displayOrderTotals: function () {
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const orderTotal = document.querySelector(
            `${this.outputSelector} #orderTotal`
        );

        if (shipping) shipping.innerText = this.shipping.toFixed(2);
        if (tax) tax.innerText = this.tax;
        if (orderTotal) orderTotal.innerText = this.orderTotal;
    },

    checkout: async function (form) {
        if (!this.list.length) {
            alertMessage("Your cart is empty.");
            return;
        }

        const json = formDataToJSON(form);
        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal;
        json.tax = this.shipping;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const res = await checkout(json);
            console.log(res);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            removeAllAlerts();

            if (err.message && typeof err.message === "object") {
                for (const message in err.message) {
                    alertMessage(err.message[message]);
                }
            } else {
                alertMessage("There was a problem placing your order.");
            }

            console.log(err);
        }
    },
};

function normalizeCart(items) {
    const grouped = {};

    items.forEach((item) => {
        const id = item.Id;
        if (!grouped[id]) {
            grouped[id] = {
                ...item,
                quantity: item.quantity || 1,
            };
        } else {
            grouped[id].quantity += item.quantity || 1;
        }
    });

    return Object.values(grouped);
}

export default checkoutProcess;