import { mockBookings, mockTrips, mockUser } from "../data/mockData.js";
import { seatCodes } from "../utils/helpers.js";

export const store = {
  ui: {
    darkMode: localStorage.getItem("darkMode") === "true",
    loading: false
  },
  search: {
    from: "Cairo",
    to: "Alexandria",
    date: "2026-04-25",
    maxPrice: 120,
    sortBy: "price-asc",
    timeFilter: "all"
  },
  user: { ...mockUser },
  trips: [...mockTrips],
  selectedTrip: null,
  selectedSeats: [],
  bookedSeatsMap: {
    t1: ["A1", "B3", "C2"],
    t2: ["A2", "D4"],
    t3: ["B1", "C3"],
    t4: ["E4", "F1"],
    t5: ["A3", "D2"]
  },
  allSeats: seatCodes(),
  bookings: [...mockBookings],
  activeBooking: null
};

export const setDarkMode = (next) => {
  store.ui.darkMode = next;
  localStorage.setItem("darkMode", String(next));
  document.body.classList.toggle("dark", next);
};
