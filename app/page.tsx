"use client";

import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight, Ticket, Star, Users, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// import ShowList from '../components/shows/ShowList';
import ShowCard from '../components/shows/ShowCard';
import useShows from '../hooks/useShows'; // optional

export default function Home() {
// Sample events data - in a real app, this would come from a database

const { shows, loading, error } = useShows();

// const events = [
// {
// id: 1,
// title: "Annual Cultural Fest",
// description: "A celebration of art, music, and dance performances by students.",
// date: "March 15, 2025",
// time: "6:00 PM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
// category: "Cultural",
// featured: true,
// },
// {
// id: 2,
// title: "Tech Conference 2025",


// description: "Industry experts share insights on emerging technologies and future trends.",
// date: "March 22, 2025",
// time: "10:00 AM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
// category: "Technical",
// featured: true,
// },
// {
// id: 3,
// title: "Alumni Reunion Concert",
// description: "A musical evening featuring performances by our distinguished alumni.",
// date: "April 5, 2025",
// time: "7:00 PM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
// category: "Music",
// },
// {
// id: 4,
// title: "Drama Club Presentation",
// description: "The college drama club presents their annual theatrical production.",
// date: "April 12, 2025",
// time: "5:30 PM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop",
// category: "Drama",
// },
// {
// id: 5,
// title: "Science Exhibition",
// description: "Showcasing innovative projects from science and engineering departments.",
// date: "April 18, 2025",
// time: "9:00 AM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
// category: "Science",
// },
// {
// id: 6,
// title: "Guest Lecture Series",
// description: "Distinguished speakers share their knowledge and experiences.",
// date: "April 25, 2025",
// time: "11:00 AM",
// location: "Main Auditorium",
// image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
// category: "Educational",
// },
// ]


const events = shows;

// const featuredEvents = events.filter((event) => event.featured)

return (
<>
    {/* Hero Section */}
    <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="container relative z-10 px-4 py-16 md:py-24 lg:py-32">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Book Your <span className="gradient-text">Perfect Seat</span> for College Events
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-[600px]">
                        AudiBook makes it easy to reserve the best seats for all your favorite college events,
                        performances, and
                        conferences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="gap-2">
                            Browse Events
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </div>
                </div>
                <div className="relative">
                    <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl animate-float">
                        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
                            alt="Auditorium" className="w-full h-auto" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
                </div>
            </div>
        </div>
    </section>

    {/* Featured Events */}
    {/* <section className="bg-muted/30 py-16">
        <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
                    <p className="text-muted-foreground mt-2">Don't miss out on our most anticipated events</p>
                </div>
                <Link href="#all-events">
                <Button variant="ghost" className="mt-4 md:mt-0 gap-2">
                    View All Events
                    <ArrowRight className="h-4 w-4" />
                </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-video w-full overflow-hidden relative">
                        <Badge className="absolute top-3 right-3 z-10">{event.category}</Badge>
                        <img src={event.image || "/placeholder.svg" } alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {event.title}
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-primary" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-primary" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-primary" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/events/${event.id}`} className="w-full">
                        <Button className="w-full gap-2">
                            View Details
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        </Link>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
    </section> */}

    {/* All Events */}
    <section id="all-events" className="py-16">
        <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tight mb-10">Upcoming Events</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events.map((event) => (
                // <Card key={event.id} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
                //     <div className="aspect-video w-full overflow-hidden relative">
                //         <Badge className="absolute top-3 right-3 z-10" variant="secondary">
                //             {event.category}
                //         </Badge>
                //         <img src={event.image || "/placeholder.svg" } alt={event.title}
                //             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                //     </div>
                //     <CardHeader>
                //         <CardTitle>{event.title}</CardTitle>
                //         <CardDescription>{event.description}</CardDescription>
                //     </CardHeader>
                //     <CardContent>
                //         <div className="space-y-2 text-sm">
                //             <div className="flex items-center">
                //                 <Calendar className="mr-2 h-4 w-4 text-primary" />
                //                 <span>{event.date}</span>
                //             </div>
                //             <div className="flex items-center">
                //                 <Clock className="mr-2 h-4 w-4 text-primary" />
                //                 <span>{event.time}</span>
                //             </div>
                //             {/* <div className="flex items-center">
                //                 <MapPin className="mr-2 h-4 w-4 text-primary" />
                //                 <span>{event.location}</span>
                //             </div> */}
                //         </div>
                //     </CardContent>
                //     <CardFooter>
                //         <Link href={`/events/${event.id}`} className="w-full">
                //         <Button variant="outline" className="w-full">
                //             View Details
                //         </Button>
                //         </Link>
                //     </CardFooter>
                // </Card>
                //
                <ShowCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="bg-muted/30 py-16">
        <div className="container px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Why Choose AudiBook?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    We make booking auditorium seats for college events simple, secure, and stress-free
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Easy Booking</h3>
                    <p className="text-muted-foreground">
                        Book your preferred seats with just a few clicks. Our intuitive interface makes the booking
                        process
                        quick and hassle-free.
                    </p>
                </div>

                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
                    <p className="text-muted-foreground">
                        Multiple payment options with secure transaction processing. Your financial information is
                        always
                        protected.
                    </p>
                </div>

                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Group Bookings</h3>
                    <p className="text-muted-foreground">
                        Easily book multiple seats together for friends and groups. Keep everyone together during
                        events.
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="py-16">
        <div className="container px-4">
            <div className="relative overflow-hidden rounded-xl bg-primary text-primary-foreground p-8 md:p-12">
                <div
                    className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl">
                </div>
                <div
                    className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl">
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Book Your Seats?</h2>
                    <p className="text-primary-foreground/80 mb-6 text-lg">
                        Don't miss out on the best events happening at your college. Book your seats now and secure your
                        spot!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" variant="secondary" className="gap-2">
                            Browse Events
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline"
                            className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
)
}
