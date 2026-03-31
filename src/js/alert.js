export default async function loadAlerts() {
    try {
        const response = await fetch("/json/alerts.json");
        if (!response.ok) throw new Error("Could not load alerts");

        const alerts = await response.json();
        if (!alerts || !alerts.length) return;

        const main = document.querySelector("main");
        if (!main) return;

        const section = document.createElement("section");
        section.classList.add("alert-list");

        const styles = {
            info: { background: "#b8c4ce", color: "#f7f9fb", icon: "ℹ️" },
            sale: { background: "#e3e8e2", color: "#0b5c3b", icon: "💸" },
            warning: { background: "#fef3c7", color: "#92400e", icon: "⚠️"},
        };

        alerts.forEach((alert) => {
            const p = document.createElement("p");
            p.classList.add("alert-item", "slide-down");

            const style = styles[alert.type] || {};
            p.style.background = alert.background || style.background || "#eee";
            p.style.color = alert.color || style.color || "#333";

            p.innerHTML = `
                <span class="alert-icon">${style.icon || "🔔"}</span>
                <span>${alert.message}</span>
            `;

            const closeBtn = document.createElement("span");
            closeBtn.textContent = "✖";
            closeBtn.classList.add("alert-close");
            closeBtn.setAttribute("role", "button");
            closeBtn.setAttribute("aria-label", "Close alert");

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