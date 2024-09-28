import React, { useState, useMemo, useCallback, useRef } from "react"
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api"
import Places from "./Places"
import CalendarEvent from "./CalendarEvent"

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions
type DirectionsResult = google.maps.DirectionsResult

type MapProps = {
    onRouteSelect: (departure: string, arrival: string) => void
}

function Map({ onRouteSelect }: MapProps) {
    const [currentLocation, setCurrentLocation] = useState<LatLngLiteral | null>(null)
    const [destination, setDestination] = useState<LatLngLiteral | null>(null)
    const [directions, setDirections] = useState<DirectionsResult | null>(null)
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
    const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null)
    const mapRef = useRef<google.maps.Map | null>(null)
    const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, [])

    const fetchTransitRoutes = useCallback(() => {
        if (!currentLocation || !destination) return

        const directionsService = new google.maps.DirectionsService()
        directionsService.route(
            {
                origin: currentLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.TRANSIT,
                provideRouteAlternatives: true,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setRoutes(result.routes)
                    setDirections(result) // Set the entire result, not just routes
                    setSelectedRouteIndex(null) // Do not select any route by default
                } else {
                    console.error(`Error fetching directions: ${status}`)
                }
            }
        )
    }, [currentLocation, destination])

    const handleRouteSelection = (index: number) => {
        setSelectedRouteIndex(index)
        const selectedRoute = routes[index]
        const departureTime = new Date(selectedRoute.legs[0].departure_time?.value).toISOString() || ""
        const arrivalTime = new Date(selectedRoute.legs[0].arrival_time?.value).toISOString() || ""
        onRouteSelect(departureTime, arrivalTime)
        setDirections(prevDirections => {
            if (prevDirections) {
                return {
                    ...prevDirections,
                    routes: [routes[index]]
                }
            }
            return null
        })
    }

    const routeColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

    return (
        <div style={{ display: "flex", width: "100%", height: "500px" }}>
            <div style={{ width: "30%", padding: "10px", overflowY: "auto" }}>
                <Places setLocation={(position, type) => {
                    if (type === "current") {
                        setCurrentLocation(position)
                    } else {
                        setDestination(position)
                    }
                    mapRef.current?.panTo(position)
                }} />
                <button onClick={fetchTransitRoutes} style={{ margin: "10px", padding: "10px" }}>
                    Find Routes
                </button>
                <div>
                    {routes.map((route, index) => (
                        <div key={index} style={{ margin: "10px 0" }}>
                            <button onClick={() => handleRouteSelection(index)}>
                                Route {index + 1}
                            </button>
                            <div>
                                Duration: {route.legs[0].duration ? route.legs[0].duration.text : "N/A"}
                            </div>
                            <div>
                                Departure Time: {route.legs[0].departure_time?.text || "N/A"}
                            </div>
                            <div>
                                Arrival Time: {route.legs[0].arrival_time?.text || "N/A"}
                            </div>
                            {route.legs[0].departure_time && route.legs[0].arrival_time && (
                                <CalendarEvent
                                    departureTime={new Date(route.legs[0].departure_time.value).toISOString()}
                                    arrivalTime={new Date(route.legs[0].arrival_time.value).toISOString()}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ width: "70%" }}>
                <GoogleMap
                    zoom={10}
                    center={currentLocation || destination || center}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={options}
                    onLoad={onLoad}
                >
                    {currentLocation && <Marker position={currentLocation} />}
                    {destination && <Marker position={destination} />}
                    {selectedRouteIndex !== null && directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: routeColors[selectedRouteIndex % routeColors.length],
                                    strokeOpacity: 0.8,
                                    strokeWeight: 6,
                                },
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map
