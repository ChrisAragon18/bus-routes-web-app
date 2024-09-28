import React, { useEffect, useRef } from "react"
import { useLoadScript, Libraries } from "@react-google-maps/api"

const libraries: Libraries = ["places"]

type PlacesProps = {
    setLocation: (position: google.maps.LatLngLiteral, type: "current" | "destination") => void
}

function Places({ setLocation }: PlacesProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const currentLocationRef = useRef<HTMLInputElement>(null)
    const destinationRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isLoaded || !currentLocationRef.current || !destinationRef.current) return

        const autocompleteCurrent = new google.maps.places.Autocomplete(currentLocationRef.current, {
            types: ["address"],
        })

        const autocompleteDestination = new google.maps.places.Autocomplete(destinationRef.current, {
            types: ["address"],
        })

        autocompleteCurrent.addListener("place_changed", () => {
            const place = autocompleteCurrent.getPlace()
            if (place.geometry && place.geometry.location) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }
                setLocation(location, "current")
            } else {
                console.error("No geometry data available for the current location")
            }
        })

        autocompleteDestination.addListener("place_changed", () => {
            const place = autocompleteDestination.getPlace()
            if (place.geometry && place.geometry.location) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }
                setLocation(location, "destination")
            } else {
                console.error("No geometry data available for the destination")
            }
        })
    }, [isLoaded, setLocation])

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <input
                ref={currentLocationRef}
                type="text"
                placeholder="Enter current location"
                style={{ width: "100%", padding: "8px", fontSize: "16px", marginBottom: "8px" }}
            />
            <input
                ref={destinationRef}
                type="text"
                placeholder="Enter destination"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
        </div>
    )
}

export default Places