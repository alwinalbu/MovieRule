import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { TicketsCard } from "./TicketsCard";
import { Spinner, Tabs, Tab } from "@nextui-org/react";
import Navbar from "./NavBar";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export interface IBooking {
  _id: string;
  sessionId: string;
  userId: string;
  showId: { date: string };
  theaterId: string;
  screenId: string;
  selectedSeats: string[];
  selectedItems?: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    _id: string;
  }[];
  deliveryOptions?: string[];
  totalAmount: number;
  paymentStatus: string;
  date: string;
}

interface TicketsTabProps {
  title: string;
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
  onCancel?: (id: string) => void; 
}

const getDateFilter = (date: string, today: string) => {
  const bookingDate = new Date(date);
  const currentDate = new Date(today);
  if (bookingDate < currentDate) return "Old Tickets";
  if (bookingDate.toDateString() === currentDate.toDateString())
    return "Today's Tickets";
  return "Upcoming Tickets";
};

const TicketsTab: React.FC<TicketsTabProps> = ({
  bookings,
  loading,
  error,
  onCancel,
}) => (
  <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
    <div className="flex justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner label="Loading..." color="primary" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : bookings.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {bookings.map((booking) => (
            <TicketsCard
              key={booking._id}
              booking={booking}
              onCancel={onCancel} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No tickets available.</p>
      )}
    </div>
  </div>
);

export default function TicketsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("old-tickets");
  const { user } = useSelector((state: RootState) => state.user);

  const userId=user?._id;
  console.log(userId, "user id");
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Include the userId in the request URL
        const response = await commonRequest(
          "GET",
          `/get-bookings/${userId}`,
          config
        );

        console.log(response,"response");
        
        setBookings(response.data.bookings);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]); 

  const today = new Date().toISOString().split("T")[0];

  const filteredBookings = {
    "Old Tickets": bookings.filter(
      (booking) =>
        getDateFilter(booking.showId.date, today) === "Old Tickets" &&
        booking.paymentStatus === "paid"
    ),
    "Today's Tickets": bookings.filter(
      (booking) =>
        getDateFilter(booking.showId.date, today) === "Today's Tickets" &&
        booking.paymentStatus === "paid"
    ),
    "Upcoming Tickets": bookings.filter(
      (booking) =>
        getDateFilter(booking.showId.date, today) === "Upcoming Tickets" &&
        booking.paymentStatus === "paid"
    ),
    "Cancelled Tickets": bookings.filter(
      (booking) => booking.paymentStatus === "refunded"
    ),
  };

  const handleCancel = async (id: string) => {
    try {
      const response = await commonRequest(
        "POST",
        `/cancel-ticket/${id}`,
        config
      );
      if (response.status === 200) {
        toast.success("Ticket canceled successfully!");
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } else {
        toast.error("Failed to cancel ticket.");
      }
    } catch (error) {
      console.error("Error canceling ticket:", error);
      toast.error("Failed to cancel ticket. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          My Bookings
        </h2>
      </div>
      <div className="justify-center text-center mb-6">
        <Tabs
          aria-label="Ticket Options"
          selectedKey={selectedKey}
          onSelectionChange={(key) => setSelectedKey(key as string)}
        >
          <Tab key="old-tickets" title="Old Tickets">
            <TicketsTab
              title="Old Tickets"
              bookings={filteredBookings["Old Tickets"]}
              loading={loading}
              error={error}
            />
          </Tab>
          <Tab key="today" title="Today's Tickets">
            <TicketsTab
              title="Today's Tickets"
              bookings={filteredBookings["Today's Tickets"]}
              loading={loading}
              error={error}
            />
          </Tab>
          <Tab key="upcoming-tickets" title="Upcoming Tickets">
            <TicketsTab
              title="Upcoming Tickets"
              bookings={filteredBookings["Upcoming Tickets"]}
              loading={loading}
              error={error}
              onCancel={handleCancel}
            />
          </Tab>
          <Tab key="cancelled-tickets" title="Cancelled Tickets">
            <TicketsTab
              title="Cancelled Tickets"
              bookings={filteredBookings["Cancelled Tickets"]}
              loading={loading}
              error={error}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
