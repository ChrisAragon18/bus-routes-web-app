import { useState } from "react"
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Map from './Map'

function AppRoutes() {
    const [departureTime, setDepartureTime] = useState<string | null>(null)
    const [arrivalTime, setArrivalTime] = useState<string | null>(null)

    const handleRouteSelection = (departure: string, arrival: string) => {
        setDepartureTime(departure)
        setArrivalTime(arrival)
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={
                <div>
                    <h1>Bus Route</h1>
                    <p>Departure Time: {departureTime}</p>
                    <p>Arrival Time: {arrivalTime}</p>
                    <Map onRouteSelect={handleRouteSelection} />
                </div>
            } />
        </Routes>
    )
}

export default AppRoutes
