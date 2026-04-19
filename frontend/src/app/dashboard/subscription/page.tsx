"use client";

import { useState } from "react";
import { mockSubscription, mockPlans, mockCompany, mockUser } from "@/lib/mockData";
import { formatPrice, formatDate, capitalize } from "@/lib/helpers";
import { Subscription, SubscriptionPlan, Company } from "@/types";

export default function SubscriptionPage() {
  const user = mockUser;

  const [subscription, setSubscription] = useState<Subscription>(mockSubscription);
  const [company] = useState<Company>(mockCompany);
  const [plans] = useState<SubscriptionPlan[]>(mockPlans);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubscribe(planId: string) {
    setActionLoading(true);
    setMessage("");
    setError("");
    setSubscription(prev => ({ ...prev!, plan: planId as any, status: "active" }));
    setMessage("Subscription updated.");
    setTimeout(() => setMessage(""), 3000);
    setActionLoading(false);
  }

  function handleRenew() {
    setActionLoading(true);
    setMessage("");
    setError("");
    setMessage("Subscription renewed.");
    setTimeout(() => setMessage(""), 3000);
    setActionLoading(false);
  }

  function handleCancel() {
    if (!confirm("Are you sure you want to cancel your subscription?")) return;
    setActionLoading(true);
    setMessage("");
    setError("");
    setSubscription(prev => ({ ...prev!, status: "canceled" }));
    setMessage("Subscription cancelled.");
    setTimeout(() => setMessage(""), 3000);
    setActionLoading(false);
  }

  const isExpired  = subscription?.status === "expired";
  const isCanceled = subscription?.status === "canceled";
  const isTrial    = subscription?.status === "trial";
  const isActive   = subscription?.status === "active";

  const statusStyle: Record<string, { bg: string; color: string }> = {
    active:   { bg: "rgba(34,197,94,0.1)",   color: "#16A34A" },
    trial:    { bg: "rgba(29,111,237,0.1)",  color: "#1D6FED" },
    expired:  { bg: "rgba(239,68,68,0.1)",   color: "#DC2626" },
    canceled: { bg: "rgba(107,114,128,0.1)", color: "#6B7280" },
  };
  const statusBadge = statusStyle[subscription?.status ?? ""] ?? statusStyle.canceled;

  return (
    <div style={{ fontFamily: "Outfit, sans-serif" }}>

      {/* ── Page header ─────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
          Subscription
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your plan and billing</p>
      </div>

      {message && (
        <div className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#16A34A" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#DC2626" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {/* ── Expired / Canceled banner ────────────────────── */}
      {(isExpired || isCanceled) && (
        <div className="mb-6 flex items-start gap-3 px-5 py-4 rounded-2xl"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}>
          <svg width="18" height="18" className="flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div>
            <p className="font-semibold text-sm" style={{ color: "#DC2626", fontFamily: "Syne, sans-serif" }}>
              {isExpired ? "Your subscription has expired" : "Subscription canceled"}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              New bookings are paused. Your existing data is safe. Choose a plan below to reactivate.
            </p>
            {isExpired && (
              <button onClick={handleRenew} disabled={actionLoading} className="btn-primary mt-3 text-sm py-2 px-4">
                {actionLoading ? "Processing…" : "Renew Now"}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">

        {/* ── Current subscription card ─────────────────── */}
        <div className="lg:col-span-1 rounded-2xl p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="text-[15px] font-semibold mb-5" style={{ fontFamily: "Syne, sans-serif" }}>
            Current Plan
          </h2>

          {subscription ? (
            <div className="space-y-4">
              {/* Plan name + price hero */}
              <div className="rounded-xl p-4 text-center" style={{ background: "#F5F7FF", border: "1px solid rgba(29,111,237,0.12)" }}>
                <div className="text-[13px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#1D6FED", fontFamily: "Syne, sans-serif" }}>
                  {subscription.plan}
                </div>
                <div className="text-3xl font-bold" style={{ fontFamily: "Syne, sans-serif", color: "#0A0D08" }}>
                  {formatPrice(subscription.pricePerMonth)}
                  <span className="text-sm font-normal text-gray-400">/mo</span>
                </div>
              </div>

              {/* Meta rows */}
              <div className="space-y-3">
                {[
                  {
                    label: "Status",
                    value: (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{ background: statusBadge.bg, color: statusBadge.color }}>
                        {capitalize(subscription.status)}
                      </span>
                    ),
                  },
                  { label: "Started",        value: formatDate(subscription.startDate) },
                  {
                    label: isExpired ? "Expired On" : isTrial ? "Trial Ends" : "Next Billing",
                    value: (
                      <span style={{ color: isExpired ? "#DC2626" : undefined }} className="font-medium">
                        {formatDate(subscription.nextBillingDate)}
                      </span>
                    ),
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-400">{row.label}</span>
                    <span className="text-[13px] text-gray-700">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                {isExpired && (
                  <button onClick={handleRenew} disabled={actionLoading} className="btn-primary w-full justify-center">
                    {actionLoading ? "Processing…" : "Renew Subscription"}
                  </button>
                )}
                {(isActive || isTrial) && (
                  <button
                    onClick={handleCancel}
                    disabled={actionLoading}
                    className="w-full text-[13px] font-medium py-2 rounded-lg transition-colors hover:bg-red-50"
                    style={{ color: "#DC2626" }}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "#F3F4F6" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>
                </svg>
              </div>
              <p className="text-[13px] text-gray-400">No active subscription.</p>
              <p className="text-[12px] text-gray-400 mt-1">Choose a plan on the right to get started.</p>
            </div>
          )}
        </div>

        {/* ── Plan cards ───────────────────────────────────── */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan === plan.id;
            const isFeatured    = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className="rounded-2xl p-5 flex flex-col transition-all duration-200"
                style={
                  isFeatured
                    ? { background: "#0C0F0A", border: "1px solid rgba(29,111,237,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }
                    : isCurrentPlan
                    ? { background: "white", border: "1px solid #1D6FED", boxShadow: "0 0 0 3px rgba(29,111,237,0.1)" }
                    : { background: "white", border: "1px solid rgba(0,0,0,0.08)" }
                }
              >
                {isFeatured && (
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#1D6FED", fontFamily: "Syne, sans-serif" }}>
                    ★ Most Popular
                  </div>
                )}
                {isCurrentPlan && !isFeatured && (
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#1D6FED", fontFamily: "Syne, sans-serif" }}>
                    Current Plan
                  </div>
                )}

                <div className="mb-4">
                  <div className={`text-[12px] font-semibold uppercase tracking-wider mb-1 ${isFeatured ? "text-gray-400" : "text-gray-500"}`}
                    style={{ fontFamily: "Syne, sans-serif" }}>
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[32px] font-extrabold leading-none ${isFeatured ? "text-white" : "text-gray-900"}`}
                      style={{ fontFamily: "Syne, sans-serif" }}>
                      {formatPrice(plan.pricePerMonth)}
                    </span>
                    <span className={`text-[12px] ${isFeatured ? "text-gray-500" : "text-gray-400"}`}>/mo</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-[12px] ${isFeatured ? "text-gray-400" : "text-gray-600"}`}>
                      <div className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                        style={{ background: isFeatured ? "rgba(29,111,237,0.2)" : "rgba(29,111,237,0.08)" }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1D6FED" strokeWidth="3.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrentPlan && (isActive || isTrial) ? (
                  <div className="w-full py-2 rounded-xl text-center text-[12px] font-semibold"
                    style={{ background: "rgba(29,111,237,0.08)", color: "#1D6FED" }}>
                    Active Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={actionLoading}
                    className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                    style={{ background: "#1D6FED", fontFamily: "Syne, sans-serif" }}
                  >
                    {actionLoading ? "Processing…" : isCurrentPlan ? "Renew Plan" : "Choose Plan"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-[12px] text-gray-400 mt-8">
        Payments are simulated in this demo. In production this integrates with Stripe.
      </p>
    </div>
  );
}
