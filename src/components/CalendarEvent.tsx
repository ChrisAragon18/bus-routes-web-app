import { useEffect } from "react"
import { gapi } from "gapi-script"
import "gapi.client.calendar"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SCOPES = "https://www.googleapis.com/auth/calendar.events"

type CalendarEventProps = {
    departureTime: string
    arrivalTime: string
}

function CalendarEvent({ departureTime, arrivalTime }: CalendarEventProps) {
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: SCOPES,
            }).then(() => {
                gapi.client.load('calendar', 'v3', () => {
                    console.log("Google Calendar API loaded")
                })
            }).catch((error) => {
                console.error("Error loading Google Calendar API", error)
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            createEvent()
        }).catch((error) => {
            console.error("Error signing in", error)
        })
    }

    const createEvent = () => {
        if (!gapi.client.calendar) {
            console.error("Google Calendar API not loaded")
            return
        }

        const event = {
            summary: "Bus Trip",
            start: {
                dateTime: departureTime,
                timeZone: "America/New_York",
            },
            end: {
                dateTime: arrivalTime,
                timeZone: "America/New_York",
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 30 },
                    { method: "popup", minutes: 30 },
                ],
            },
        }

        const request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
        })

        request.execute((event: any) => {
            if (event.htmlLink) {
                console.log("Event created: ", event.htmlLink)
            } else {
                console.error("Error creating event")
            }
        })
    }

    return (
        <button onClick={handleAuthClick}>
            Add to Calendar
        </button>
    )
}

export default CalendarEvent
