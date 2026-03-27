export default async function loadAlerts() {
    try {
        const response = await fetch("/json/alerts.json");
        if (!response.ok) throw new Error("Could not load alerts");

        const alerts = await response.json();
        if (!alerts || !alerts.length) return;

        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.classList.add("alert-list");

        const styles = {
            info: { background: "#b8c4ce", color: "#f7f9fb", icon: "ℹ️" },
            sale: { background: "#e3e8e2", color: "#0b5c3b", icon: "💸" }
        };

        alerts.forEach(alert => {
            const p = document.createElement("p");
            p.classList.add("alert-item");
            const style = styles[alert.type] || {};

            p.style.background = alert.background || style.background;
            p.style.color = alert.color || style.color;
            p.innerHTML = `<span class="alert-icon">${style.icon || "🔔"}</span> ${alert.message}`;

            const closeBtn = document.createElement("span");
            closeBtn.textContent = "✖";
            closeBtn.classList.add("alert-close");
            closeBtn.addEventListener("click", () => {
                p.classList.add("fade-out");
                setTimeout(() => p.remove(), 300);
            });

            p.appendChild(closeBtn);
            section.appendChild(p);
        });

        main.prepend(section);
    } catch (error) {
        console.error("Error loading alerts:", error);
    }
}