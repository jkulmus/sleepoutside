
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;

  element.addEventListener("touched", (event) => {
    event.preventDefault();
    callback(event);
  });

  element.addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) return;

  if (clear) {
    parentElement.innerHTML = "";
  }

  if (!Array.isArray(list) || list.length === 0) return;

  const htmlString = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlString);
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) return;

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Could not load template: ${path}`);
    }
    return await res.text();
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html"); 
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  if (headerEl) {
    await renderWithTemplate(headerTemplateFn, headerEl);
  }

  if (footerEl) {
    await renderWithTemplate(footerTemplateFn, footerEl);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert-message");
  alerts.forEach((alert) => alert.remove());
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.className = "alert-message";
  alert.textContent = message;

  document.body.prepend(alert);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setTimeout(() => {
    alert.remove();
  }, 3000);
}