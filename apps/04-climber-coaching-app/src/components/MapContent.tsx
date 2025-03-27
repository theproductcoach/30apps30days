"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  name: string;
  coords: [number, number];
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

export default function MapContent() {
  // Fix default marker icon in Leaflet
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ClimbingLocations.map((location) => (
        <Marker key={location.name} position={location.coords}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
