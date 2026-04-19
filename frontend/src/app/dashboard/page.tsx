"use client";

import { mockBookings, mockCustomers, mockRooms, mockActivities } from "@/lib/mockData";
import { formatPrice, formatDate, getStatusColor, capitalize } from "@/lib/helpers";
import { Booking, Room } from "@/types";

export default function DashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next7 = new Date(today);
  next7.setDate(next7.getDate() + 7);

  const activeRooms = mockRooms.filter((r: Room) => r.isActive);
  const totalRevenue = mockBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingBookings = mockBookings.filter((b) => b.status === "pending").length;
  const occupiedToday = mockBookings.filter((b) => {
    if (b.status === "cancelled") return false;
    const ci = new Date(b.checkIn);  ci.setHours(0,0,0,0);
    const co = new Date(b.checkOut); co.setHours(0,0,0,0);
    return ci <= today && co > today;
  }).length;
  const occupancyRate = activeRooms.length > 0 ? Math.round((occupiedToday / activeRooms.length) * 100) : 0;
  const activityBookings = mockBookings.filter((b) => b.activities && b.activities.length > 0).length;

  const upcomingArrivals = mockBookings
    .filter((b) => {
      if (b.status === "cancelled") return false;
      const ci = new Date(b.checkIn); ci.setHours(0,0,0,0);
      return ci >= today && ci <= next7;
    })
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, 10);

  const recentBookings = [...mockBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = {
    totalBookings: mockBookings.length,
    pendingBookings,
    totalCustomers: mockCustomers.length,
    totalRevenue,
    occupancyRate,
    totalRooms: activeRooms.length,
    totalActivities: mockActivities.length,
    activityBookings,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back — here&apos;s your overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { label: "Bookings",  value: stats.totalBookings,            accent: "#1B4F72" },
          { label: "Pending",   value: stats.pendingBookings,          accent: "#D97706" },
          { label: "Customers", value: stats.totalCustomers,           accent: "#1B4F72" },
          { label: "Revenue",   value: formatPrice(stats.totalRevenue), accent: "#C1440E" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card" style={{ borderTop: `3px solid ${stat.accent}` }}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold mt-1.5" style={{ color: stat.accent, fontFamily: "'Playfair Display', serif" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card" style={{ borderTop: `3px solid ${stats.occupancyRate > 80 ? "#16A34A" : stats.occupancyRate > 50 ? "#D97706" : "#DC2626"}` }}>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Occupancy</p>
          <p className="text-2xl font-bold mt-1.5" style={{ fontFamily: "'Playfair Display', serif", color: stats.occupancyRate > 80 ? "#16A34A" : stats.occupancyRate > 50 ? "#D97706" : "#DC2626" }}>
            {stats.occupancyRate}%
          </p>
          <p className="text-xs text-gray-400 mt-0.5">of {stats.totalRooms} rooms today</p>
        </div>
        {[
          { label: "Rooms",           value: stats.totalRooms,      accent: "#1B4F72" },
          { label: "Activities",      value: stats.totalActivities, accent: "#1B4F72" },
          { label: "With Activities", value: stats.activityBookings,accent: "#1B4F72" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card" style={{ borderTop: `3px solid ${stat.accent}` }}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold mt-1.5" style={{ color: stat.accent, fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Upcoming Arrivals</h2>
            <span className="badge" style={{ background: "rgba(27,79,114,0.08)", color: "#1B4F72" }}>Next 7 days</span>
          </div>
          {upcomingArrivals.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">No upcoming arrivals.</p>
          ) : (
            <div className="space-y-2">
              {upcomingArrivals.map((booking) => {
                const customer = booking.customerId as any;
                const room = booking.roomId as any;
                return (
                  <div key={booking._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{customer?.firstName} {customer?.lastName}</p>
                      <p className="text-xs text-gray-400">{room?.name || "—"} · {booking.numberOfGuests} guest{booking.numberOfGuests !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{formatDate(booking.checkIn)}</p>
                      <span className={`badge text-[10px] ${getStatusColor(booking.status)}`}>{capitalize(booking.status)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Bookings</h2>
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="table-header pb-3">Customer</th>
                  <th className="table-header pb-3">Room</th>
                  <th className="table-header pb-3">Check-in</th>
                  <th className="table-header pb-3">Status</th>
                  <th className="table-header pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => {
                  const customer = booking.customerId as any;
                  const room = booking.roomId as any;
                  return (
                    <tr key={booking._id} className="table-row">
                      <td className="table-cell font-medium">{customer?.firstName} {customer?.lastName}</td>
                      <td className="table-cell text-gray-500">{room?.name || "—"}</td>
                      <td className="table-cell text-gray-500">{formatDate(booking.checkIn)}</td>
                      <td className="table-cell"><span className={`badge ${getStatusColor(booking.status)}`}>{capitalize(booking.status)}</span></td>
                      <td className="table-cell text-right font-semibold">{formatPrice(booking.totalPrice)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
