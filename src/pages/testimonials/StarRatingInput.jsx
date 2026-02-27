"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function StarRatingInput({ value = 5, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer transition-colors ${
            star <= (hovered || value) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
}
