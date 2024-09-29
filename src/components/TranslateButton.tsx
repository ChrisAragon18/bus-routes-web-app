import { useState, useEffect } from "react"
import axios from "axios"

const TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY

const translateText = async (text: string, targetLanguage: string) => {
    try {
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2`,
            {},
            {
                params: {
                    q: text,
                    target: targetLanguage,
                    key: TRANSLATE_API_KEY,
                },
            }
        )
        return response.data.data.translations[0].translatedText
    } catch (error) {
        console.error("Error translating text:", error)
        return text
    }
}

function TranslateButton({ elements }: { elements: HTMLElement[] }) {
    const [language, setLanguage] = useState<string>("en")

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language")
        if (savedLanguage) {
            setLanguage(savedLanguage)
            if (savedLanguage === "es") {
                translatePage("es")
            }
        }
    }, [])

    const translatePage = async (targetLanguage: string) => {
        for (const element of elements) {
            const textToTranslate = element.innerText
            const translated = await translateText(textToTranslate, targetLanguage)
            element.innerText = translated
        }
    }

    const handleTranslate = async () => {
        const newLanguage = language === "en" ? "es" : "en"
        setLanguage(newLanguage)
        localStorage.setItem("language", newLanguage)
        translatePage(newLanguage)
    }

    return (
        <button onClick={handleTranslate} className="btn btn-secondary">
            {language === "en" ? "Translate to Spanish" : "Translate to English"}
        </button>
    )
}

export default TranslateButton
