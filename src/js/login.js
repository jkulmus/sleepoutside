import { loadHeaderFooter, getParam } from "../utils.mjs";
import { login } from "../auth.js";

loadHeaderFooter();

const redirect = getParam(redirect);

document.querySelector("#login-button").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login({ email, password }, redirect);
});
