// ================================
// SETTINGS PAGE (Dashboard)
// Company settings — update company info, payment config, payment history.
// Only admin can access this page.
// ================================

"use client";

import { useState } from "react";
import { mockCompany, mockPayments, mockBookings, mockUser } from "@/lib/mockData";
import { formatPrice, formatDate, getStatusColor, capitalize } from "@/lib/helpers";
import { Company, Payment, Booking } from "@/types";
import ImageUpload from "@/components/ImageUpload";

type SettingsTab = "company" | "payment-settings" | "payment-history";

export default function SettingsPage() {
  const user = mockUser;
  const canRecord = user?.role === "admin" || user?.role === "manager";

  const [activeTab, setActiveTab] = useState<SettingsTab>("company");
  const [company, setCompany] = useState<Company | null>(mockCompany);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Company form state — pre-populated from mockCompany
  const [form, setForm] = useState({
    name: mockCompany.name,
    description: mockCompany.description || "",
    email: mockCompany.email || "",
    phone: mockCompany.phone || "",
    address: mockCompany.address || "",
    city: mockCompany.city || "",
    country: mockCompany.country || "",
    website: mockCompany.website || "",
    logo: mockCompany.logo || "",
    coverImage: mockCompany.coverImage || "",
  });

  // Payment settings state — pre-populated from mockCompany.paymentSettings
  const [paymentForm, setPaymentForm] = useState({
    method: (mockCompany.paymentSettings?.method || "manual") as "manual" | "stripe" | "bank_transfer",
    manualInstructions:
      mockCompany.paymentSettings?.manualInstructions ||
      "Please pay at the reception when you arrive.",
    bankName: mockCompany.paymentSettings?.bankName || "",
    iban: mockCompany.paymentSettings?.iban || "",
    swift: mockCompany.paymentSettings?.swift || "",
    accountHolder: mockCompany.paymentSettings?.accountHolder || "",
  });
  const [savingPayment, setSavingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  // Payment history state — read-only from mock data
  const [payments] = useState<Payment[]>(mockPayments);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [recordForm, setRecordForm] = useState({
    bookingId: "",
    amount: 0,
    method: "credit_card" as Payment["method"],
    type: "full" as Payment["type"],
    notes: "",
  });

  // Save company settings
  function handleSave() {
    setSaving(true);
    setMessage("");
    setCompany(prev => ({ ...prev!, ...form }));
    setMessage("Settings saved.");
    setTimeout(() => setMessage(""), 3000);
    setSaving(false);
  }

  // Save payment settings
  function handleSavePayment() {
    setSavingPayment(true);
    setPaymentMessage("");
    setCompany(prev => ({ ...prev!, paymentSettings: paymentForm }));
    setPaymentMessage("Payment settings saved.");
    setTimeout(() => setPaymentMessage(""), 3000);
    setSavingPayment(false);
  }

  // Record a payment (mock — just closes the form)
  function handleRecordPayment() {
    setShowRecordForm(false);
    setRecordForm({
      bookingId: "",
      amount: 0,
      method: "credit_card",
      type: "full",
      notes: "",
    });
  }

  const totalRevenue = payments
    .filter((p) => (p as any).status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your company configuration</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {(
          [
            { id: "company", label: "Company Info" },
            { id: "payment-settings", label: "Payment Settings" },
            { id: "payment-history", label: "Payments History" },
          ] as { id: SettingsTab; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================================
          TAB: COMPANY INFO
          ================================ */}
      {activeTab === "company" && (
        <>
          {message && (
            <div
              className={
                message.includes("success") ? "alert-success" : "alert-error"
              }
            >
              {message}
            </div>
          )}

          <div className="form-card">
            {company && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-600">Your booking page URL:</p>
                <p className="font-mono text-gray-700 font-medium mt-1">
                  {typeof window !== "undefined"
                    ? window.location.origin
                    : ""}
                  /book/{company.slug}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Share this link with your customers so they can make bookings.
                </p>
              </div>
            )}

            <div className="form-grid">
              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Website</label>
                <input
                  type="url"
                  className="input"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">City</label>
                <input
                  type="text"
                  className="input"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Country</label>
                <input
                  type="text"
                  className="input"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                <input
                  type="text"
                  className="input"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea
                  className="input"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-1">
                <ImageUpload
                  label="Company Logo"
                  defaultImage={form.logo}
                  onUpload={(url) => setForm({ ...form, logo: url })}
                />
              </div>
              <div className="md:col-span-1">
                <ImageUpload
                  label="Cover Image (Surf Camp)"
                  defaultImage={form.coverImage}
                  onUpload={(url) => setForm({ ...form, coverImage: url })}
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary mt-6 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </>
      )}

      {/* ================================
          TAB: PAYMENT SETTINGS
          ================================ */}
      {activeTab === "payment-settings" && (
        <>
          {paymentMessage && (
            <div
              className={
                paymentMessage.includes("success")
                  ? "alert-success"
                  : "alert-error"
              }
            >
              {paymentMessage}
            </div>
          )}

          <div className="form-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Payment Settings
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Configure how customers pay for bookings.
            </p>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <label className="label">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                {(
                  [
                    {
                      id: "manual",
                      label: "Manual Payment",
                      icon: "",
                      desc: "Customers pay on arrival",
                    },
                    {
                      id: "stripe",
                      label: "Stripe",
                      icon: "",
                      desc: "Online card payments",
                    },
                    {
                      id: "bank_transfer",
                      label: "Bank Transfer",
                      icon: "",
                      desc: "Wire transfer to your bank",
                    },
                  ] as {
                    id: "manual" | "stripe" | "bank_transfer";
                    label: string;
                    icon: string;
                    desc: string;
                  }[]
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setPaymentForm({ ...paymentForm, method: option.id })
                    }
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentForm.method === option.id
                        ? "border-gray-500 bg-gray-50/50 shadow-sm"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <p className="font-medium text-gray-900 text-sm">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Payment Fields */}
            {paymentForm.method === "manual" && (
              <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <label className="label">Payment Instructions</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="e.g., Please pay at the reception when you arrive."
                  value={paymentForm.manualInstructions}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      manualInstructions: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-400 mt-2">
                  These instructions will be shown to customers after they
                  complete a booking.
                </p>
              </div>
            )}

            {/* Stripe Fields */}
            {paymentForm.method === "stripe" && (
              <div className="mb-6 p-5 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Stripe Integration
                    </p>
                    <p className="text-sm text-gray-500">
                      Online payment processing
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <p className="text-sm text-gray-500">
                    Stripe integration is coming soon. Customers will see a
                    &quot;Pay Now&quot; button during booking. For now, a
                    placeholder will be shown.
                  </p>
                </div>
              </div>
            )}

            {/* Bank Transfer Fields */}
            {paymentForm.method === "bank_transfer" && (
              <div className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Bank Account Details
                </p>
                <div className="form-grid">
                  <div>
                    <label className="label">Bank Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., Bank of Bali"
                      value={paymentForm.bankName}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          bankName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">Account Holder</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., Bali Surf Camp Ltd"
                      value={paymentForm.accountHolder}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          accountHolder: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">IBAN</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., DE89370400440532013000"
                      value={paymentForm.iban}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          iban: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">SWIFT / BIC</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., COBADEFFXXX"
                      value={paymentForm.swift}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          swift: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  These details will be displayed to customers so they can
                  transfer payment.
                </p>
              </div>
            )}

            <button
              onClick={handleSavePayment}
              disabled={savingPayment}
              className="btn-primary disabled:opacity-50"
            >
              {savingPayment ? "Saving..." : "Save Payment Settings"}
            </button>
          </div>
        </>
      )}

      {/* ================================
          TAB: PAYMENT HISTORY
          ================================ */}
      {activeTab === "payment-history" && (
        <>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              Total Revenue:{" "}
              <span className="font-bold text-emerald-600">
                {formatPrice(totalRevenue)}
              </span>
            </p>
            {canRecord && (
              <button
                onClick={() => setShowRecordForm(!showRecordForm)}
                className="btn-primary"
              >
                + Record Payment
              </button>
            )}
          </div>

          {/* Record Payment Form */}
          {showRecordForm && (
            <div className="form-card mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Record Payment
              </h2>
              <div className="form-grid">
                <div>
                  <label className="label">Booking</label>
                  <select
                    className="input"
                    value={recordForm.bookingId}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        bookingId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a booking</option>
                    {bookings.map((b) => {
                      const customer = b.customerId as any;
                      return (
                        <option key={b._id} value={b._id}>
                          {customer?.firstName} {customer?.lastName} —{" "}
                          {formatPrice(b.totalPrice)} (
                          {capitalize(b.paymentStatus)})
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="label">Amount ($)</label>
                  <input
                    type="number"
                    className="input"
                    value={recordForm.amount}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        amount: Number(e.target.value),
                      })
                    }
                    min={0}
                    step={0.01}
                  />
                </div>
                <div>
                  <label className="label">Method</label>
                  <select
                    className="input"
                    value={recordForm.method}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        method: e.target.value as Payment["method"],
                      })
                    }
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Payment Type</label>
                  <select
                    className="input"
                    value={recordForm.type}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        type: e.target.value as Payment["type"],
                      })
                    }
                  >
                    <option value="full">Full Payment</option>
                    <option value="deposit">Deposit</option>
                    <option value="remaining">Remaining Balance</option>
                    <option value="refund">Refund</option>
                  </select>
                </div>
                <div>
                  <label className="label">Notes</label>
                  <input
                    type="text"
                    className="input"
                    value={recordForm.notes}
                    onChange={(e) =>
                      setRecordForm({ ...recordForm, notes: e.target.value })
                    }
                    placeholder="Optional notes"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button onClick={handleRecordPayment} className="btn-primary">
                  Record Payment
                </button>
                <button
                  onClick={() => setShowRecordForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Payments Table */}
          {payments.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">No payments recorded yet.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="w-full text-sm">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell font-medium">Customer</th>
                    <th className="table-cell font-medium">Amount</th>
                    <th className="table-cell font-medium">Method</th>
                    <th className="table-cell font-medium">Type</th>
                    <th className="table-cell font-medium">Status</th>
                    <th className="table-cell font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => {
                    const customer = payment.customerId as any;
                    return (
                      <tr key={payment._id} className="table-row">
                        <td className="table-cell font-medium text-gray-800">
                          {customer?.firstName} {customer?.lastName}
                        </td>
                        <td className="table-cell font-semibold">
                          {formatPrice(payment.amount)}
                        </td>
                        <td className="table-cell text-gray-500 capitalize">
                          {payment.method.replace("_", " ")}
                        </td>
                        <td className="table-cell">
                          <span
                            className={`badge ${
                              payment.type === "refund"
                                ? "bg-red-50 text-red-700"
                                : payment.type === "deposit"
                                ? "bg-amber-50 text-amber-700"
                                : payment.type === "remaining"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {capitalize(payment.type || "full")}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span
                            className={`badge ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {capitalize(payment.status)}
                          </span>
                        </td>
                        <td className="table-cell text-gray-400">
                          {formatDate(payment.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
