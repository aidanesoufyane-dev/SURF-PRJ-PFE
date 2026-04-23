"use client";

import { useState } from "react";

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Props {
  checkin: Date | null;
  checkout: Date | null;
  onCheckinChange: (d: Date) => void;
  onCheckoutChange: (d: Date) => void;
  mode: "checkin" | "checkout";
  onModeChange: (m: "checkin" | "checkout") => void;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function BookingCalendar({ checkin, checkout, onCheckinChange, onCheckoutChange, mode, onModeChange }: Props) {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const clicked = new Date(year, month, day);
    if (clicked < today) return;
    if (mode === "checkin") {
      onCheckinChange(clicked);
      if (checkout && clicked >= checkout) onCheckoutChange(null as any);
      onModeChange("checkout");
    } else {
      if (checkin && clicked <= checkin) {
        onCheckinChange(clicked);
        onModeChange("checkout");
      } else {
        onCheckoutChange(clicked);
        onModeChange("checkin");
      }
    }
  };

  const getDayState = (day: number) => {
    const d = new Date(year, month, day);
    const isPast = d < today;
    const isCheckin = checkin && startOfDay(checkin).getTime() === d.getTime();
    const isCheckout = checkout && startOfDay(checkout).getTime() === d.getTime();
    const isInRange = checkin && checkout && d > startOfDay(checkin) && d < startOfDay(checkout);
    return { isPast, isCheckin, isCheckout, isInRange };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-lg mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6B68" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span className="text-sm font-medium text-gray-800">
          {MONTH_NAMES[month]} {year}
        </span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6B68" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const { isPast, isCheckin, isCheckout, isInRange } = getDayState(day);

          let cellStyle: React.CSSProperties = {
            width: "100%",
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            cursor: isPast ? "not-allowed" : "pointer",
            opacity: isPast ? 0.3 : 1,
            transition: "background 0.1s, color 0.1s",
            borderRadius: isInRange ? 0 : 8,
          };

          if (isCheckin || isCheckout) {
            cellStyle = { ...cellStyle, background: "#C4552A", color: "white", borderRadius: 8 };
          } else if (isInRange) {
            cellStyle = { ...cellStyle, background: "rgba(196,85,42,0.1)", color: "#C4552A" };
          }

          return (
            <div key={idx}
              style={cellStyle}
              className={!isPast && !isCheckin && !isCheckout && !isInRange ? "hover:bg-[#C4552A]/10 hover:text-[#C4552A]" : ""}
              onClick={() => !isPast && handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Mode hint */}
      <p className="text-xs text-center mt-3" style={{ color: "#9ca3af" }}>
        {mode === "checkin" ? "Select check-in date" : "Select check-out date"}
      </p>
    </div>
  );
}
