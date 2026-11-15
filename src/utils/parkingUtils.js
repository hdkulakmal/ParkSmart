export function searchParking(spots, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return spots;
  return spots.filter((spot) => `${spot.name} ${spot.location}`.toLowerCase().includes(normalized));
}

export function formatHourlyPrice(price) { return `Rs. ${Number(price).toLocaleString()} / hour`; }

export function isParkingAvailable(spot) { return Number(spot?.available) > 0; }
