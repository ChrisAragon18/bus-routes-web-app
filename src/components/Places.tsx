import usePlacesAutoComplet, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"

type PlacesProps = {
    setLocation: (positon: google.maps.LatLngLiteral) => void
}

function Places({ setLocation }: PlacesProps) {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutoComplete()
}

export default Places