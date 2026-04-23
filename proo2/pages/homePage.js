import { store } from "../context/store.js";
import { tripCard } from "../components/ui.js";

export const homePage = () => {
  const featured = store.trips.slice(0, 3).map(tripCard).join("");
  return `
    <section class="hero mb-4 fade-in">
      <div class="row g-4 align-items-center">
        <div class="col-lg-7">
          <h1 class="display-6 fw-bold">Move smarter with premium transport booking</h1>
          <p class="mb-0 text-white-50">Plan rides, pick your seat, and pay in seconds with a startup-level seamless experience.</p>
        </div>
        <div class="col-lg-5">
          <form class="card-pro p-3 bg-white text-dark" id="search-form">
            <div class="mb-2"><label class="form-label small">From</label><input class="form-control" name="from" value="${store.search.from}" required /></div>
            <div class="mb-2"><label class="form-label small">To</label><input class="form-control" name="to" value="${store.search.to}" required /></div>
            <div class="mb-3"><label class="form-label small">Date</label><input type="date" class="form-control" name="date" value="${store.search.date}" required /></div>
            <button class="btn-primary-pro w-100" type="submit">Search Trips</button>
          </form>
        </div>
      </div>
    </section>

    <section>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Featured Trips</h4>
        <a class="text-decoration-none fw-semibold" href="#/search">View all</a>
      </div>
      <div class="row g-3">${featured}</div>
    </section>
  `;
};
