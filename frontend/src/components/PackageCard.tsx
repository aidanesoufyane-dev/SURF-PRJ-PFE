"use client";

interface Package {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  includes: string[];
}

interface Props {
  pkg: Package;
  selected: boolean;
  onSelect: () => void;
}

const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PackageCard({ pkg, selected, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className="relative cursor-pointer rounded-2xl bg-white p-5 transition-all"
      style={{
        border: selected ? "2px solid #C4552A" : pkg.popular ? "2px solid #C4552A" : "1px solid #f3f4f6",
        transform: pkg.popular ? "scale(1.03)" : "scale(1)",
        fontFamily: "'DM Sans', sans-serif",
        zIndex: pkg.popular ? 1 : 0,
      }}
    >
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium text-white whitespace-nowrap"
          style={{ background: "#C4552A" }}>
          Most popular
        </div>
      )}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#C4552A" }}>
          <IcCheck />
        </div>
      )}

      <h3 className="font-medium text-gray-900 text-base">{pkg.name}</h3>
      <p className="text-sm mt-1" style={{ color: pkg.price === 0 ? "#9ca3af" : "#C4552A" }}>
        {pkg.price === 0 ? "Included" : `+$${pkg.price}/night`}
      </p>
      {pkg.price > 0 && (
        <p className="text-xs text-gray-300" style={{ marginTop: 2 }}>+{(pkg.price * 10.2).toFixed(0)} MAD/night</p>
      )}

      <ul className="mt-4 space-y-2">
        {pkg.includes.map(item => (
          <li key={item} className="flex items-start gap-2">
            <span className="flex-shrink-0 mt-0.5" style={{ color: "#1D9E75" }}><IcCheck /></span>
            <span className="text-sm text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
