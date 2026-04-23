"use client";

interface Room {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  image?: string;       // optional room photo URL
  recommended?: boolean;
}

interface Props {
  room: Room;
  selected: boolean;
  nights: number;
  onSelect: () => void;
}

export default function RoomCard({ room, selected, nights, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className="relative rounded-2xl bg-white p-5 cursor-pointer transition-all"
      style={{
        border: selected ? "2px solid #C4552A" : "1px solid #f3f4f6",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Badges */}
      {room.recommended && (
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ background: "#C4552A" }}>
          Best value
        </div>
      )}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#C4552A" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      {/* Room photo — shows real image if provided, otherwise a placeholder */}
      <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
        {room.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        )}
      </div>

      <h3 className="font-medium text-gray-900 text-base">{room.name}</h3>
      <p className="text-sm text-gray-400 mt-0.5">Up to {room.capacity} guests</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {room.amenities.map(a => (
          <span key={a} className="px-2 py-0.5 bg-gray-50 rounded-full text-xs text-gray-500">{a}</span>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-lg font-semibold" style={{ color: "#0D2E4A" }}>${room.price}</span>
          <span className="text-xs text-gray-400"> /night</span>
        </div>
        {nights > 0 && (
          <span className="text-xs text-gray-500">Total: ${room.price * nights} for {nights} night{nights !== 1 ? "s" : ""}</span>
        )}
      </div>
    </div>
  );
}
