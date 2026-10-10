"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import type { Room } from "@/types/booking";

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const changeImage = (direction: number) => setImageIndex((current) => (current + direction + room.images.length) % room.images.length);

  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3 }} className="room-card">
      <div className="room-card__image-wrap">
        <AnimatePresence mode="wait"><motion.div key={room.images[imageIndex]} className="room-image-motion" initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}><Image src={room.images[imageIndex]} alt={`${room.name} interior`} fill sizes="(max-width: 720px) 100vw, (max-width: 1000px) 40vw, 480px" className="room-card__image" /></motion.div></AnimatePresence>
        {room.badge && <span className="room-badge">{room.badge}</span>}
        <button className={`save-button${saved ? " is-saved" : ""}`} type="button" aria-label={saved ? "Remove from saved rooms" : "Save room"} onClick={() => setSaved(!saved)}><span aria-hidden="true">{saved ? "♥" : "♡"}</span></button>
        {room.images.length > 1 && <div className="carousel-controls"><button type="button" aria-label="Previous room photo" onClick={() => changeImage(-1)}><ArrowLeft size={15} /></button><span>{imageIndex + 1} / {room.images.length}</span><button type="button" aria-label="Next room photo" onClick={() => changeImage(1)}><ArrowRight size={15} /></button></div>}
      </div>
      <div className="room-card__content">
        <div className="room-card__heading"><div><p className="eyebrow">{room.type} · Up to {room.capacity} guests</p><h3>{room.name}</h3></div><div className="rating"><Star size={14} fill="currentColor" /><span>{room.rating}</span><span className="muted">({room.reviewCount})</span></div></div>
        <p className="room-description">{room.description}</p>
        <div className="room-amenities">{room.amenities.slice(0, 4).map((amenity) => <span key={amenity}>{amenity}</span>)}{room.amenities.length > 4 && <span>+{room.amenities.length - 4} more</span>}</div>
        <div className="room-card__footer"><p className="room-price"><strong>${room.pricePerNight}</strong><span> / night</span></p><motion.button whileTap={{ scale: 0.97 }} type="button" className="button button--dark button--small" onClick={() => onBook(room)}>View room <ArrowRight size={15} /></motion.button></div>
      </div>
    </motion.article>
  );
}