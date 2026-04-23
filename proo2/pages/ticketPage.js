import { store } from "../context/store.js";
import { currency } from "../utils/helpers.js";

export const ticketPage = () => {
  const ticket = store.activeBooking || store.bookings[0];
  if (!ticket) return `<div class="card-pro p-4">No ticket yet. Complete a booking first.</div>`;
  const trip = ticket.trip || store.trips.find((t) => t.id === ticket.tripId);
  return `
    <section class="row justify-content-center">
      <div class="col-lg-7">
        <div class="ticket-ui card-pro fade-in">
          <div class="ticket-header p-4">
            <h4 class="mb-1">Your E-Ticket</h4>
            <small>Booking ID: ${ticket.id}</small>
          </div>
          <div class="p-4">
            <div class="d-flex justify-content-between">
              <div>
                <div class="small text-secondary">Route</div>
                <div class="fw-semibold">${trip.from} to ${trip.to}</div>
              </div>
              <div class="text-end">
                <div class="small text-secondary">Time</div>
                <div class="fw-semibold">${trip.time} - ${trip.date}</div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div><div class="small text-secondary">Seats</div><div class="fw-semibold">${ticket.seats.join(", ")}</div></div>
              <div class="text-end"><div class="small text-secondary">Total Paid</div><div class="fw-semibold">${currency(ticket.total)}</div></div>
            </div>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="small text-secondary">QR Code Style</div>
                <code>${ticket.qrCode}</code>
              </div>
              <div class="card-pro p-3 text-center">
                <div style="font-family: monospace; letter-spacing: 2px;">||| || |||</div>
                <small>Scan Gate</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};
