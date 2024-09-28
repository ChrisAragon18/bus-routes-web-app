import { useState, useMemo, useCallback, useRef } from "react"
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer
} from "@react-google-maps/api"

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions


function Map() {
    const center = useMemo(() => ({ lat: 43, lng: -80 }), [])
    return (
        <div style={{ width: "100%", height: "500px" }}>
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerStyle={{ width: "100%", height: "100%" }}
            >
                {/* Add markers, directions, etc. here */}
            </GoogleMap>
        </div>

    )
}

export default Map