import { skeletonCard, tripCard } from "../components/ui.js";
import { store } from "../context/store.js";

const filterTrips = () => {
  let list = store.trips.filter(
    (trip) =>
      trip.from.toLowerCase().includes(store.search.from.toLowerCase()) &&
      trip.to.toLowerCase().includes(store.search.to.toLowerCase()) &&
      trip.price <= store.search.maxPrice
  );

  if (store.search.timeFilter === "morning") list = list.filter((t) => Number(t.time.split(":")[0]) < 12);
  if (store.search.timeFilter === "evening") list = list.filter((t) => Number(t.time.split(":")[0]) >= 12);

  if (store.search.sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  if (store.search.sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
  if (store.search.sortBy === "time-asc") list.sort((a, b) => a.time.localeCompare(b.time));

  return list;
};

export const searchPage = () => {
  if (store.ui.loading) return `<div class="d-grid gap-3">${skeletonCard()}${skeletonCard()}${skeletonCard()}</div>`;
  const trips = filterTrips();
  return `
    <section class="row g-3">
      <div class="col-lg-3">
        <aside class="card-pro p-3">
          <h6>Filters</h6>
          <div class="mb-2">
            <label class="form-label small">Max price</label>
            <input class="form-range" type="range" id="price-filter" min="15" max="120" value="${store.search.maxPrice}" />
            <div class="small text-secondary">Up to $${store.search.maxPrice}</div>
          </div>
          <div class="mb-2">
            <label class="form-label small">Time</label>
            <select id="time-filter" class="form-select">
              <option value="all" ${store.search.timeFilter === "all" ? "selected" : ""}>Any time</option>
              <option value="morning" ${store.search.timeFilter === "morning" ? "selected" : ""}>Morning</option>
              <option value="evening" ${store.search.timeFilter === "evening" ? "selected" : ""}>Evening</option>
            </select>
          </div>
          <div>
            <label class="form-label small">Sort</label>
            <select id="sort-filter" class="form-select">
              <option value="price-asc" ${store.search.sortBy === "price-asc" ? "selected" : ""}>Price low to high</option>
              <option value="price-desc" ${store.search.sortBy === "price-desc" ? "selected" : ""}>Price high to low</option>
              <option value="time-asc" ${store.search.sortBy === "time-asc" ? "selected" : ""}>Time earliest</option>
            </select>
          </div>
        </aside>
      </div>
      <div class="col-lg-9 d-grid gap-3">
        <h4 class="mb-0">Search Results (${trips.length})</h4>
        ${trips.length ? trips.map(tripCard).join("") : '<div class="card-pro p-4">No trips found for these filters.</div>'}
      </div>
    </section>
  `;
};
