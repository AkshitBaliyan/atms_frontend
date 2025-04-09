"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Check, CreditCard, Landmark, Wallet, ArrowLeft, Shield, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
  },
]

export default function PaymentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId)

  const selectedSeats = searchParams.get("seats")?.split(",") || []
  const totalAmount = searchParams.get("total") || "0"

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

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

  if (!event || selectedSeats.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        <h1 className="text-2xl font-bold">Invalid booking information</h1>
        <p className="mt-2 text-muted-foreground">Please go back and select your seats again.</p>
        <Link href={`/events/${eventId}`} className="mt-4">
          <Button>Back to Event</Button>
        </Link>
      </div>
    )
  }

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      // Generate a random booking ID
      const bookingId = Math.floor(100000 + Math.random() * 900000)

      // Redirect to confirmation page
      router.push(`/events/${eventId}/confirmation?bookingId=${bookingId}&seats=${selectedSeats.join(",")}`)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/events/${eventId}/booking`} className="inline-flex items-center text-sm font-medium text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Seat Selection
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        <p className="mt-2 text-muted-foreground">
          {event.title} - {event.date} at {event.time}
        </p>
        {timeLeft > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Payment session expires in:</span>
            <span className={`font-mono font-bold ${timeLeft < 60 ? "text-destructive" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-2 border-muted shadow-md">
            <CardHeader className="bg-muted/30">
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay using Visa, Mastercard, or RuPay</p>
                    </div>
                    {paymentMethod === "card" && <Check className="h-5 w-5 text-primary" />}
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                  <Label
                    htmlFor="upi"
                    className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <Wallet className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">UPI Payment</p>
                      <p className="text-sm text-muted-foreground">Pay using Google Pay, PhonePe, or Paytm</p>
                    </div>
                    {paymentMethod === "upi" && <Check className="h-5 w-5 text-primary" />}
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                  <Label
                    htmlFor="netbanking"
                    className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <Landmark className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
                    </div>
                    {paymentMethod === "netbanking" && <Check className="h-5 w-5 text-primary" />}
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@upi" />
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bank">Select Bank</Label>
                    <select
                      id="bank"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border-2 border-muted shadow-md sticky top-20">
            <CardHeader className="bg-muted/30">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.date} at {event.time}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Selected Seats</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSeats.sort().map((seat) => (
                    <Badge key={seat} variant="outline" className="bg-primary/10">
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Booking Fee</span>
                  <span>₹20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(Number(totalAmount) * 0.18)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">₹{Number(totalAmount) + 20 + Math.round(Number(totalAmount) * 0.18)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button onClick={handlePayment} disabled={isProcessing || timeLeft <= 0} className="w-full">
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

