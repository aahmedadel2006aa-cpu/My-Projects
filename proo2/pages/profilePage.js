import { store } from "../context/store.js";
import { currency } from "../utils/helpers.js";

export const profilePage = () => {
  const history = store.bookings
    .map(
      (booking) => `
        <tr>
          <td>${booking.id}</td>
          <td>${booking.trip?.from || "-"} to ${booking.trip?.to || "-"}</td>
          <td>${booking.seats.join(", ")}</td>
          <td>${currency(booking.total)}</td>
          <td><span class="badge text-bg-success">${booking.status}</span></td>
        </tr>
      `
    )
    .join("");
  return `
    <section class="dashboard">
      <aside class="card-pro p-3 side-menu">
        <h6>Dashboard Menu</h6>
        <a class="d-block text-decoration-none mb-2" href="#/profile">Account</a>
        <a class="d-block text-decoration-none mb-2" href="#/ticket">My Ticket</a>
        <a class="d-block text-decoration-none" href="#/search">Book New Trip</a>
      </aside>
      <div class="d-grid gap-3">
        <div class="card-pro p-3 p-md-4">
          <h4>${store.user.name}</h4>
          <p class="mb-1 text-secondary">${store.user.email}</p>
          <p class="mb-0 text-secondary">${store.user.phone}</p>
          <div class="mt-3">Wallet Balance: <strong>${currency(store.user.walletBalance)}</strong></div>
        </div>
        <div class="card-pro p-3 p-md-4">
          <h5>Booking History</h5>
          <div class="table-responsive mt-2">
            <table class="table align-middle">
              <thead><tr><th>ID</th><th>Route</th><th>Seats</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>${history || "<tr><td colspan='5'>No bookings yet.</td></tr>"}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
};
