import { useLoadScript } from "@react-google-maps/api"
import Map from "../components/Map"

function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    })

    if (!isLoaded) return <div>Loading...</div>
    const handleRouteSelect = (departure: string, arrival: string) => {
        console.log(`Route selected from ${departure} to ${arrival}`);
    }

    return (
        <Map onRouteSelect={handleRouteSelect} />
    )
}

export default Home
