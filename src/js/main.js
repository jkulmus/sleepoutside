import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alert.js";

async function init() {
    await loadHeaderFooter();
    loadAlerts();
}

init();