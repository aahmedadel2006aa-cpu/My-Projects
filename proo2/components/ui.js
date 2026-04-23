import { currency } from "../utils/helpers.js";

export const tripCard = (trip) => `
  <article class="card-pro p-3 p-md-4 fade-in">
    <div class="d-flex justify-content-between align-items-start gap-3">
      <div>
        <h5 class="mb-1">${trip.from} <span class="text-secondary">to</span> ${trip.to}</h5>
        <div class="text-secondary small">${trip.date} - ${trip.time} - ${trip.duration}</div>
        <div class="mt-2"><span class="badge text-bg-primary-subtle">${trip.type}</span> <span class="badge text-bg-light">${trip.operator}</span></div>
      </div>
      <div class="text-end">
        <h5 class="mb-1">${currency(trip.price)}</h5>
        <small class="text-secondary">per seat</small>
      </div>
    </div>
    <div class="mt-3 d-flex gap-2">
      <button class="btn-primary-pro" data-action="book-now" data-trip="${trip.id}">Book Now</button>
      <button class="btn-secondary-pro" data-action="view-seats" data-trip="${trip.id}">View Seats</button>
    </div>
  </article>
`;

export const skeletonCard = () => `
  <div class="card-pro p-4">
    <div class="skeleton mb-2" style="height: 22px;"></div>
    <div class="skeleton mb-3" style="height: 16px; width: 75%;"></div>
    <div class="skeleton mb-2" style="height: 14px; width: 50%;"></div>
    <div class="skeleton" style="height: 38px;"></div>
  </div>
`;

export const seatButton = (seat, isBooked, isSelected) => `
  <button
    class="seat-btn ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}"
    ${isBooked ? "disabled" : ""}
    data-action="toggle-seat"
    data-seat="${seat}"
  >
    ${seat}
  </button>
`;

export const toastTemplate = (message, type) => `
  <div class="toast-item">
    <div class="fw-semibold mb-1">${type === "danger" ? "Error" : "Success"}</div>
    <div class="small text-secondary">${message}</div>
  </div>
`;
