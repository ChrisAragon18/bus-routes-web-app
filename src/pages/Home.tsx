import { useLoadScript } from "@react-google-maps/api"

function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    })

    if (!isLoaded) return <div>Loading...</div>
    return (
        <div>Hello World</div>
    )
}

export default Home
