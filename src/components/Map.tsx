import React, { useState, useMemo, useCallback, useRef } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import Places from "./Places"

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

function Map() {
    const [currentLocation, setCurrentLocation] = useState<LatLngLiteral | null>(null)
    const [destination, setDestination] = useState<LatLngLiteral | null>(null)
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    const onLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <Places setLocation={(position, type) => {
                if (type === "current") {
                    setCurrentLocation(position)
                } else {
                    setDestination(position)
                }
                mapRef.current?.panTo(position)
            }} />
            <GoogleMap
                zoom={10}
                center={currentLocation || destination || center}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={options}
                onLoad={onLoad}
            >
                {currentLocation && <Marker position={currentLocation} />}
                {destination && <Marker position={destination} />}
            </GoogleMap>
        </div>
    )
}

export default Map
