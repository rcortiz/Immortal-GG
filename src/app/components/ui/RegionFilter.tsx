"use client";

import React from "react";
import Image from "next/image";

interface RegionFilterProps {
  onRegionSelect: (region: string) => void;
}

export default function RegionFilter({ onRegionSelect }: RegionFilterProps) {
  const regions = [
    { id: "se_asia", name: "SE Asia", style: { top: "55%", left: "60%" } },
    { id: "europe", name: "Europe", style: { top: "30%", left: "55%" } },
    {
      id: "americas",
      name: "Americas",
      style: { top: "36%", left: "37%" },
    },
    { id: "china", name: "China", style: { top: "26%", left: "63%" } },
  ];
  return (
    <div className="relative rounded-md bg-black text-white">
      <div
        className="relative h-96 overflow-hidden"
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div
          className="absolute h-full w-full"
          style={{ transform: "scale(1.5", transformOrigin: "center" }}
        >
          <Image
            src="/map.svg"
            alt="World Map"
            fill
            priority={true}
            className="absolute object-contain"
          />
        </div>

        {regions.map((region) => (
          <button
            key={region.id}
            className="absolute h-6 w-6 transform rounded-full bg-yellow-500 transition hover:scale-150"
            style={region.style}
            onClick={() => onRegionSelect(region.id)}
          >
            <span className="sr-only">{region.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
