// "use client";

// import React, { useEffect, useState } from 'react';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { AlertCircle } from "lucide-react"
// import { useAuth } from '@/app/contexts/authContext'; // Import the useAuth hook

// import { getPastPurchases } from '../services/showsApi';
// // import { set } from 'date-fns';

// const Bookings = () => {
//   const { user } = useAuth(); // Use the hook

//   const [pastPurchases, setPastPurchases] = useState([]);
//   const [loadingPastPurchases, setLoadingPastPurchases] = useState(true);

//   const dateString = (date) => new Date(date).toLocaleDateString();
//   const timeString = (date) => new Date(date).toLocaleTimeString();

//   useEffect(() => {
//     const fetchPastPurchases = async () => {
//       if (user) { // Only fetch if user is available
//         setLoadingPastPurchases(true); // set loading to true before the fetch
//         try {
//           const res = await getPastPurchases(user.id);
//           console.log('past purchases: ', res);
//           setPastPurchases(res);
//         } catch (error) {
//           //  setError(error);  //  You should have an error state.
//           console.error("Failed to fetch past purchases", error);
//         } finally {
//           setLoadingPastPurchases(false);
//         }
//       }
//     };
//     fetchPastPurchases();
//   }, [user]); //  Dependencies: user

//   if (loadingPastPurchases) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-8 w-full" />
//         <Skeleton className="h-4 w-[80%]" />
//         <Skeleton className="h-4 w-[60%]" />
//         <Skeleton className="h-4 w-[40%]" />
//       </div>
//     );
//   }

//   if (!pastPurchases || pastPurchases.length === 0) {
//     return <p>You have no previous bookings.</p>;
//   }

//   const getSeatingInfo = (ticket) => {
//     if(ticket.seat_type == 'ordinary') {
//         const actualSeat = ticket.seat_id - 100;
//         let row = Math.floor(actualSeat / 20);
//         row = String.fromCharCode(65 + row);
//         const seat = actualSeat % 20;
//         return {row, seat};
//     }
//   }

//   return (
//     <ScrollArea className="h-[600px] w-full rounded-md border p-4">
//       <div className="space-y-6">
//         <h2 className="text-4xl font-semibold">Your Past Purchases</h2>
//         {pastPurchases.map((purchase) => (
//           <Card key={purchase.purchase_id} className="w-full">
//             <CardHeader>
//               <CardTitle>Purchase ID: {purchase.purchase_id}</CardTitle>
//               <CardDescription>
//                 Purchase Date: {new Date(purchase.purchase_date).toLocaleString()}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <Badge variant="secondary">
//                     Original Amount: ₹{purchase.original_amount}
//                   </Badge>
//                   <Badge variant="default">
//                     Final Amount: ₹{purchase.final_amount}
//                   </Badge>
//                 </div>
//                 <h4 className="text-lg font-semibold">Tickets:</h4>
//                 <div className="space-y-2">
//                   {purchase.tickets.map((ticket) => (
//                     <div key={ticket.ticket_id} className="p-4 border rounded-md">
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <p><span className="font-semibold">Row:</span> {getSeatingInfo(ticket).row}</p>
//                           <p><span className="font-semibold">Seat:</span> {getSeatingInfo(ticket).seat}</p>
//                           <p><span className="font-semibold">Type:</span> {ticket.seat_type}</p>
//                         </div>
//                         <div>
//                           <p><span className="font-semibold">Show Name:</span> {purchase.show.name}</p>
//                           <p><span className="font-semibold">Show Date:</span> {dateString(purchase.show.date_time)}</p>
//                           <p><span className="font-semibold">Show Time:</span> {timeString(purchase.show.date_time)}</p>
//                         </div>
//                         <div>
//                           <p><span className="font-semibold">Artist/Director:</span> {purchase.show.artist}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </ScrollArea>
//   );
// };

// export default Bookings;





"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button" // Import Button
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle } from "lucide-react"
import { useAuth } from '@/app/contexts/authContext'; // Import the useAuth hook

import { getPastPurchases } from '../services/showsApi';
import { cancelTickets } from '../services/showsApi'; // Import the cancelTickets API function
// import { set } from 'date-fns';

