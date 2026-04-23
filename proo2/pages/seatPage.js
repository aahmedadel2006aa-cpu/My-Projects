import { seatButton } from "../components/ui.js";
import { store } from "../context/store.js";
import { currency } from "../utils/helpers.js";

export const seatPage = () => {
  if (!store.selectedTrip) {
    return `<div class="card-pro p-4">No trip selected yet. Please choose one from <a href="#/search">Search</a>.</div>`;
  }
  const booked = store.bookedSeatsMap[store.selectedTrip.id] || [];
  const seatsHtml = store.allSeats
    .map((seat) => seatButton(seat, booked.includes(seat), store.selectedSeats.includes(seat)))
    .join("");
  const total = store.selectedSeats.length * store.selectedTrip.price;
  return `
    <section class="row g-3">
      <div class="col-lg-8">
        <div class="card-pro p-3 p-md-4">
          <h4>Select Seats</h4>
          <p class="text-secondary mb-3">${store.selectedTrip.from} to ${store.selectedTrip.to} - ${store.selectedTrip.time}</p>
          <div class="seat-grid">${seatsHtml}</div>
          <div class="d-flex gap-3 mt-3 small text-secondary">
            <span><span class="badge text-bg-light"> </span> Available</span>
            <span><span class="badge text-bg-danger"> </span> Booked</span>
            <span><span class="badge text-bg-primary"> </span> Selected</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-pro p-3 p-md-4">
          <h5>Booking Summary</h5>
          <div class="text-secondary small">Seats: ${store.selectedSeats.join(", ") || "-"}</div>
          <div class="mt-2">Price per seat: <strong>${currency(store.selectedTrip.price)}</strong></div>
          <div class="mt-1">Total: <strong>${currency(total)}</strong></div>
          <button class="btn-primary-pro w-100 mt-3" data-action="proceed-payment">Proceed to Payment</button>
        </div>
      </div>
    </section>
  `;
};
