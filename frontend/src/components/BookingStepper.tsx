"use client";

const STEPS = ["Dates", "Room", "Package", "Activities", "Details", "Review", "Payment"];

interface Props {
  currentStep: number;
  completedSteps: number[];
}

export default function BookingStepper({ currentStep, completedSteps }: Props) {
  return (
    <div
      className="bg-white border-b border-gray-100 sticky top-0 z-50"
      style={{ height: 56, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Desktop stepper */}
      <div className="hidden md:flex items-center justify-center h-full gap-0 max-w-4xl mx-auto px-6">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = completedSteps.includes(stepNum);
          const isActive = stepNum === currentStep;
          const isFuture = stepNum > currentStep && !isCompleted;

          const circleStyle: React.CSSProperties = {
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            flexShrink: 0,
            background: isCompleted ? "#1D9E75" : isActive ? "#0D2E4A" : "#e5e7eb",
            color: isCompleted || isActive ? "white" : "#9ca3af",
          };

          const labelStyle: React.CSSProperties = {
            fontSize: 12,
            fontWeight: isActive ? 600 : 400,
            color: isCompleted ? "#1D9E75" : isActive ? "#0D2E4A" : "#9ca3af",
            marginTop: 2,
            whiteSpace: "nowrap",
          };

          const connectorStyle: React.CSSProperties = {
            flex: 1,
            height: 2,
            minWidth: 20,
            background: isCompleted ? "#1D9E75" : "#e5e7eb",
            margin: "0 6px",
          };

          return (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={circleStyle}>
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : stepNum}
                </div>
                <span style={labelStyle}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={connectorStyle} />}
            </div>
          );
        })}
      </div>

      {/* Mobile — "Step X of 7 — StepName" */}
      <div className="flex md:hidden items-center justify-center h-full">
        <p style={{ fontSize: 14, color: "#0D2E4A", fontWeight: 500 }}>
          Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}
