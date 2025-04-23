import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight, Ticket, Star, Users, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Badge } from "@/components/ui/badge"
import './ShowCard.css'; // for custom styles

const dateString = (date) => {
    console.log(date)
    const dateObj = new Date(date);
    // return dateObj.toISOString().split('T')[0];
    return dateObj.toLocaleDateString();
}

const timeString = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ShowCard = ({event}) => {
    event = event[0];
return (
<Card key={event.id} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
    <div className="aspect-video w-full overflow-hidden relative">
        <img src={event.image || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop" } alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>{event.description || 'Event Description'}</CardDescription>
    </CardHeader>
    <CardContent>
        <div className="space-y-2 text-sm">
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                <span>{dateString(event.date_time)}</span>
            </div>
            <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <span>{timeString(event.date_time)}</span>
            </div>
            {/* <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                <span>{event.location}</span>
            </div> */}
        </div>
    </CardContent>
    <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full">
        <Button variant="outline" className="w-full">
            View Details
        </Button>
        </Link>
    </CardFooter>
</Card>
);
}

export default ShowCard;
