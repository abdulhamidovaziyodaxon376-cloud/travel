import { ArrowUpRight, Camera, Menu } from "lucide-react";
import Image from "next/image";
import { RoomExplorer } from "@/components/rooms/RoomExplorer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f4] text-[#203d3a]">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Shoreline home"><span className="wordmark-icon">S</span><span>SHORELINE<small>HOTEL & RETREAT</small></span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#rooms">Stay</a><a href="#experience">Experience</a><a href="#journal">Journal</a></nav>
        <div className="header-actions"><a className="header-link" href="#rooms">Plan your stay <ArrowUpRight size={14} /></a><button className="mobile-menu" type="button" aria-label="Open menu"><Menu size={19} /></button></div>
      </header>
      <section className="hero" id="top">
        <Image className="hero-image" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2200&q=90" alt="A calm tropical coastline beside the hotel" fill priority sizes="100vw" /><div className="hero-shade" />
        <div className="hero-content"><p className="hero-kicker"><span /> 25°46&apos; N · 80°08&apos; W</p><h1>Somewhere<br /><em>between</em> here<br />and the sea.</h1><div className="hero-bottom"><p>Find your own kind of stillness<br />on Miami&apos;s quieter shoreline.</p><a href="#rooms" className="hero-link">FIND YOUR ROOM <span><ArrowUpRight size={16} /></span></a></div></div>
        <div className="hero-caption"><span>01 / 03</span><span>THE ATLANTIC COAST, MIAMI</span><a href="#experience">SCROLL TO EXPLORE ↓</a></div>
      </section>
      <div id="experience" className="experience-band"><span>HOSPITALITY, AT ITS MOST HUMAN</span><p>Thoughtfully made for the moments that matter.</p><span>EST. BY THE SEA · 2014</span></div>
      <RoomExplorer />
      <footer className="site-footer" id="journal"><a className="wordmark wordmark--footer" href="#top"><span className="wordmark-icon">S</span><span>SHORELINE<small>HOTEL & RETREAT</small></span></a><p>Easy mornings. Open water. Always welcome.</p><div><a href="#rooms">Contact</a><a href="#rooms">Instagram <Camera size={14} /></a></div><span className="copyright">© 2025 SHORELINE HOTEL</span></footer>
    </main>
  );
}