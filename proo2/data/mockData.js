export const mockTrips = [
  { id: "t1", from: "Cairo", to: "Alexandria", date: "2026-04-25", time: "08:30", duration: "2h 40m", price: 40, operator: "BlueLine", type: "Premium Bus" },
  { id: "t2", from: "Cairo", to: "Alexandria", date: "2026-04-25", time: "11:15", duration: "2h 30m", price: 35, operator: "SwiftGo", type: "Express Van" },
  { id: "t3", from: "Cairo", to: "Mansoura", date: "2026-04-25", time: "09:20", duration: "2h 10m", price: 29, operator: "CityJet", type: "Comfort Coach" },
  { id: "t4", from: "Giza", to: "Ain Sokhna", date: "2026-04-26", time: "07:50", duration: "2h 00m", price: 31, operator: "SeaRide", type: "Coastal Ride" },
  { id: "t5", from: "Alexandria", to: "Cairo", date: "2026-04-26", time: "17:40", duration: "2h 45m", price: 38, operator: "BlueLine", type: "Premium Bus" }
];

export const mockUser = {
  id: "u1",
  name: "Nour Hassan",
  email: "nour.hassan@email.com",
  phone: "+20 100 500 7788",
  walletBalance: 210
};

export const mockBookings = [
  { id: "b1", tripId: "t5", seats: ["A1", "A2"], total: 76, status: "Completed", bookedAt: "2026-04-19", qrCode: "QR-T5-A1A2-3180" }
];
