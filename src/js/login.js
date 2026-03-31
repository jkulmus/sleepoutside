import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();

    const redirect = getParam("redirect") || "/";
        const loginButton = document.querySelector("#loginButton");
        
        if (loginButton) {
            loginButton.addEventListener("click", () => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            login({ email, password }, redirect);
        });
    }
}