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

export default function RegisterPage() {
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
          style={{ top: "25%", right: "-5%", width: "350px", height: "300px",
            background: "radial-gradient(circle, rgba(27,79,114,0.14) 0%, transparent 65%)", filter: "blur(60px)" }}/>

        <Logo light />

        <div>
          <div className="text-[11px] uppercase tracking-widest font-semibold mb-4" style={{ color: "#C1440E" }}>
            Start your free trial
          </div>
          <h2
            className="text-[34px] font-bold leading-[1.15] text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything your<br/>surf camp needs
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.42)" }}>
            Set up in minutes. No credit card. Cancel anytime.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { title: "Booking management",  desc: "Accept & track every reservation online" },
              { title: "Room & package setup", desc: "Define rooms, prices, and surf packages" },
              { title: "Team & roles",         desc: "Invite staff with the right permissions"  },
              { title: "Stripe payments",      desc: "Accept card payments from day one"        },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(193,68,14,0.2)", color: "#C1440E" }}
                >
                  <IcCheck />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{item.title}</p>
                  <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.38)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "15 days", label: "Free trial" },
            { value: "< 1 hr",  label: "To set up"  },
            { value: "100%",    label: "Web-based"  },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="font-bold text-white text-[15px]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: "#F5ECD7" }}
      >
        <div className="w-full max-w-[420px]">

          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1
            className="font-bold mb-1"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#0A0A0A" }}
          >
            Create your account
          </h1>
          <p className="text-[14px] mb-8" style={{ color: "#6B7280" }}>
            Set up your surf company in minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>First Name</label>
                <input type="text" className="input" placeholder="John" style={{ background: "white" }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Last Name</label>
                <input type="text" className="input" placeholder="Surfer" style={{ background: "white" }} />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Company Name</label>
              <input type="text" className="input" placeholder="Bali Surf Camp" style={{ background: "white" }} />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Email</label>
              <input type="email" className="input" placeholder="you@example.com" style={{ background: "white" }} />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#374151" }}>Password</label>
              <input type="password" className="input" placeholder="At least 6 characters" minLength={6} style={{ background: "white" }} />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white text-[14px] font-semibold transition-all hover:brightness-110"
              style={{ background: "#C1440E", marginTop: "8px" }}
            >
              Create Account — It&apos;s Free
            </button>
          </form>

          <p className="text-center text-[13px] mt-6" style={{ color: "#6B7280" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "#C1440E" }}>
              Log in
            </Link>
          </p>

          <p className="text-center text-[11px] mt-4" style={{ color: "#9CA3AF" }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
