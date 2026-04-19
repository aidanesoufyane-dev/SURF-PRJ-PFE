"use client";

import { useState } from "react";
import { mockRooms, mockUser } from "@/lib/mockData";
import { formatPrice } from "@/lib/helpers";
import { Room } from "@/types";
import ImageUpload from "@/components/ImageUpload";

export default function RoomsPage() {
  const user = mockUser;
  const canEdit = user.role === "admin" || user.role === "manager";

  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const [form, setForm] = useState({
    name: "", description: "", type: "double" as Room["type"],
    capacity: "", pricePerNight: "", amenities: "", images: [] as string[],
  });

  function openCreateForm() {
    setEditingRoom(null);
    setForm({ name: "", description: "", type: "double", capacity: "", pricePerNight: "", amenities: "", images: [] });
    setShowForm(true);
  }

  function openEditForm(room: Room) {
    setEditingRoom(room);
    setForm({
      name: room.name, description: room.description, type: room.type,
      capacity: String(room.capacity), pricePerNight: String(room.pricePerNight / 100),
      amenities: room.amenities.join(", "), images: room.images || [],
    });
    setShowForm(true);
  }

  function handleSave() {
    const roomData = {
      name: form.name, description: form.description, type: form.type,
      capacity: Number(form.capacity),
      pricePerNight: Math.round(Number(form.pricePerNight) * 100),
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      images: form.images,
    };
    if (editingRoom) {
      setRooms((prev) => prev.map((r) => r._id === editingRoom._id ? { ...r, ...roomData } : r));
    } else {
      const newRoom: Room = {
        _id: `r${Date.now()}`, companyId: "c1", isActive: true,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...roomData,
      };
      setRooms((prev) => [...prev, newRoom]);
    }
    setShowForm(false);
  }

  function handleDelete(roomId: string) {
    if (!confirm("Are you sure you want to delete this room?")) return;
    setRooms((prev) => prev.filter((r) => r._id !== roomId));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Rooms</h1>
          <p className="page-subtitle">Manage accommodation inventory</p>
        </div>
        {canEdit && <button onClick={openCreateForm} className="btn-primary">+ Add Room</button>}
      </div>

      {showForm && (
        <div className="form-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">{editingRoom ? "Edit Room" : "New Room"}</h2>
          <div className="form-grid">
            <div>
              <label className="label">Room Name</label>
              <input type="text" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Ocean View Suite" />
            </div>
            <div>
              <label className="label">Type</label>
              <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Room["type"] })}>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="dorm">Dorm</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div>
              <label className="label">Capacity (max guests)</label>
              <input type="number" className="input" value={form.capacity} placeholder="e.g. 2" onChange={(e) => setForm({ ...form, capacity: e.target.value })} min={1} />
            </div>
            <div>
              <label className="label">Price per Night (MAD)</label>
              <input type="number" className="input" value={form.pricePerNight} placeholder="0.00" onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })} min={0} step={0.01} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea className="input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the room..." />
            </div>
            <div className="md:col-span-2">
              <label className="label">Amenities (comma-separated)</label>
              <input type="text" className="input" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="e.g., wifi, ac, ocean-view, balcony" />
            </div>
            <div className="md:col-span-2">
              <ImageUpload label="Room Image" defaultImage={form.images?.[0]} onUpload={(url) => setForm({ ...form, images: [url] })} />
            </div>
            <button onClick={handleSave} className="btn-primary">{editingRoom ? "Save Changes" : "Create Room"}</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="empty-state"><p className="empty-state-text">No rooms yet. Add your first room.</p></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room._id} className="card-hover group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-gray-400 text-sm capitalize mt-0.5">{room.type} · Up to {room.capacity} guests</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{formatPrice(room.pricePerNight)}</p>
                  <p className="text-gray-400 text-xs">/night</p>
                </div>
              </div>
              {room.images?.[0] && (
                <div className="mt-3 w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-gray-500 text-sm mt-3 line-clamp-2">{room.description}</p>
              {room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {room.amenities.map((a) => <span key={a} className="badge bg-gray-100 text-gray-700">{a}</span>)}
                </div>
              )}
              <div className="mt-3">
                <span className={`badge ${room.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {room.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {canEdit && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button onClick={() => openEditForm(room)} className="text-sm font-medium text-gray-900 hover:text-gray-800">Edit</button>
                  {user.role === "admin" && (
                    <button onClick={() => handleDelete(room._id)} className="text-sm font-medium text-red-500 hover:text-red-700">Delete</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
