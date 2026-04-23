"use client";

import { useState } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  defaultImage?: string;
}

export default function ImageUpload({ onUpload, label = "Upload Image", defaultImage }: ImageUploadProps) {
  const [preview, setPreview] = useState(defaultImage || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPreview(url);
      onUpload(url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {preview && (
        <div className="relative w-32 h-32 overflow-hidden rounded-md border border-gray-200">
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
    </div>
  );
}