const Bookings = () => {
  const { user } = useAuth(); // Use the hook
  const [pastPurchases, setPastPurchases] = useState([]);
  const [loadingPastPurchases, setLoadingPastPurchases] = useState(true);
  const [cancellationStatus, setCancellationStatus] = useState({}); // Track cancellation status

  const dateString = (date) => new Date(date).toLocaleDateString();
  const timeString = (date) => new Date(date).toLocaleTimeString();

  useEffect(() => {
    const fetchPastPurchases = async () => {
      if (user) { // Only fetch if user is available
        setLoadingPastPurchases(true);
        try {
          const res = await getPastPurchases(user.id);
          console.log('past purchases: ', res);
          setPastPurchases(res);
        } catch (error) {
          console.error("Failed to fetch past purchases", error);
        } finally {
          setLoadingPastPurchases(false);
        }
      }
    };
    fetchPastPurchases();
  }, [user]);

  const handleCancelPurchase = async (purchaseId) => {
    try {
      // Set cancellation status to "cancelling" for this purchase
      setCancellationStatus(prev => ({ ...prev, [purchaseId]: 'cancelling' }));

      const res = await cancelTickets(purchaseId);
      console.log('Cancellation response:', res);

      // Update the state to reflect the cancellation
      setPastPurchases(prevPurchases =>
        prevPurchases.map(purchase =>
          purchase.purchase_id === purchaseId
            ? { ...purchase, status: 'cancelled', refund_amount: res.refund_amount } // Add refund amount to purchase
            : purchase
        )
      );

      // Set cancellation status to "cancelled"
      setCancellationStatus(prev => ({ ...prev, [purchaseId]: 'cancelled' }));
      alert(`Purchase ${purchaseId} cancelled successfully. Refund Amount: ₹${res.refund_amount}`);

    } catch (error) {
      console.error("Failed to cancel purchase", error);
      setCancellationStatus(prev => ({ ...prev, [purchaseId]: 'error' })); // Set status
      alert(`Failed to cancel purchase ${purchaseId}.  ${error.message || 'Please try again.'}`);
    }
  };

  if (loadingPastPurchases) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
    );
  }

  if (!pastPurchases || pastPurchases.length === 0) {
    return <p>You have no previous bookings.</p>;
  }

  const getSeatingInfo = (ticket) => { // Type ticket
    if (ticket.seat_type == 'ordinary') {
      const actualSeat = ticket.seat_id - 100;
      let row = Math.floor(actualSeat / 20);
      row = String.fromCharCode(65 + row);
      const seat = actualSeat % 20;
      return { row, seat };
    }
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-6">
        <h2 className="text-4xl font-semibold">Your Past Purchases</h2>
        {pastPurchases.map((purchase) => (
          <Card key={purchase.purchase_id} className="w-full">
            <CardHeader>
              <CardTitle>Purchase ID: {purchase.purchase_id}</CardTitle>
              <CardDescription>
                Purchase Date: {new Date(purchase.purchase_date).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    Original Amount: ₹{purchase.original_amount}
                  </Badge>
                  <Badge variant="default">
                    Final Amount: ₹{purchase.final_amount}
                  </Badge>
                  {purchase.status === 'cancelled' && (
                    <Badge variant="destructive">
                      Cancelled
                    </Badge>
                  )}
                  {purchase.refund_amount && (
                    <Badge variant="outline">
                      Refund: ₹{purchase.refund_amount}
                    </Badge>
                  )}
                </div>
                <h4 className="text-lg font-semibold">Tickets:</h4>
                <div className="space-y-2">
                  {purchase.tickets.map((ticket) => ( // Type ticket
                    <div key={ticket.ticket_id} className="p-4 border rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p><span className="font-semibold">Row:</span> {getSeatingInfo(ticket).row}</p>
                          <p><span className="font-semibold">Seat:</span> {getSeatingInfo(ticket).seat}</p>
                          <p><span className="font-semibold">Type:</span> {ticket.seat_type}</p>
                        </div>
                        <div>
                          <p><span className="font-semibold">Show Name:</span> {purchase.show.name}</p>
                          <p><span className="font-semibold">Show Date:</span> {dateString(purchase.show.date_time)}</p>
                          <p><span className="font-semibold">Show Time:</span> {timeString(purchase.show.date_time)}</p>
                        </div>
                        <div>
                          <p><span className="font-semibold">Artist/Director:</span> {purchase.show.artist}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {cancellationStatus[purchase.purchase_id] === 'cancelling' ? (
                  <p>Cancelling...</p>
                ) : cancellationStatus[purchase.purchase_id] === 'error' ? (
                  <p className="text-red-500">Error cancelling purchase.</p>
                ) : purchase.status !== 'cancelled' ? ( // Only show if not already cancelled
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelPurchase(purchase.purchase_id)}
                    disabled={cancellationStatus[purchase.purchase_id] === 'cancelling'}
                  >
                    Cancel Purchase
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Bookings;
