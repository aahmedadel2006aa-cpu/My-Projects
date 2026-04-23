import { store } from "../context/store.js";

const navLink = (label, hash) =>
  `<a class="nav-link ${location.hash === hash ? "fw-bold text-primary" : "text-secondary"}" href="${hash}">${label}</a>`;

export const appLayout = (content) => `
  <div class="app-shell">
    <header class="navbar-pro">
      <div class="container py-3 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2">
          <div class="brand-pill">ST</div>
          <div>
            <div class="fw-bold">Smart Transport</div>
            <small class="text-secondary">Book, ride, arrive</small>
          </div>
        </div>
        <nav class="d-none d-md-flex gap-2 align-items-center">
          ${navLink("Home", "#/")}
          ${navLink("Search", "#/search")}
          ${navLink("Seats", "#/seats")}
          ${navLink("Payment", "#/payment")}
          ${navLink("Profile", "#/profile")}
          ${navLink("Ticket", "#/ticket")}
          <button class="btn-secondary-pro ms-2" id="dark-mode-btn">${store.ui.darkMode ? "Light" : "Dark"} mode</button>
        </nav>
      </div>
    </header>
    <main class="container py-4">${content}</main>
  </div>
`;
