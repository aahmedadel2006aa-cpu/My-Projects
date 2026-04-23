import { appLayout } from "./components/layout.js";
import { toastTemplate } from "./components/ui.js";
import { setDarkMode, store } from "./context/store.js";
import { withFakeApi } from "./hooks/useFakeApi.js";
import { homePage } from "./pages/homePage.js";
import { paymentPage } from "./pages/paymentPage.js";
import { profilePage } from "./pages/profilePage.js";
import { searchPage } from "./pages/searchPage.js";
import { seatPage } from "./pages/seatPage.js";
import { ticketPage } from "./pages/ticketPage.js";
import { byId } from "./utils/helpers.js";

const routes = {
  "#/": homePage,
  "#/search": searchPage,
  "#/seats": seatPage,
  "#/payment": paymentPage,
  "#/profile": profilePage,
  "#/ticket": ticketPage
};

const addToast = (message, type = "success") => {
  const root = byId("toast-root");
  const node = document.createElement("div");
  node.innerHTML = toastTemplate(message, type);
  root.prepend(node.firstElementChild);
  setTimeout(() => root.lastElementChild?.remove(), 2200);
};

const hydrateBookings = () => {
  store.bookings = store.bookings.map((booking) => ({
    ...booking,
    trip: store.trips.find((trip) => trip.id === booking.tripId)
  }));
};

const render = () => {
  const hash = location.hash || "#/";
  const page = routes[hash] || homePage;
  document.body.classList.toggle("dark", store.ui.darkMode);
  byId("app").innerHTML = appLayout(page());
  bindEvents();
};

const bookTrip = (tripId, target = "#/seats") => {
  store.selectedTrip = store.trips.find((trip) => trip.id === tripId) || null;
  store.selectedSeats = [];
  location.hash = target;
};

const bindEvents = () => {
  byId("dark-mode-btn")?.addEventListener("click", () => {
    setDarkMode(!store.ui.darkMode);
    render();
  });

  byId("search-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    store.search.from = form.get("from");
    store.search.to = form.get("to");
    store.search.date = form.get("date");
    store.ui.loading = true;
    location.hash = "#/search";
    render();
    await withFakeApi(() => {
      store.ui.loading = false;
      render();
    });
  });

  byId("price-filter")?.addEventListener("input", (event) => {
    store.search.maxPrice = Number(event.target.value);
    render();
  });
  byId("time-filter")?.addEventListener("change", (event) => {
    store.search.timeFilter = event.target.value;
    render();
  });
  byId("sort-filter")?.addEventListener("change", (event) => {
    store.search.sortBy = event.target.value;
    render();
  });

  document.querySelectorAll("[data-action='book-now']").forEach((btn) => {
    btn.addEventListener("click", () => bookTrip(btn.dataset.trip, "#/seats"));
  });
  document.querySelectorAll("[data-action='view-seats']").forEach((btn) => {
    btn.addEventListener("click", () => bookTrip(btn.dataset.trip, "#/seats"));
  });

  document.querySelectorAll("[data-action='toggle-seat']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const seat = btn.dataset.seat;
      store.selectedSeats = store.selectedSeats.includes(seat)
        ? store.selectedSeats.filter((item) => item !== seat)
        : [...store.selectedSeats, seat];
      render();
    });
  });

  document.querySelector("[data-action='proceed-payment']")?.addEventListener("click", () => {
    if (!store.selectedSeats.length) return addToast("Please select at least one seat.", "danger");
    location.hash = "#/payment";
  });

  document.querySelector("[data-action='confirm-payment']")?.addEventListener("click", async () => {
    const selectedMethod = document.querySelector("input[name='paymentMethod']:checked")?.value || "Wallet";
    const total = store.selectedSeats.length * store.selectedTrip.price;
    if (selectedMethod === "Wallet" && store.user.walletBalance < total) {
      addToast("Insufficient wallet balance.", "danger");
      return;
    }
    store.ui.loading = true;
    render();
    await withFakeApi(() => {
      store.ui.loading = false;
      const booking = {
        id: `b${Date.now()}`,
        tripId: store.selectedTrip.id,
        trip: store.selectedTrip,
        seats: [...store.selectedSeats],
        total,
        status: "Confirmed",
        bookedAt: new Date().toISOString().slice(0, 10),
        paymentMethod: selectedMethod,
        qrCode: `QR-${store.selectedTrip.id}-${Date.now().toString().slice(-6)}`
      };
      if (selectedMethod === "Wallet") store.user.walletBalance -= total;
      store.bookings.unshift(booking);
      store.activeBooking = booking;
      store.bookedSeatsMap[store.selectedTrip.id] = [...(store.bookedSeatsMap[store.selectedTrip.id] || []), ...store.selectedSeats];
      store.selectedSeats = [];
      addToast("Payment successful. Ticket generated.");
      location.hash = "#/ticket";
      render();
    }, 900);
  });
};

if (!location.hash) location.hash = "#/";
hydrateBookings();
window.addEventListener("hashchange", render);
render();
