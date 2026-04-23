export const currency = (value) => `$${Number(value).toFixed(2)}`;

export const fakeDelay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const seatCodes = () => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  return rows.flatMap((row) => [1, 2, 3, 4].map((num) => `${row}${num}`));
};

export const byId = (id) => document.getElementById(id);
