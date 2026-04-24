"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const IcCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#C1440E"/>
        <path d="M6 21C8.5 18 11.5 17 15 19C18.5 21 20 23 23.5 21C26.5 19.5 28 18 30 19.5"
          stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M6 15C8.5 12 11.5 11 15 13C18.5 15 20 17 23.5 15C26.5 13.5 28 12 30 13.5"
          stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".55"/>
      </svg>
      <span
        className={`text-[16px] font-bold tracking-[-0.02em] ${light ? "text-white" : "text-[#0A0A0A]"}`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        SurfBook
      </span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Left: dark brand panel ── */}
      <div
        className="hidden lg:flex w-[44%] flex-col justify-between p-12 sb-dot-bg relative overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <div className="absolute pointer-events-none"
          style={{ top: "30%", left: "-5%", width: "400px", height: "300px",
            background: "radial-gradient(circle, rgba(193,68,14,0.12) 0%, transparent 65%)", filter: "blur(60px)" }}/>

        <Logo light />

        <div>
          <h2
            className="text-[34px] font-bold leading-[1.15] text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage your surf<br/>camp from anywhere
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.42)" }}>
            Bookings, rooms, payments, and your team — all in one clean dashboard.
          </p>
          <div className="flex flex-col gap-3">
            {["15-day free trial", "No credit card required", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(193,68,14,0.2)", color: "#C1440E" }}
                >
                  <IcCheck />
                </div>
                <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.55)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4" style={{ borderLeft: "2px solid rgba(193,68,14,0.45)" }}>
          <p className="text-[13px] italic mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
            &ldquo;SurfBook saved us 15 hours a week and double-bookings just stopped.&rdquo;
          </p>
          <p className="text-[12px] font-medium" style={{ color: "#C1440E" }}>
            — Karim Ouazzani, Taghazout Wave Co.
          </p>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: "#F5ECD7" }}
      >
        <div className="w-full max-w-[400px]">

          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1
            className="font-bold mb-1"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#0A0A0A" }}
          >
            Welcome back
          </h1>
          <p className="text-[14px] mb-8" style={{ color: "#6B7280" }}>
            Log in to your SurfBook account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                defaultValue="alex@taghazout.com"
                style={{ background: "white" }}
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                defaultValue="password"
                style={{ background: "white" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white text-[14px] font-semibold transition-all hover:brightness-110"
              style={{ background: "#C1440E", marginTop: "8px" }}
            >
              Log In
            </button>
          </form>

          <p className="text-center text-[13px] mt-6" style={{ color: "#6B7280" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: "#C1440E" }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
