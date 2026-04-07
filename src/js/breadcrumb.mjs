export function setBreadcrumb(text) {
    const crumb = document.querySelector(".breadcrumb");
    if (crumb) {
        crumb.textContent = text;
    }
}