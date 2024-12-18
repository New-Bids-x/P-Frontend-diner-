import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet

// Configuración del ícono personalizado
const customIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Ícono de marcador
    iconSize: [32, 32], // Tamaño del ícono
    iconAnchor: [16, 32], // Punto del ícono que se alinea al marcador
    popupAnchor: [0, -32], // Punto del ícono que alinea el popup
});

// Componente dinámico para manejar la selección de ubicación
const DynamicMapComponent = ({ ubicacionInicial, ubicacion, setUbicacion }) => {
    // Subcomponente para manejar eventos del mapa
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng; // Obtén latitud y longitud
                setUbicacion([lat, lng]); // Actualiza la ubicación en el estado
            },
        });

        return ubicacion ? (
            <Marker position={ubicacion} icon={customIcon}>
                <Popup>
                    Dirección seleccionada: {ubicacion[0].toFixed(5)}, {ubicacion[1].toFixed(5)}
                </Popup>
            </Marker>
        ) : null;
    };

    return (
        <MapContainer center={ubicacionInicial} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
        </MapContainer>
    );
};

export default DynamicMapComponent;
