import { useState, useMemo, useCallback, useRef } from "react"
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer
} from "@react-google-maps/api"
import Places from "./Places"

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions


function Map() {
    const [location, setLocation] = useState<LatLngLiteral>()
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    const onLoad = useCallback((map) => (mapRef.current - map), [])

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <Places setLocation={(position) => {
                setLocation(position)
                mapRef.current?.panTo(position)
            }}></Places>
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={options}
                onLoad={onLoad}
            >
                {/* Add markers, directions, etc. here */}
            </GoogleMap>
        </div>

    )
}

export default Map