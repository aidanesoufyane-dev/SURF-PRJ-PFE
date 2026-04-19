// ════════════════════════════════════════════════════════════
// SURFBOOK — SAAS LANDING PAGE  v2
// Design system:
//   Fonts  : Playfair Display (headings) · DM Sans (body)
//   Colors : Terracotta #C1440E · Sand #F5ECD7 · Atlantic Blue #1B4F72
//            Dark #0A0A0A · White #FFFFFF
// ════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
// ICONS  (all accept an optional size prop, default 20)
// ─────────────────────────────────────────────────────────────
const IcBooking = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
  </svg>
);
const IcRoom = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IcUser = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IcTeam = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IcPayment = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <path d="M1 10h22"/>
  </svg>
);
const IcZap = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IcConfirm = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcCheck = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IcPlay = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IcStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IcMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────
function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#C1440E"/>
        <path d="M6 21C8.5 18 11.5 17 15 19C18.5 21 20 23 23.5 21C26.5 19.5 28 18 30 19.5"
          stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M6 15C8.5 12 11.5 11 15 13C18.5 15 20 17 23.5 15C26.5 13.5 28 12 30 13.5"
          stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".55"/>
      </svg>
      <span
        className={`text-[17px] font-bold tracking-[-0.02em] ${light ? "text-white" : "text-[#0A0A0A]"}`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        SurfBook
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD MOCKUP  (pure CSS/div — no images)
// Updated to use Terracotta + Atlantic Blue design system
// ─────────────────────────────────────────────────────────────
function DashboardMockup() {
  const tableRows = [
    { name: "Ahmed K.", room: "Ocean Suite", dates: "Apr 5–12",  status: "confirmed", amount: "$420" },
    { name: "Sarah M.", room: "Bungalow A",  dates: "Apr 8–15",  status: "pending",   amount: "$680" },
    { name: "Lucas T.", room: "Dorm B",      dates: "Apr 10–17", status: "confirmed", amount: "$140" },
    { name: "Fatima R.", room: "Surf Suite", dates: "Apr 11–18", status: "confirmed", amount: "$560" },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#131614",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: "#0E1110", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }}/>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }}/>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }}/>
        <div className="flex-1 flex justify-center">
          <span className="text-[10px] text-gray-600 font-mono">app.surfbook.co/dashboard</span>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ height: "360px" }}>
        {/* Sidebar */}
        <div
          className="w-[132px] flex-shrink-0 p-3 flex flex-col"
          style={{ background: "#0C0E0D", borderRight: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-1.5 px-2 py-1 mb-5">
            <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: "#C1440E" }}/>
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>SurfBook</span>
          </div>
          {[
            { label: "Dashboard", active: true },
            { label: "Bookings" },
            { label: "Rooms" },
            { label: "Customers" },
            { label: "Packages" },
            { label: "Payments" },
            { label: "Team" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md mb-0.5 text-[10px] font-medium"
              style={
                item.active
                  ? { background: "rgba(193,68,14,0.15)", color: "#C1440E" }
                  : { color: "#4B5563" }
              }
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: item.active ? "#C1440E" : "#374151" }}
              />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Overview
              </div>
              <div className="text-gray-600 text-[10px]">Wednesday, Apr 2, 2026</div>
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: "#C1440E" }}
            >
              J
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: "Bookings",  value: "124",   delta: "↑12%" },
              { label: "Revenue",   value: "$8,420", delta: "↑8%"  },
              { label: "Guests",    value: "89",     delta: "↑5%"  },
              { label: "Occupancy", value: "76%",    delta: "↑3%"  },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-2.5"
                style={{ background: "#1A1D1C", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-white text-[13px] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div className="text-[9px] mt-0.5" style={{ color: "#4ADE80" }}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div className="rounded-lg overflow-hidden" style={{ background: "#1A1D1C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-white text-[11px] font-medium">Recent Bookings</span>
              <span className="text-[10px] cursor-pointer" style={{ color: "#C1440E" }}>View all →</span>
            </div>
            {tableRows.map((b, i) => (
              <div
                key={b.name}
                className="flex items-center justify-between px-3 py-2 text-[10px]"
                style={{ borderBottom: i < tableRows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <div className="text-gray-300 w-14 truncate font-medium">{b.name}</div>
                <div className="text-gray-500 w-16 truncate">{b.room}</div>
                <div className="hidden sm:block text-gray-600 w-16 truncate">{b.dates}</div>
                <span
                  className="px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                  style={{
                    background: b.status === "confirmed" ? "rgba(74,222,128,0.12)" : "rgba(250,204,21,0.12)",
                    color:      b.status === "confirmed" ? "#4ADE80" : "#FACC15",
                  }}
                >
                  {b.status}
                </span>
                <div className="text-white font-bold w-9 text-right">{b.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <IcBooking />,
    title: "Booking Management",
    desc: "Full booking lifecycle — create, reschedule, cancel, and track every reservation in real time.",
    highlight: false,
    iconColor: "#1B4F72",
    iconBg: "rgba(27,79,114,0.08)",
  },
  {
    icon: <IcRoom />,
    title: "Rooms & Packages",
    desc: "Define rooms, dorms, and bungalows. Bundle surf packages with capacity limits and per-person pricing.",
    highlight: false,
    iconColor: "#1B4F72",
    iconBg: "rgba(27,79,114,0.08)",
  },
  {
    icon: <IcUser />,
    title: "Customer Profiles",
    desc: "Auto-build guest profiles with full booking history, contact details, and travel preferences.",
    highlight: false,
    iconColor: "#1B4F72",
    iconBg: "rgba(27,79,114,0.08)",
  },
  {
    icon: <IcTeam />,
    title: "Team & Roles",
    desc: "Invite staff with role-based access — admins, managers, and front-desk see exactly what they need.",
    highlight: false,
    iconColor: "#1B4F72",
    iconBg: "rgba(27,79,114,0.08)",
  },
  {
    icon: <IcPayment />,
    title: "Payments Tracking",
    desc: "Log cash and card payments, track balances, and connect Stripe for seamless online checkout.",
    highlight: false,
    iconColor: "#1B4F72",
    iconBg: "rgba(27,79,114,0.08)",
  },
  {
    icon: <IcZap />,
    title: "Smart Availability",
    desc: "Real-time conflict detection prevents double-bookings automatically. Your calendar stays clean.",
    highlight: true,
    iconColor: "#C1440E",
    iconBg: "rgba(193,68,14,0.1)",
  },
];

const BOOKING_STEPS = [
  {
    num: "1",
    icon: <IcBooking size={26} />,
    title: "Choose Your Dates",
    desc: "Guests pick check-in and check-out on a clean interactive calendar.",
  },
  {
    num: "2",
    icon: <IcRoom size={26} />,
    title: "Pick a Room",
    desc: "Only available rooms appear — real-time availability, zero double-bookings.",
  },
  {
    num: "3",
    icon: <IcConfirm size={26} />,
    title: "Confirm & Pay",
    desc: "One-tap confirmation with instant email receipt and booking reference.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$29",
    desc: "For new surf schools just getting started.",
    items: ["Up to 5 rooms", "100 bookings/mo", "Customer profiles", "Email support", "1 team member"],
    cta: "Start Free Trial",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$79",
    desc: "The complete toolkit for growing surf camps.",
    items: ["Unlimited rooms", "Unlimited bookings", "Team roles & permissions", "Stripe payments", "Analytics dashboard", "Priority support"],
    cta: "Start Free Trial",
    href: "/register",
    featured: true,
  },
  {
    name: "Business",
    price: "$149",
    desc: "For multi-location operations and chains.",
    items: ["Everything in Pro", "Multiple locations", "Custom branding", "API access", "Dedicated support", "SLA guarantee"],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "We went from spreadsheets to a fully automated system. SurfBook saved us 15 hours a week and double-bookings just stopped.",
    name: "Karim Ouazzani",
    role: "Owner, Taghazout Wave Co.",
    initials: "KO",
  },
  {
    quote: "The availability engine alone is worth it. No more angry guests, no more scrambling. The dashboard gives me everything at a glance.",
    name: "Mia Andersen",
    role: "Manager, Essaouira Surf School",
    initials: "MA",
  },
  {
    quote: "Setup took 20 minutes. My whole team was using it the same day. Role-based access is perfect for our crew.",
    name: "João Figueiredo",
    role: "Director, Atlantic Surf Camp",
    initials: "JF",
  },
];

const PROOF_BRANDS = [
  "Taghazout Wave Co.",
  "Essaouira Surf School",
  "Atlantic Surf Camp",
  "Safi Surf Club",
  "Imsouane Rides",
  "Agadir Surf Academy",
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  // Navbar backdrop on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("sb-visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sb-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLink = "text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#0A0A0A", background: "#FAFAF8", overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════
          NAVBAR
          — only Log in (text) + Start Free Trial (button)
          — no duplicate Login in nav links
      ═══════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? "rgba(250,250,248,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop nav links — Features / Demo / Pricing only */}
            <div className="hidden md:flex items-center gap-7">
              <a href="#features" className={navLink}>Features</a>
              <a href="#demo"     className={navLink}>Demo</a>
              <a href="#pricing"  className={navLink}>Pricing</a>
            </div>

            {/* Desktop auth — Log in (text) + Start Free Trial (button) */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
                Log in
              </Link>
              <Link
                href="/register"
                className="text-[13px] font-semibold text-white px-4 py-2.5 rounded-xl transition-all hover:brightness-110"
                style={{ background: "#C1440E", fontFamily: "'Playfair Display', serif" }}
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden p-1 text-gray-700" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <IcClose /> : <IcMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-5 pb-5 pt-2 flex flex-col gap-3 border-t text-[14px]"
            style={{ background: "rgba(250,250,248,0.97)", borderColor: "rgba(0,0,0,0.07)" }}
          >
            {[
              { label: "Features", href: "#features" },
              { label: "Demo",     href: "#demo"     },
              { label: "Pricing",  href: "#pricing"  },
            ].map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="py-1.5 text-gray-700 hover:text-gray-900">
                {item.label}
              </a>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)} className="py-1.5 text-gray-700 hover:text-gray-900">Log in</Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-1 text-center text-[13px] font-semibold text-white py-2.5 rounded-xl"
              style={{ background: "#C1440E" }}
            >
              Start Free Trial
            </Link>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════
          HERO
          — "Surf" in terracotta, rest white
          — single "Start Free Trial" CTA
          — trust badges immediately below CTAs
          — Atlantic blue ring around dashboard mockup
          — max 80px padding-top
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center sb-dot-bg overflow-hidden"
        style={{ background: "#0A0A0A", paddingTop: "80px" }}
      >
        {/* Ambient glows */}
        <div className="absolute pointer-events-none"
          style={{ top: "20%", left: "8%", width: "500px", height: "350px",
            background: "radial-gradient(circle, rgba(193,68,14,0.1) 0%, transparent 65%)", filter: "blur(80px)" }}/>
        <div className="absolute pointer-events-none"
          style={{ top: "35%", right: "8%", width: "400px", height: "300px",
            background: "radial-gradient(circle, rgba(27,79,114,0.13) 0%, transparent 65%)", filter: "blur(80px)" }}/>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Copy ── */}
            <div>
              {/* Eyebrow badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-[12px] font-medium"
                style={{ background: "rgba(193,68,14,0.12)", border: "1px solid rgba(193,68,14,0.3)", color: "#C1440E" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                Built for surf camp owners
              </div>

              {/* Headline — terracotta ONLY on "Surf" */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.06] tracking-[-0.02em] text-white mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Run Your <span style={{ color: "#C1440E" }}>Surf</span><br/>
                Business on<br/>
                Autopilot
              </h1>

              <p className="text-[16px] leading-relaxed mb-8 max-w-[500px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Manage rooms, packages, bookings, and your entire team from one clean dashboard.
                Stop juggling spreadsheets — start focusing on the waves.
              </p>

              {/* ONE Start Free Trial + Try Live Demo */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-[14px] font-semibold transition-all hover:brightness-110"
                  style={{ background: "#C1440E" }}
                >
                  Start Free Trial <IcArrow />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}
                >
                  <IcPlay /> Try Live Demo
                </Link>
              </div>

              {/* Trust badges — directly below CTAs */}
              <div className="flex flex-wrap gap-5">
                {["15-day free trial", "No credit card", "Cancel anytime"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(193,68,14,0.2)", color: "#C1440E" }}
                    >
                      <IcCheck />
                    </div>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Dashboard mockup — Atlantic blue ring ── */}
            <div className="relative hidden lg:block">
              <div
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 0 0 1px rgba(27,79,114,0.45), 0 0 60px rgba(27,79,114,0.22), 0 40px 80px rgba(0,0,0,0.55)",
                }}
              >
                <DashboardMockup />
              </div>

              {/* Floating: new booking */}
              <div
                className="absolute -left-8 bottom-24 rounded-xl px-3.5 py-2.5 shadow-2xl"
                style={{ background: "#1A1D1C", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(74,222,128,0.15)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-[11px] font-semibold">New booking</div>
                    <div className="text-gray-500 text-[10px]">Ocean Suite · $420</div>
                  </div>
                </div>
              </div>

              {/* Floating: revenue */}
              <div
                className="absolute -right-5 top-16 rounded-xl px-3.5 py-2.5 shadow-2xl"
                style={{ background: "#1A1D1C", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="text-[10px] text-gray-500 mb-0.5">This month</div>
                <div className="text-white font-bold text-[16px]" style={{ fontFamily: "'Playfair Display', serif" }}>$8,420</div>
                <div className="text-[10px]" style={{ color: "#4ADE80" }}>↑ 12% vs last month</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SOCIAL PROOF BAR
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 border-y" style={{ background: "white", borderColor: "rgba(0,0,0,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-center text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-6">
            Trusted by surf camps across Morocco &amp; beyond
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {PROOF_BRANDS.map((brand) => (
              <span key={brand} className="text-[13px] font-semibold text-gray-300">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES
          — icons: Atlantic blue (default) or Terracotta (highlight)
          — max 2-line descriptions (line-clamp-2)
          — gap-8 between cards
          — H3 = 24px
      ═══════════════════════════════════════════════════ */}
      <section id="features" className="py-20" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>Features</div>
            <h2 className="font-bold tracking-[-0.03em] mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              Everything your surf business needs
            </h2>
            <p className="text-[16px] text-gray-500 leading-relaxed">
              From the first inquiry to the last checkout — SurfBook handles every detail so you can focus on the waves.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`sb-reveal sb-delay-${(i % 3) + 1} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default ${f.highlight ? "sb-feature-highlight" : ""}`}
                style={
                  f.highlight
                    ? undefined
                    : { background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }
                }
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.iconBg, color: f.iconColor }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px" }}>
                  {f.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BOOKING STEPS  ("A booking in 3 steps")
          — replaced tab widget with clean numbered step cards
          — terracotta numbered circles
          — H3 = 24px step labels
      ═══════════════════════════════════════════════════ */}
      <section
        id="demo"
        className="py-20 border-y"
        style={{ background: "white", borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>Booking Flow</div>
            <h2 className="font-bold tracking-[-0.03em] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              A booking in 3 steps
            </h2>
            <p className="text-[16px] text-gray-500 max-w-2xl mx-auto">
              Your guests complete the entire journey in minutes — fully guided, mobile-friendly, no friction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line between steps */}
            <div
              className="hidden md:block absolute top-10 pointer-events-none"
              style={{
                left: "calc(16.67% + 24px)",
                right: "calc(16.67% + 24px)",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(193,68,14,0.25), transparent)",
              }}
            />

            {BOOKING_STEPS.map((step, i) => (
              <div key={step.num} className={`sb-reveal sb-delay-${i + 1} flex flex-col items-center text-center`}>
                {/* Terracotta numbered step circle */}
                <div
                  className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-5 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #C1440E 0%, #A83A0B 100%)",
                    boxShadow: "0 8px 28px rgba(193,68,14,0.28)",
                  }}
                >
                  <span className="text-white/60 text-[10px] font-medium mb-0.5 uppercase tracking-widest">Step</span>
                  <span className="text-white text-[28px] font-extrabold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {step.num}
                  </span>
                </div>

                {/* Feature icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(27,79,114,0.08)", color: "#1B4F72" }}
                >
                  {step.icon}
                </div>

                {/* H3 = 24px */}
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px" }}>
                  {step.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed max-w-[260px]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:brightness-110"
              style={{ background: "#C1440E" }}
            >
              <IcPlay /> See it live
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DASHBOARD PREVIEW  ("Your command center")
          — browser frame card wrapper around mockup
          — Atlantic blue glow/shadow
          — max 2-line subtitle
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden sb-dot-bg"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(27,79,114,0.12) 0%, transparent 55%)" }}
        />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
          <div className="text-center mb-12 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>Dashboard</div>
            <h2 className="font-bold tracking-[-0.03em] mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              Your command center
            </h2>
            {/* Max 2 lines */}
            <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
              One glance tells you everything — occupancy, revenue, upcoming checkouts, and team activity.
            </p>
          </div>

          {/* Card wrapper with Atlantic blue glow */}
          <div
            className="sb-reveal sb-delay-2 rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px rgba(27,79,114,0.45), 0 0 80px rgba(27,79,114,0.22), 0 40px 80px rgba(0,0,0,0.5)",
            }}
          >
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS  ("Up and running in minutes")
          — numbered steps (1, 2, 3) in terracotta
          — bold 18px title + 1 sentence
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>How It Works</div>
            <h2 className="font-bold tracking-[-0.03em]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              Up and running in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-6 pointer-events-none"
              style={{
                left: "calc(16.67% + 12px)",
                right: "calc(16.67% + 12px)",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(193,68,14,0.3), transparent)",
              }}
            />
            {[
              { n: "1", title: "Create your account",  desc: "Sign up in 60 seconds. No credit card. Your 15-day trial starts immediately." },
              { n: "2", title: "Set up your camp",     desc: "Add rooms, packages, and pricing. Invite your team. Done in under an hour."   },
              { n: "3", title: "Accept bookings",      desc: "Share your booking link. Guests reserve online. You get notified instantly."  },
            ].map((step, i) => (
              <div key={step.n} className={`sb-reveal sb-delay-${i + 1} text-center`}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold shadow-lg"
                  style={{
                    background: "#C1440E",
                    fontSize: "18px",
                    fontFamily: "'Playfair Display', serif",
                    boxShadow: "0 8px 24px rgba(193,68,14,0.3)",
                  }}
                >
                  {step.n}
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px" }}>
                  {step.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICING
          — Pro card: scale-[1.04] + "Most Popular" badge
          — Pro CTA: filled terracotta
          — Other CTAs: outlined
          — equal height with flex-col + flex-1
      ═══════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 border-t" style={{ background: "white", borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>Pricing</div>
            <h2 className="font-bold tracking-[-0.03em] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              Simple, transparent pricing
            </h2>
            <p className="text-[16px] text-gray-500">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
          </div>

          {/* items-center so Pro card can scale without clipping */}
          <div className="grid md:grid-cols-3 gap-5 items-center">
            {PRICING.map((plan, i) => (
              <div
                key={plan.name}
                className={`sb-reveal sb-delay-${i + 1} rounded-2xl p-7 flex flex-col ${plan.featured ? "sb-pricing-pro" : ""}`}
                style={{
                  ...(!plan.featured
                    ? { background: "#FAFAF8", border: "1px solid rgba(0,0,0,0.08)" }
                    : { transform: "scale(1.04)", zIndex: 1, position: "relative" as const }),
                }}
              >
                {/* Most Popular badge — only on Pro */}
                {plan.featured && (
                  <div className="self-center mb-4">
                    <span
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(193,68,14,0.2)", color: "#C1440E" }}
                    >
                      ★ Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div
                    className={`text-[12px] font-semibold uppercase tracking-wider mb-1 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={`font-extrabold tracking-tight leading-none ${plan.featured ? "text-white" : "text-gray-900"}`}
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px" }}
                    >
                      {plan.price}
                    </span>
                    <span className={`text-[13px] ${plan.featured ? "text-gray-500" : "text-gray-400"}`}>/month</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{plan.desc}</p>
                </div>

                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-[13px] ${plan.featured ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: plan.featured ? "rgba(193,68,14,0.25)" : "rgba(27,79,114,0.08)",
                          color:      plan.featured ? "#C1440E"              : "#1B4F72",
                        }}
                      >
                        <IcCheck />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA: filled terracotta for Pro, outlined for others */}
                <Link
                  href={plan.href}
                  className="text-center py-3 rounded-xl text-[14px] font-semibold transition-all hover:brightness-110"
                  style={
                    plan.featured
                      ? { background: "#C1440E", color: "white" }
                      : { border: "1.5px solid rgba(0,0,0,0.15)", color: "#0A0A0A", background: "transparent" }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS
          — gold/amber stars (#F59E0B)
          — avatar initials circles (Atlantic blue)
          — line-clamp-3 on quotes
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sb-reveal">
            <div className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#C1440E" }}>Testimonials</div>
            <h2 className="font-bold tracking-[-0.03em]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px" }}>
              Loved by surf camp owners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`sb-reveal sb-delay-${i + 1} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5`}
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                {/* Gold stars */}
                <div className="flex gap-0.5" style={{ color: "#F59E0B" }}>
                  {Array.from({ length: 5 }).map((_, j) => <IcStar key={j} />)}
                </div>

                {/* Quote capped at 3 lines */}
                <p className="text-[14px] text-gray-600 leading-relaxed flex-1 line-clamp-3">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Avatar + name */}
                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[13px] font-bold"
                    style={{ background: "#1B4F72", fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</div>
                    <div className="text-[11px] text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
          — py-20 (not more)
          — headline max 2 lines
          — "Start Free Trial" filled terracotta
          — "Try Demo" outlined white
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden sb-dot-bg"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(193,68,14,0.1) 0%, transparent 55%)" }}
        />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative sb-reveal">
          <div className="text-[12px] uppercase tracking-widest font-semibold mb-5" style={{ color: "#C1440E" }}>
            Get Started Today
          </div>
          {/* Max 2 lines */}
          <h2
            className="font-extrabold tracking-[-0.03em] mb-5 text-white leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3rem)" }}
          >
            Start managing your<br/>surf business today
          </h2>
          <p className="text-[16px] mb-10 leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
            15-day free trial. No credit card. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* Filled terracotta */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white text-[14px] font-semibold transition-all hover:brightness-110"
              style={{ background: "#C1440E" }}
            >
              Start Free Trial <IcArrow />
            </Link>
            {/* Outlined white */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)" }}
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          — columns: Product / Company / Legal only
          — links opacity 60%, headers white
          — © 2026 Surbook. All rights reserved.
      ═══════════════════════════════════════════════════ */}
      <footer
        className="py-14 border-t"
        style={{ background: "#070909", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Logo light />
              <p className="text-[13px] mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                The booking platform built for surf camps and coastal hospitality.
              </p>
            </div>

            {/* Product */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-white">Product</div>
              <ul className="flex flex-col gap-2.5">
                {["Features", "Pricing", "Demo"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-white">Company</div>
              <ul className="flex flex-col gap-2.5">
                {["About", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-white">Legal</div>
              <ul className="flex flex-col gap-2.5">
                {["Privacy Policy", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              © 2026 Surbook. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }} aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }} aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
