"use client";

import { useState } from "react";
import { mockBookings } from "@/lib/mockData";
import { Booking } from "@/types";
import Calendar from "@/components/Calendar";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookings = mockBookings.filter((b) => b.status !== "cancelled");

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div>
      <div className="page-header mb-6">
        <div>
          <h1 className="page-title">Booking Calendar</h1>
          <p className="page-subtitle">View and manage your bookings by date</p>
        </div>
      </div>

      <div className="card">
        <Calendar
          bookings={bookings}
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </div>
  );
}
