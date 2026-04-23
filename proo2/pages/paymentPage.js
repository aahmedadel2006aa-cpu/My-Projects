import { store } from "../context/store.js";
import { currency } from "../utils/helpers.js";

export const paymentPage = () => {
  if (!store.selectedTrip || !store.selectedSeats.length) {
    return `<div class="card-pro p-4">Please select a trip and seats first from <a href="#/seats">Seat Selection</a>.</div>`;
  }
  const total = store.selectedTrip.price * store.selectedSeats.length;
  return `
    <section class="row g-3">
      <div class="col-lg-7">
        <div class="card-pro p-3 p-md-4">
          <h4>Payment</h4>
          <p class="text-secondary mb-3">Choose your payment method and confirm your booking.</p>
          <div class="d-grid gap-2">
            <label class="card-pro p-3"><input type="radio" name="paymentMethod" value="Wallet" checked /> Wallet Balance</label>
            <label class="card-pro p-3"><input type="radio" name="paymentMethod" value="Card" /> Credit Card</label>
            <label class="card-pro p-3"><input type="radio" name="paymentMethod" value="Cash" /> Cash on Boarding</label>
          </div>
          <button class="btn-primary-pro mt-3" data-action="confirm-payment">Confirm & Generate Ticket</button>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card-pro p-3 p-md-4">
          <h5>Wallet</h5>
          <div class="display-6 fw-bold">${currency(store.user.walletBalance)}</div>
          <hr />
          <div class="small text-secondary">Trip: ${store.selectedTrip.from} to ${store.selectedTrip.to}</div>
          <div class="small text-secondary">Seats: ${store.selectedSeats.join(", ")}</div>
          <div class="mt-2 fs-5">Total: <strong>${currency(total)}</strong></div>
        </div>
      </div>
    </section>
  `;
};
