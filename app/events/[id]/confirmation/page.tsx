"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Calendar, Check, Clock, Download, MapPin, Ticket, Share2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample events data - in a real app, this would come from a database
const events = [
  {
    id: "1",
    title: "Annual Cultural Fest",
    date: "March 15, 2025",
    time: "6:00 PM",
    location: "Main Auditorium",
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    date: "March 22, 2025",
    time: "10:00 AM",
    location: "Main Auditorium",
  },
  {
    id: "3",
    title: "Alumni Reunion Concert",
    date: "April 5, 2025",
    time: "7:00 PM",
    location: "Main Auditorium",
  },
  {
    id: "4",
    title: "Drama Club Presentation",
    date: "April 12, 2025",
    time: "5:30 PM",
    location: "Main Auditorium",
  },
]

export default function ConfirmationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId)

  const bookingId = searchParams.get("bookingId")
  const selectedSeats = searchParams.get("seats")?.split(",") || []

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  if (!event || !bookingId || selectedSeats.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        <h1 className="text-2xl font-bold">Invalid booking information</h1>
        <p className="mt-2 text-muted-foreground">Please go back to the events page and try again.</p>
        <Link href="/" className="mt-4">
          <Button>Back to Events</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your tickets have been booked successfully. You will be redirected to the home page in {countdown} seconds.
        </p>
        {countdown === 0 && <meta httpEquiv="refresh" content="0;url=/" />}
      </div>

      <Card className="mx-auto max-w-2xl border-2 border-muted shadow-lg ticket-pattern">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-center mb-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Ticket className="h-5 w-5" />
              <div className="absolute -inset-1 animate-pulse-slow rounded-full bg-primary/50 blur-sm"></div>
            </div>
          </div>
          <CardTitle className="text-2xl">AudiBook Ticket</CardTitle>
          <CardDescription>Reference ID: #{bookingId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <div className="flex items-center gap-1">
                <Ticket className="h-4 w-4 text-primary" />
                <span className="text-sm">{selectedSeats.length} tickets</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Seat Information</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.sort().map((seat) => (
                <div key={seat} className="rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
                  {seat}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 font-medium">Important Information</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Please arrive at least 30 minutes before the event starts.</li>
              <li>Bring a copy of this confirmation or your ID for verification.</li>
              <li>Outside food and beverages are not allowed in the auditorium.</li>
              <li>Photography and video recording may be prohibited during the event.</li>
              <li>For any queries, please contact the event organizers at events@college.edu</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Download Ticket
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">A copy of your ticket has been sent to your email address.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> Email Receipt
          </Button>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

