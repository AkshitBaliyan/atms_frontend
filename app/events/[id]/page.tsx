"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight, Users, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample events data - in a real app, this would come from a database
const events = [
  {
    id: "1",
    title: "Annual Cultural Fest",
    description:
      "A celebration of art, music, and dance performances by students. Join us for an evening of cultural extravaganza featuring performances from various clubs and departments.",
    date: "March 15, 2025",
    time: "6:00 PM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    ticketPrices: {
      ordinary: 50,
      balcony: 100,
    },
    category: "Cultural",
    organizer: "Cultural Committee",
    duration: "3 hours",
    capacity: 500,
    additionalInfo: "Food and beverages will be available for purchase. Photography is allowed.",
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description:
      "Industry experts share insights on emerging technologies and future trends. This conference will feature keynote speeches, panel discussions, and interactive workshops on AI, blockchain, and more.",
    date: "March 22, 2025",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    ticketPrices: {
      ordinary: 75,
      balcony: 150,
    },
    category: "Technical",
    organizer: "Tech Club",
    duration: "6 hours",
    capacity: 500,
    additionalInfo: "Lunch and refreshments will be provided. Bring your laptop for the workshops.",
  },
  {
    id: "3",
    title: "Alumni Reunion Concert",
    description:
      "A musical evening featuring performances by our distinguished alumni. Come and enjoy a night of nostalgia and entertainment as our talented alumni showcase their musical prowess.",
    date: "April 5, 2025",
    time: "7:00 PM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    ticketPrices: {
      ordinary: 60,
      balcony: 120,
    },
    category: "Music",
    organizer: "Alumni Association",
    duration: "2.5 hours",
    capacity: 500,
    additionalInfo: "Special meet and greet session with alumni after the concert.",
  },
  {
    id: "4",
    title: "Drama Club Presentation",
    description:
      "The college drama club presents their annual theatrical production. This year's play explores themes of identity, belonging, and social change through a compelling narrative.",
    date: "April 12, 2025",
    time: "5:30 PM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop",
    ticketPrices: {
      ordinary: 40,
      balcony: 80,
    },
    category: "Drama",
    organizer: "Drama Club",
    duration: "2 hours",
    capacity: 500,
    additionalInfo:
      "No entry after the performance begins. No photography or recording allowed during the performance.",
  },
]

export default function EventDetails() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  // Find the event based on the ID from the URL
  const event = events.find((e) => e.id === eventId)
  const [activeTab, setActiveTab] = useState("details")

  // If event not found, show error message
  if (!event) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2 text-muted-foreground">The event you are looking for does not exist.</p>
        <Link href="/" className="mt-4">
          <Button>Back to Events</Button>
        </Link>
      </div>
    )
  }

  const handleBookNow = () => {
    router.push(`/events/${eventId}/booking`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <div className="relative">
            <Badge className="absolute top-4 right-4 z-10">{event.category}</Badge>
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <Card className="border-2 border-muted">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{event.title}</CardTitle>
                <CardDescription className="text-lg mt-2">{event.description}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                <span className="text-lg">{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                <span className="text-lg">
                  {event.time} ({event.duration})
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span className="text-lg">{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span className="text-lg">Capacity: {event.capacity} seats</span>
              </div>

              <div className="mt-6 rounded-lg bg-muted p-4">
                <h3 className="mb-2 text-lg font-semibold">Ticket Prices:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ordinary Seats:</span>
                    <span className="font-medium">₹{event.ticketPrices.ordinary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Balcony Seats:</span>
                    <span className="font-medium">₹{event.ticketPrices.balcony}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleBookNow} size="lg" className="w-full gap-2">
              Book Tickets Now <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="organizer">Organizer</TabsTrigger>
            <TabsTrigger value="venue">Venue Information</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">About This Event</h3>
            <p className="text-muted-foreground mb-6">{event.description}</p>

            <h4 className="font-medium mb-2">Additional Information:</h4>
            <p className="text-muted-foreground mb-4">{event.additionalInfo}</p>

            <Separator className="my-6" />

            <h4 className="font-medium mb-4">What to Expect:</h4>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Engaging performances and presentations</li>
              <li>Networking opportunities with peers and professionals</li>
              <li>Interactive sessions and discussions</li>
              <li>Certificates of participation (for applicable events)</li>
            </ul>
          </TabsContent>
          <TabsContent value="organizer" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Organizer Information</h3>
            <p className="text-muted-foreground mb-4">This event is organized by the {event.organizer}.</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{event.organizer}</h4>
                <p className="text-sm text-muted-foreground">Event Organizer</p>
              </div>
            </div>

            <h4 className="font-medium mb-2">Contact Information:</h4>
            <p className="text-muted-foreground">For any queries related to this event, please contact:</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>Email: {event.organizer.toLowerCase().replace(/\s+/g, "")}@college.edu</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </TabsContent>
          <TabsContent value="venue" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Venue Information</h3>
            <p className="text-muted-foreground mb-6">
              The event will be held at the {event.location}, which is located in the main campus building.
            </p>

            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop"
                alt="Venue Map"
                className="h-full w-full object-cover"
              />
            </div>

            <h4 className="font-medium mb-2">Facilities Available:</h4>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              <li>Air-conditioned auditorium</li>
              <li>Wheelchair accessibility</li>
              <li>Restrooms on each floor</li>
              <li>Parking available in the campus parking lot</li>
              <li>Cafeteria nearby</li>
            </ul>

            <h4 className="font-medium mb-2">How to Reach:</h4>
            <p className="text-muted-foreground">
              The auditorium is located in the main campus building. Enter through the main gate and follow the signs to
              the auditorium.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

