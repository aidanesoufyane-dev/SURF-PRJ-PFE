"use client";

interface Room {
  name: string;
  price: number;
}

interface Pkg {
  name: string;
  price: number;
}

interface Props {
  room: Room | null;
  pkg: Pkg | null;
  activities: { name: string; price: number }[];
  nights: number;
  guests: number;
}

function Row({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">${amount}</span>
    </div>
  );
}

export default function PriceBreakdown({ room, pkg, activities, nights, guests }: Props) {
  const roomTotal = room ? room.price * nights : 0;
  const pkgTotal = pkg ? pkg.price * nights * guests : 0;
  const activitiesTotal = activities.reduce((s, a) => s + a.price, 0);
  const total = roomTotal + pkgTotal + activitiesTotal;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Price breakdown</p>

      {room && nights > 0 && (
        <Row label={`${room.name} × ${nights} night${nights !== 1 ? "s" : ""}`} amount={roomTotal} />
      )}
      {pkg && pkg.price > 0 && nights > 0 && (
        <Row label={`${pkg.name} × ${nights} nights × ${guests} guest${guests !== 1 ? "s" : ""}`} amount={pkgTotal} />
      )}
      {activities.map(a => (
        <Row key={a.name} label={a.name} amount={a.price} />
      ))}

      <hr className="my-3 border-gray-100" />

      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-900">Total</span>
        <div className="text-right">
          <span className="text-lg font-semibold" style={{ color: "#0D2E4A" }}>${total}</span>
          <p className="text-xs text-gray-300">{(total * 10.2).toFixed(0)} MAD</p>
        </div>
      </div>
    </div>
  );
}
