import {getLocalStorage} from "./utils.mjs"
import { checkout } from "./externalServices.mjs"

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
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },

    calculateItemSummary: function(){
        const summaryEl = document.querySelector(this.outputSelector + "#subtotal");
        const numItemsEL = document.querySelector(this.outputSelector + "#numItems");
        const amounts = this.list.map((item)=>item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item)=>sum+item);
        summaryEl.innerText = "$" + this.itemTotal;
    },

    calculateOrdertotal: function (){
        this.shipping = 10 + (this.list.length - 1) * 2 ;
        this.tax = (this.itemTotal * 0.06).toFixed (2);
        this.orderTotal = (
            parseFloat (this.itemTotal) + 
            parseFloat (this.shipping) +
            parseFloat (this.tax) 
        ).toFixed (2);
        this.displayOrderTotals();
    },

    displayOrderTotals: function () {
        const shipping = document.querySelector(this.outputSelector + "#shipping");
        const tax = document.querySelector(this.outputSelector + "#tax");
        const orderTotal = document.querySelector(this.outputSelector + "#orderTotal");
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;

    },

    packageItems: function (items) {
        const simpleItems = items.map((item) => {
            console.log(item);
            return {
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: 1,
            };
        });
        return simpleItems;
    },

    checkout: async function (form) {
    const json = formDataToJSON(form);
    json.orderData = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
        const res = await checkout(json);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
  },
};

export default checkoutProcess; 