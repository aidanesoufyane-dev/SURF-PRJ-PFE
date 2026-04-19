"use client";

import { useState } from "react";
import { mockBookings, mockUser } from "@/lib/mockData";
import { formatPrice, formatDate, getStatusColor, capitalize } from "@/lib/helpers";
import { Booking } from "@/types";

export default function BookingsPage() {
  const user = mockUser;
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  function updateStatus(bookingId: string, newStatus: string) {
    setBookings((prev) =>
      prev.map((b) => b._id === bookingId ? { ...b, status: newStatus as Booking["status"] } : b)
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">Manage and track all reservations</p>
        </div>
        <select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><p className="empty-state-text">No bookings found.</p></div>
      ) : (
        <div className="table-container">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">Customer</th>
                <th className="table-header">Room</th>
                <th className="table-header">Check-in</th>
                <th className="table-header">Check-out</th>
                <th className="table-header">Nights</th>
                <th className="table-header">Status</th>
                <th className="table-header">Payment</th>
                <th className="table-header">Total</th>
                {(user.role === "admin" || user.role === "manager") && <th className="table-header">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => {
                const customer = booking.customerId as any;
                const room = booking.roomId as any;
                return (
                  <tr key={booking._id} className="table-row">
                    <td className="table-cell">
                      <p className="font-medium text-gray-800">{customer?.firstName} {customer?.lastName}</p>
                      <p className="text-gray-400 text-xs">{customer?.email}</p>
                    </td>
                    <td className="table-cell text-gray-500">{room?.name || "—"}</td>
                    <td className="table-cell text-gray-500">{formatDate(booking.checkIn)}</td>
                    <td className="table-cell text-gray-500">{formatDate(booking.checkOut)}</td>
                    <td className="table-cell text-gray-500">{booking.numberOfNights}</td>
                    <td className="table-cell"><span className={`badge ${getStatusColor(booking.status)}`}>{capitalize(booking.status)}</span></td>
                    <td className="table-cell"><span className={`badge ${getStatusColor(booking.paymentStatus)}`}>{capitalize(booking.paymentStatus)}</span></td>
                    <td className="table-cell font-semibold">{formatPrice(booking.totalPrice)}</td>
                    {(user.role === "admin" || user.role === "manager") && (
                      <td className="table-cell">
                        <select
                          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
