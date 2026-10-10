"use client";

import type { Amenity, FilterState, RoomType } from "@/types/booking";

const amenities: Amenity[] = ["Wi-Fi", "Air conditioning", "Pool", "Breakfast", "Ocean view", "Spa", "Gym", "Balcony"];
const roomTypes: FilterState["roomType"][] = ["Any room", "Standard", "Deluxe", "Penthouse", "VIP Suite"];

interface RoomFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function RoomFilters({ filters, onChange, onReset }: RoomFiltersProps) {
  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });
  const toggleAmenity = (amenity: Amenity) => {
    const selected = filters.amenities.includes(amenity);
    update({ amenities: selected ? filters.amenities.filter((item) => item !== amenity) : [...filters.amenities, amenity] });
  };

  return (
    <aside className="filters-panel" aria-label="Filter rooms">
      <div className="filters-heading"><h2>Refine your stay</h2><button type="button" onClick={onReset}>Reset</button></div>
      <section className="filter-section">
        <div className="filter-label-row"><h3>Price per night</h3><span>${filters.minPrice} – ${filters.maxPrice}</span></div>
        <div className="price-inputs">
          <label>Min <input type="range" min="0" max="850" step="10" value={filters.minPrice} aria-label="Minimum price" onChange={(event) => update({ minPrice: Math.min(Number(event.target.value), filters.maxPrice - 10) })} /></label>
          <label>Max <input type="range" min="0" max="850" step="10" value={filters.maxPrice} aria-label="Maximum price" onChange={(event) => update({ maxPrice: Math.max(Number(event.target.value), filters.minPrice + 10) })} /></label>
        </div>
      </section>
      <section className="filter-section">
        <h3>Room type</h3>
        <div className="type-options">
          {roomTypes.map((type) => <button key={type} type="button" className={filters.roomType === type ? "type-option is-active" : "type-option"} aria-pressed={filters.roomType === type} onClick={() => update({ roomType: type as RoomType | "Any room" })}>{type}</button>)}
        </div>
      </section>
      <section className="filter-section">
        <div className="filter-label-row"><h3>Guests</h3><span>{filters.capacity}+</span></div>
        <div className="guest-stepper">
          <button type="button" aria-label="Remove one guest" disabled={filters.capacity <= 1} onClick={() => update({ capacity: Math.max(1, filters.capacity - 1) })}>−</button>
          <span>{filters.capacity} {filters.capacity === 1 ? "guest" : "guests"}</span>
          <button type="button" aria-label="Add one guest" onClick={() => update({ capacity: Math.min(6, filters.capacity + 1) })}>+</button>
        </div>
      </section>
      <section className="filter-section filter-section--amenities">
        <h3>Amenities</h3>
        <div className="amenity-options">
          {amenities.map((amenity) => <label className="check-row" key={amenity}><input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} /><span className="checkmark" />{amenity}</label>)}
        </div>
      </section>
    </aside>
  );
}