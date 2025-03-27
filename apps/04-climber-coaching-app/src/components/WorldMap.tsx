"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Fix default marker icon in Leaflet (important!)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Location = {
  name: string;
  coords: [number, number]; // This is equivalent to LatLngTuple
};

const ClimbingLocations: Location[] = [
  { name: "Coolum, Australia", coords: [-26.5283, 153.09] },
  { name: "Blue Mountains, Australia", coords: [-33.6333, 150.3] },
  { name: "Grampians, Australia", coords: [-37.3017, 142.5795] },
  { name: "Frankenjura, Germany", coords: [49.7274, 11.3389] },
  { name: "Flatanger, Norway", coords: [64.4969, 10.8806] },
  { name: "Lofoten, Norway", coords: [68.2345, 14.5636] },
  { name: "Arco, Italy", coords: [45.9212, 10.884] },
  { name: "Hong Kong", coords: [22.3193, 114.1694] },
  { name: "Chulilla, Spain", coords: [39.65, -0.9833] },
];

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg overflow-hidden my-8 bg-gray-800 animate-pulse" />
  ),
});

export default function WorldMap() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden my-8">
      <MapContent />
    </div>
  );
}
