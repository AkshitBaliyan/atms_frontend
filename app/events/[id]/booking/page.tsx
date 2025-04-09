"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample events data - in a real app, this would come from a database
const events = [
  {
    id: "1",
    title: "Annual Cultural Fest",
    date: "March 15, 2025",
    time: "6:00 PM",
    ticketPrices: {
      ordinary: 50,
      balcony: 100,
    },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    date: "March 22, 2025",
    time: "10:00 AM",
    ticketPrices: {
      ordinary: 75,
      balcony: 150,
    },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Alumni Reunion Concert",
    date: "April 5, 2025",
    time: "7:00 PM",
    ticketPrices: {
      ordinary: 60,
      balcony: 120,
    },
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Drama Club Presentation",
    date: "April 12, 2025",
    time: "5:30 PM",
    ticketPrices: {
      ordinary: 40,
      balcony: 80,
    },
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop",
  },
]

// Generate seats for the auditorium
const generateSeats = (rows: number, seatsPerRow: number, startChar: string) => {
  const seats = []
  const startCharCode = startChar.charCodeAt(0)

  for (let i = 0; i < rows; i++) {
    const row = []
    const rowLabel = String.fromCharCode(startCharCode + i)

    for (let j = 1; j <= seatsPerRow; j++) {
      row.push({
        id: `${rowLabel}${j}`,
        row: rowLabel,
        number: j,
        isBooked: Math.random() < 0.3, // Randomly mark some seats as booked
      })
    }
    seats.push(row)
  }

  return seats
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId)

  const [selectedTab, setSelectedTab] = useState("ordinary")
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  // Generate seats for ordinary and balcony sections
  const ordinarySeats = generateSeats(8, 12, "A")
  const balconySeats = generateSeats(4, 10, "J")

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

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

  const toggleSeatSelection = (seatId: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  const calculateTotal = () => {
    const ordinaryCount = selectedSeats.filter((seat) => seat[0] < "J").length
    const balconyCount = selectedSeats.filter((seat) => seat[0] >= "J").length

    return ordinaryCount * event.ticketPrices.ordinary + balconyCount * event.ticketPrices.balcony
  }

  const proceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to continue.")
      return
    }

    // In a real app, you would store the selected seats in a state management solution
    // For this demo, we'll use URL parameters to pass the data
    const params = new URLSearchParams()
    params.append("seats", selectedSeats.join(","))
    params.append("total", calculateTotal().toString())

    router.push(`/events/${eventId}/payment?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/events/${eventId}`} className="inline-flex items-center text-sm font-medium text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event Details
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{event.title} - Select Seats</h1>
        <p className="mt-2 text-muted-foreground">
          {event.date} at {event.time}
        </p>
        {timeLeft > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Session expires in:</span>
            <span className={`font-mono font-bold ${timeLeft < 60 ? "text-destructive" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      <Card className="mx-auto max-w-4xl border-2 border-muted shadow-lg">
        <CardHeader className="bg-muted/50">
          <CardTitle>Seat Selection</CardTitle>
          <CardDescription>
            Select your preferred seats. Ordinary seats cost ₹{event.ticketPrices.ordinary} and balcony seats cost ₹
            {event.ticketPrices.balcony}.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="ordinary" onValueChange={setSelectedTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="ordinary">Ordinary Seats</TabsTrigger>
              <TabsTrigger value="balcony">Balcony Seats</TabsTrigger>
            </TabsList>

            <TabsContent value="ordinary" className="space-y-6">
              <div className="mb-4 flex justify-center">
                <div className="w-3/4 rounded-t-xl bg-primary/20 p-2 text-center font-semibold screen-glow">SCREEN</div>
              </div>

              <div className="space-y-2">
                {ordinarySeats.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    <div className="flex w-8 items-center justify-center font-semibold">{row[0].row}</div>
                    {row.map((seat) => (
                      <TooltipProvider key={seat.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              disabled={seat.isBooked}
                              onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
                              className={`h-8 w-8 rounded-md text-xs font-medium transition-colors seat-hover ${
                                seat.isBooked
                                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                  : selectedSeats.includes(seat.id)
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              {seat.number}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Seat {seat.id}</p>
                            {seat.isBooked ? (
                              <p className="text-xs text-destructive">Already booked</p>
                            ) : (
                              <p className="text-xs">₹{event.ticketPrices.ordinary}</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    <div className="flex w-8 items-center justify-center font-semibold">{row[0].row}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="balcony" className="space-y-6">
              <div className="mb-8 flex justify-center">
                <div className="w-2/3 rounded-t-xl bg-primary/20 p-2 text-center font-semibold screen-glow">
                  SCREEN (BELOW)
                </div>
              </div>

              <div className="space-y-2">
                {balconySeats.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    <div className="flex w-8 items-center justify-center font-semibold">{row[0].row}</div>
                    {row.map((seat) => (
                      <TooltipProvider key={seat.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              disabled={seat.isBooked}
                              onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
                              className={`h-8 w-8 rounded-md text-xs font-medium transition-colors seat-hover ${
                                seat.isBooked
                                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                  : selectedSeats.includes(seat.id)
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              {seat.number}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Seat {seat.id}</p>
                            {seat.isBooked ? (
                              <p className="text-xs text-destructive">Already booked</p>
                            ) : (
                              <p className="text-xs">₹{event.ticketPrices.balcony}</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    <div className="flex w-8 items-center justify-center font-semibold">{row[0].row}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-4 rounded-lg bg-muted p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-muted"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-gray-300"></div>
                <span>Booked</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Selected Seats:</span>
                <span className="font-medium">
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedSeats.sort().map((seat) => (
                        <Badge key={seat} variant="outline" className="bg-primary/10">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "None"
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-lg">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 flex items-center gap-2 justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-1" />
            <span>You can select up to 10 seats per booking</span>
          </div>
          <Button onClick={proceedToPayment} disabled={selectedSeats.length === 0 || timeLeft <= 0} className="gap-2">
            Proceed to Payment <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

