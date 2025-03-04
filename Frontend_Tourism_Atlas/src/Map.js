import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './Map.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [30, 30],
});

const RoutingControl = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (start && end) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1]),
        ],
        routeWhileDragging: true,
        showAlternatives: false,
        addWaypoints: false,
        createMarker: function () { return null; },
      }).addTo(map);
    }

    // return () => {
    //   if (routingControlRef.current) {
    //     map.removeControl(routingControlRef.current);
    //   }
    // };
  }, [start, end, map]);

  return null;
};

const CampusMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapInstance = useRef(null);

  const { start, end ,dest} = location.state || {};

  useEffect(() => {
    console.log('Start:', start, 'End:', end,'Destination',dest);
  }, [start, end,dest]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Tourism Atlas</div>
        <ul className="navbar-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/review',{
          state: {
            destination : dest, 
          },
        })}>Review</li>
          <li onClick={() => navigate('/addReview',{
          state: {
            destination : dest, 
          },
        })}>Add Review</li>
          <li onClick={() => navigate('/guide',{
            state:{
              guidedest:dest,
            }
          })}>Book Your Guide</li>
        </ul>
      </nav>

      {/* Map */}
      <MapContainer
        className="map-container"
        center={[27.5663, 77.4206]}
        zoom={8}
        style={{ height: '90vh', width: '100%' }}
        whenCreated={(map) => { mapInstance.current = map; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {start && (
          <Marker position={start} icon={customIcon}>
            <Popup>Start Location</Popup>
          </Marker>
        )}

        {end && (
          <Marker position={end} icon={customIcon}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {start && end && <RoutingControl start={start} end={end} />}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
