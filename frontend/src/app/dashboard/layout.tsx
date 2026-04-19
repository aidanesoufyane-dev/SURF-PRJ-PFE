"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { mockUser } from "@/lib/mockData";

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#C1440E"/>
        <path d="M6 21C8.5 18 11.5 17 15 19C18.5 21 20 23 23.5 21C26.5 19.5 28 18 30 19.5"
          stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M6 15C8.5 12 11.5 11 15 13C18.5 15 20 17 23.5 15C26.5 13.5 28 12 30 13.5"
          stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".55"/>
      </svg>
      <span className="text-[16px] font-bold tracking-[-0.02em] text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        SurfBook
      </span>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const user = mockUser;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: t.dashboard.overview,   href: "/dashboard",             section: ""       },
    { label: t.dashboard.calendar,   href: "/dashboard/calendar",    section: ""       },
    { label: t.dashboard.bookings,   href: "/dashboard/bookings",    section: "manage" },
    { label: t.dashboard.rooms,      href: "/dashboard/rooms",       section: "manage" },
    { label: t.dashboard.packages,   href: "/dashboard/packages",    section: "manage" },
    { label: t.dashboard.activities, href: "/dashboard/activities",  section: "manage" },
    { label: t.dashboard.sessions,   href: "/dashboard/sessions",    section: "manage" },
    { label: t.dashboard.customers,  href: "/dashboard/customers",   section: "people" },
    { label: t.dashboard.team,       href: "/dashboard/team",        section: "people" },
    { label: "Subscription",         href: "/dashboard/subscription",section: "billing"},
    { label: t.dashboard.settings,   href: "/dashboard/settings",    section: "billing"},
  ];

  const sectionLabels: Record<string, string> = { manage: "Manage", people: "People", billing: "Billing" };
  let currentSection = "";
  const navWithSections = navItems.map((item) => {
    const showSection = item.section && item.section !== currentSection;
    if (item.section) currentSection = item.section;
    return { ...item, showSectionLabel: showSection ? sectionLabels[item.section] : null };
  });

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  const SidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "#0C0F0A" }}>
      <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
          <SidebarLogo />
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navWithSections.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <div key={item.href}>
              {item.showSectionLabel && (
                <p className="text-[10px] font-semibold uppercase tracking-widest px-3 pt-5 pb-2"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
                  {item.showSectionLabel}
                </p>
              )}
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150"
                style={isActive
                  ? { background: "rgba(193,68,14,0.9)", color: "white", fontFamily: "'DM Sans', sans-serif" }
                  : { color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.18)" }} />
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
            style={{ background: "#C1440E", fontFamily: "'Playfair Display', serif" }}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium truncate text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[10px] capitalize" style={{ color: "rgba(255,255,255,0.38)" }}>
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      <aside className="w-56 fixed inset-y-0 left-0 z-30 hidden md:flex flex-col">
        {SidebarContent}
      </aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 flex flex-col md:hidden transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {SidebarContent}
      </aside>
      <main className="flex-1 md:ml-56 min-h-screen flex flex-col">
        <div className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-20 border-b"
          style={{ background: "#0C0F0A", borderColor: "rgba(255,255,255,0.07)" }}>
          <SidebarLogo />
          <button className="text-white p-1" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {sidebarOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
        <div className="flex-1 p-6 sm:p-8 max-w-7xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
