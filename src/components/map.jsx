import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

function Map() {
  const [marker, setMarker] = useState(null);
  const [time, setTime] = useState(null);
  const [placeName, setPlaceName] = useState("");

  const fetchPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setPlaceName(data.display_name || "Unknown place");
    } catch (error) {
      console.error("Error fetching place name:", error);
      setPlaceName("Unknown place");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarker(e.latlng);
        setTime(new Date().toLocaleTimeString());
        fetchPlaceName(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="border border-gray-400 rounded-lg p-3 mb-20">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
        zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {marker && (
          <Marker position={marker}>
            <Popup>
              Marker at {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
        <MapClickHandler />
        <ZoomControl position="topright" />
      </MapContainer>
      {!placeName ? (
        <p className="text-center text-gray-600 py-4">
          You have not selected any place.
        </p>
      ) : (
        <p className="text-gray-600 font-semibold my-4">
          Your Selected Place:{" "}
          <span className="text-center mt-4 text-gray-600 font-normal">
            {placeName}
          </span>
        </p>
      )}{" "}
    </div>
  );
}

export default Map;
