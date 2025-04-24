"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAuth } from '@/app/contexts/authContext';
import { getShowById, purchaseTickets } from "@/app/services/showsApi";

const ORDINARY_SEATS = 10;
const SEATS_IN_ROW = 20;

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  // const event = events.find((e) => e.id === eventId)
  const [show, setShow] = useState(null);
  const [ordinarySeats, setOrdinarySeats] = useState([]);
  const [balconySeats, setBalconySeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await getShowById(eventId);

        if (!response?.data?.show || !response?.data?.seats) {
          console.log("Unexpected API response:", response);
          return;
        }

        setShow(response.data.show);
        setOrdinarySeats(response.data.seats.ordinary || []);
        setBalconySeats(response.data.seats.balcony || []);
      } catch (error) {
        console.log("Failed to fetch show seats", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchSeats();
  }, [eventId]);

  const [selectedTab, setSelectedTab] = useState("ordinary");
  const [selectedSeats, setSelectedSeats] = useState({
    ordinary: [],
    balcony: [],
  });

  const calculateTotal = () => {
    let sum = 0;
    selectedSeats.ordinary.map((seat) => {
      sum += Number(seat.price);
    });

    selectedSeats.balcony.map((seat) => {
      sum += Number(seat.price);
    });

    return sum;

  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
        {/* <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2 text-muted-foreground">The event you are looking for does not exist.</p> */}
        <h1 className="text-2xl font-bold">Loading event information</h1>
        {/* <p className="mt-2 text-muted-foreground">The event you are looking for does not exist.</p> */}
        {/* <Link href="/" className="mt-4">
          <Button>Back to Events</Button>
        </Link> */}
      </div>
    );
  }

  const toggleSeatSelection = (seat, row, seatIndex, type = "ordinary") => {
    setSelectedSeats((prevSeats) => {
      const isSelected = prevSeats[type].some((s) => s.seat_id === seat.seat_id);

      if (isSelected) {
        // Remove the seat
        return {
          ...prevSeats,
          [type]: prevSeats[type].filter((s) => s.seat_id !== seat.seat_id),
        };
      } else {
        // Add the seat
        const seatObj = { seat_id: seat.seat_id, row, seatIndex, type, price: seat.price };
        return {
          ...prevSeats,
          [type]: [...prevSeats[type], seatObj],
        };
      }
    });
  };

  const genRow = (row, rowIndex) => {
    const rowLabel = String.fromCharCode(65 + rowIndex);
    return (
      <>
        {row.map((seat, seatIndex) => (
          <TooltipProvider key={seat.seat_id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={seat.is_booked}
                  onClick={() =>
                    !seat.is_booked &&
                    !seat.is_vip &&
                    toggleSeatSelection(seat, rowLabel, seatIndex)
                  }
                  className={`h-8 w-8 rounded-md text-xs font-medium seat-hover ${
                    seat.is_booked || seat.is_vip
                      ? `cursor-not-allowed ${
                          seat.is_vip ? "bg-dark-gray-300" : "bg-gray-300"
                        } text-gray-500`
                      : selectedSeats["ordinary"].find(
                          (s) => s.seat_id === seat.seat_id
                        )
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {++seatIndex}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Seat {rowLabel}
                  {seatIndex}
                </p>
                {seat.is_booked ? (
                  <p className="text-xs text-destructive">Already booked</p>
                ) : seat.is_vip ? (
                  <p className="text-xs">⭐ Reserved</p>
                ) : (
                  <p className="text-xs">₹{seat.price}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </>
    );
  };


  const proceedToPayment = () => {
    if (selectedSeats.ordinary.length === 0 && selectedSeats.balcony.length === 0) {
      alert("Please select at least one seat to continue.");
      return;
    }

    // const params = new URLSearchParams();
    // params.append("seats", selectedSeats.join(","));
    // params.append("total", calculateTotal().toString());

    // router.push(`/events/${eventId}/payment?${params.toString()}`);

    purchaseTickets(user, eventId, selectedSeats, calculateTotal())
      .then((response) => {
        // if (response.status === 200) {
        //   alert("Tickets booked successfully!");
        //   router.push(`/events/${eventId}/confirmation`);
        // } else {
        //   alert("Failed to book tickets. Please try again.");
        // }
      });
  };

  const chunkSeats = (seats, size) => {
    const chunks = [];
    for (let i = 0; i < seats.length; i += size) {
      chunks.push(seats.slice(i, i + size));
    }
    return chunks;
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/events/${eventId}`}
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event Details
        </Link>
      </div>

      {/* <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{event.title} - Select Seats</h1>
        <p className="mt-2 text-muted-foreground">
          {event.date} at {event.time}
        </p>
      </div> */}

      <Card className="mx-auto max-w-4xl border-2 border-muted shadow-lg">
        <CardHeader className="bg-muted/50">
          <CardTitle>Seat Selection</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="ordinary" onValueChange={setSelectedTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="ordinary">Ordinary Seats</TabsTrigger>
              <TabsTrigger value="balcony">Balcony Seats</TabsTrigger>
            </TabsList>

            <TabsContent value="ordinary" className="space-y-6">
              <div className="mb-4 flex justify-center">
                <div className="w-3/4 rounded-t-xl bg-primary/20 p-2 text-center font-semibold screen-glow">
                  SCREEN
                </div>
              </div>

              <div className="space-y-2">
                {chunkSeats(ordinarySeats, 20).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center gap-1 mb-2"
                  >
                    {/* Left row label (A–J) */}
                    <div className="flex w-8 items-center justify-center font-semibold">
                      {String.fromCharCode(65 + rowIndex)}
                    </div>

                    {genRow(row, rowIndex)}

                    <div className="flex w-8 items-center justify-center font-semibold">
                      {String.fromCharCode(65 + rowIndex)}
                    </div>
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

              {chunkSeats(balconySeats, 20).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center gap-1 mb-2"
                  >
                    <div className="flex w-8 items-center justify-center font-semibold">
                      {String.fromCharCode(75 + rowIndex)}
                    </div>

                    {genRow(row, ORDINARY_SEATS+rowIndex)}

                    <div className="flex w-8 items-center justify-center font-semibold">
                      {String.fromCharCode(75 + rowIndex)}
                    </div>
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
                  {selectedSeats.ordinary.length > 0 ||
                  selectedSeats.balcony.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedSeats.ordinary
                        .sort((a, b) => a.seatIndex - b.seatIndex)
                        .map((seat) => (
                          <Badge
                            key={`${seat.type}-${seat.row}-${seat.seatIndex}`}
                            variant="outline"
                            className="bg-primary/10 mr-1" // Add some right margin
                          >
                            {seat.type} {seat.row} {seat.seatIndex}
                          </Badge>
                        ))}
                      {selectedSeats.balcony
                        .sort((a, b) => a.seatIndex - b.seatIndex)
                        .map((seat) => (
                          <Badge
                            key={`${seat.type}-${seat.row}-${seat.seatIndex}`}
                            variant="outline"
                            className="bg-purple-500/10" //give different color
                          >
                            {seat.type} {seat.row} {seat.seatIndex}
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
          <Button
            onClick={proceedToPayment}
            disabled={selectedSeats.ordinary.length === 0 && selectedSeats.balcony.length === 0}
            className="gap-2"
          >
            Proceed to Payment <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
