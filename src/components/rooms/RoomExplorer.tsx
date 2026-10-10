"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp, ArrowRight, SlidersHorizontal } from "lucide-react";
import { rooms } from "@/data/rooms";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { RoomFilters } from "@/components/filters/RoomFilters";
import { RoomCard } from "@/components/rooms/RoomCard";
import type { FilterState, Room } from "@/types/booking";

const initialFilters: FilterState = { minPrice: 0, maxPrice: 850, amenities: [], capacity: 1, roomType: "Any room" };

export function RoomExplorer() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [sortOrder, setSortOrder] = useState<"recommended" | "low" | "high">("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredRooms = useMemo(() => rooms
    .filter((room) => room.pricePerNight >= filters.minPrice && room.pricePerNight <= filters.maxPrice)
    .filter((room) => room.capacity >= filters.capacity)
    .filter((room) => filters.roomType === "Any room" || room.type === filters.roomType)
    .filter((room) => filters.amenities.every((amenity) => room.amenities.includes(amenity)))
    .sort((a, b) => sortOrder === "low" ? a.pricePerNight - b.pricePerNight : sortOrder === "high" ? b.pricePerNight - a.pricePerNight : b.rating - a.rating),
  [filters, sortOrder]);

  return <>
    <section className="search-strip" aria-label="Stay search">
      <div className="search-field search-field--destination"><span className="search-icon" aria-hidden="true">⌖</span><label>Destination<span>Shoreline, Miami</span></label></div>
      <div className="search-field"><label>Check-in<span>Choose dates</span></label></div>
      <div className="search-field"><label>Check-out<span>Choose dates</span></label></div>
      <div className="search-field"><label>Guests<span>{filters.capacity} guests</span></label></div>
      <a href="#rooms" className="search-submit" aria-label="Explore rooms"><ArrowRight size={19} /></a>
    </section>
    <section className="listing-section" id="rooms">
      <div className="listing-topline"><div><p className="eyebrow">Stay a little closer to the water</p><h2>Rooms & suites</h2><p className="listing-subtitle">Thoughtful spaces, warm service, and the coast just beyond your window.</p></div><div className="listing-tools"><button className="filter-toggle" type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} /> Filters</button><label className="sort-control"><ArrowDownUp size={15} /><span className="sr-only">Sort rooms</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)}><option value="recommended">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div></div>
      <div className="listing-layout">
        <div className={filtersOpen ? "filters-mobile is-open" : "filters-mobile"}><RoomFilters filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} /></div>
        <div className="results-column"><p className="results-count"><strong>{filteredRooms.length}</strong> stays available</p>
          {filteredRooms.length ? <motion.div layout className="room-grid"><AnimatePresence mode="popLayout">{filteredRooms.map((room) => <RoomCard key={room.id} room={room} onBook={setSelectedRoom} />)}</AnimatePresence></motion.div> : <motion.div className="empty-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="empty-mark" aria-hidden="true">⌕</span><h3>No rooms match just yet</h3><p>Try easing a filter to see more of the collection.</p><button className="button button--outline" type="button" onClick={() => setFilters(initialFilters)}>Clear all filters</button></motion.div>}
        </div>
      </div>
    </section>
    <section className="closing-note"><div><p className="eyebrow">A quieter kind of getaway</p><h2>Make room for the<br />good part.</h2></div><p>Slow breakfasts. Salt in your hair. A room that feels like it already knows you.</p><a href="#rooms" aria-label="Back to available rooms"><ArrowRight size={19} /></a></section>
    <BookingDialog room={selectedRoom} onClose={() => setSelectedRoom(null)} />
  </>;
}