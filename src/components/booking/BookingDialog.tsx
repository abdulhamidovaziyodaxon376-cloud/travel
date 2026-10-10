"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CreditCard, LoaderCircle, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import type { BookingDetails, Room } from "@/types/booking";

interface BookingDialogProps {
  room: Room | null;
  onClose: () => void;
}

function localDate(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function nextDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function BookingDialog({ room, onClose }: BookingDialogProps) {
  return <AnimatePresence>{room && <motion.div key={room.id} className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><BookingDialogSession room={room} onClose={onClose} /></motion.div>}</AnimatePresence>;
}

function BookingDialogSession({ room, onClose }: { room: Room; onClose: () => void }) {
  const [checkIn, setCheckIn] = useState(localDate(1));
  const [checkOut, setCheckOut] = useState(localDate(3));
  const [guests, setGuests] = useState(Math.min(2, room.capacity));
  const [paymentMethod, setPaymentMethod] = useState<BookingDetails["paymentMethod"]>("Card");
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const nights = Math.max(1, Math.ceil((new Date(`${checkOut}T12:00:00`).getTime() - new Date(`${checkIn}T12:00:00`).getTime()) / 86_400_000));
  const serviceFee = Math.round(room.pricePerNight * nights * 0.12);
  const total = room.pricePerNight * nights + serviceFee;

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBooking({ fullName: String(formData.get("fullName")), email: String(formData.get("email")), phone: String(formData.get("phone")), checkIn, checkOut, guests, paymentMethod });
    setStatus("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    setStatus("success");
  };

  return (
    <motion.section role="dialog" aria-modal="true" aria-labelledby="booking-title" className="booking-dialog" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: 0.24 }}>
          <div className="dialog-topline">{status === "form" ? <button className="icon-button" type="button" aria-label="Close booking" onClick={onClose}><X size={18} /></button> : <span />}<span>THE SHORELINE HOTEL</span><span className="secure-label"><ShieldCheck size={14} /> Secure</span></div>
          {status === "success" && booking ? <motion.div className="booking-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="success-mark"><Check size={30} /></div><p className="eyebrow">Your stay is on its way</p><h2 id="booking-title">Request received</h2><p className="success-copy">Thanks, {booking.fullName.split(" ")[0]}. Your {room.name} booking request has been confirmed in this demo.</p>
            <div className="confirmation-summary"><span>Confirmation</span><strong>SH-{room.id.slice(0, 4).toUpperCase()}-2481</strong><span>{booking.checkIn} → {booking.checkOut}</span><strong>{nights} nights · ${total}</strong></div><p className="demo-note">Demo checkout only. No payment was processed.</p><button className="button button--dark button--wide" type="button" onClick={onClose}>Done</button>
          </motion.div> : <>
            <div className="dialog-heading"><p className="eyebrow">Make it yours</p><h2 id="booking-title">Reserve your stay</h2><p>{room.name} <span>·</span> ${room.pricePerNight} / night</p></div>
            <div className="booking-columns">
              <form className="booking-form" onSubmit={submitBooking}>
                <div className="date-grid">
                  <label>Check-in<input required type="date" min={localDate(0)} value={checkIn} onChange={(event) => { const value = event.target.value; setCheckIn(value); if (value >= checkOut) setCheckOut(nextDate(value)); }} /></label>
                  <label>Check-out<input required type="date" min={nextDate(checkIn)} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
                </div>
                <div className="guest-form-row"><span>Guests</span><div className="guest-stepper"><button type="button" aria-label="Remove one guest" disabled={guests <= 1} onClick={() => setGuests(Math.max(1, guests - 1))}>−</button><span>{guests}</span><button type="button" aria-label="Add one guest" disabled={guests >= room.capacity} onClick={() => setGuests(Math.min(room.capacity, guests + 1))}>+</button></div></div>
                <div className="form-divider" />
                <label>Full name<input name="fullName" autoComplete="name" placeholder="Your full name" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" required /></label>
                <fieldset className="payment-options"><legend>Payment method</legend>{(["Card", "Click", "Payme"] as const).map((method) => <label key={method} className={paymentMethod === method ? "payment-option is-selected" : "payment-option"}><input type="radio" name="paymentMethod" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} /><span className="payment-symbol">{method === "Card" ? <CreditCard size={17} /> : method === "Click" ? "C" : "P"}</span><span>{method === "Card" ? "Credit / debit card" : method}</span><span className="radio-indicator" /></label>)}</fieldset>
                <button className="button button--dark button--wide submit-booking" type="submit" disabled={status === "loading"}>{status === "loading" ? <><LoaderCircle className="spin" size={17} /> Confirming…</> : <>Confirm booking <ArrowRight size={16} /></>}</button>
                <p className="checkout-footnote"><ShieldCheck size={13} /> Payment details are not collected in this demo.</p>
              </form>
              <aside className="price-summary"><Image src={room.images[0]} alt="" width={600} height={300} sizes="(max-width: 480px) 85px, 320px" /><p className="eyebrow">Your selection</p><h3>{room.name}</h3><p>{room.type} · Up to {room.capacity} guests</p><div className="summary-lines"><span>${room.pricePerNight} × {nights} nights</span><span>${room.pricePerNight * nights}</span><span>Service fee</span><span>${serviceFee}</span></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div></aside>
            </div>
          </>}
    </motion.section>
  );
}