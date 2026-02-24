import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { TicketsCard } from "./TicketsCard";
import { Spinner, Tabs, Tab, Pagination } from "@nextui-org/react";
import Navbar from "./NavBar";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export interface IBooking {
  _id: string;
  sessionId: string;
  userId: string;
  showId: { date: string; movie: any; start_time: string; show_name: string };
  theaterId: any;
  screenId: any;
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
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
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
  page,
  setPage,
  itemsPerPage,
  onCancel,
}) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedBookings = bookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  return (
    <div className="relative flex w-full px-4 sm:px-6 py-4 flex-auto flex-col h-auto">
      <div className="flex justify-center w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner label="Loading..." color="primary" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {paginatedBookings.map((booking) => (
                <TicketsCard
                  key={booking._id}
                  booking={booking}
                  onCancel={onCancel}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center px-4">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                  color="primary"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default function TicketsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("old-tickets");

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await commonRequest(
          "GET",
          `/get-bookings/${userId}`,
          config,
        );

        const sortedBookings = response.data.bookings.sort(
          (a: IBooking, b: IBooking) =>
            new Date(b.showId.date).getTime() -
            new Date(a.showId.date).getTime(),
        );

        setBookings(sortedBookings);
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
        booking.paymentStatus === "paid",
    ),
    "Today's Tickets": bookings.filter(
      (booking) =>
        getDateFilter(booking.showId.date, today) === "Today's Tickets" &&
        booking.paymentStatus === "paid",
    ),
    "Upcoming Tickets": bookings.filter(
      (booking) =>
        getDateFilter(booking.showId.date, today) === "Upcoming Tickets" &&
        booking.paymentStatus === "paid",
    ),
    "Cancelled Tickets": bookings.filter(
      (booking) => booking.paymentStatus === "refunded",
    ),
  };

  const handleCancel = async (id: string) => {
    try {
      const response = await commonRequest(
        "POST",
        `/cancel-ticket/${id}`,
        config,
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
      <div className="w-full max-w-6xl mx-auto">
        <Navbar />

        {/* Header */}
        <div className="flex flex-col items-center mb-6 pt-6 px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>
        </div>

        {/* Tabs Section */}
        <div className="justify-center text-center mb-6 px-4 sm:px-6">
          <Tabs
            aria-label="Ticket Options"
            selectedKey={selectedKey}
            fullWidth
            className="w-full max-w-3xl mx-auto"
            onSelectionChange={(key) => {
              setSelectedKey(key as string);
              setPage(1);
            }}
          >
            <Tab key="old-tickets" title="Old Tickets">
              <TicketsTab
                bookings={filteredBookings["Old Tickets"]}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
              />
            </Tab>

            <Tab key="today" title="Today's Tickets">
              <TicketsTab
                bookings={filteredBookings["Today's Tickets"]}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
              />
            </Tab>

            <Tab key="upcoming-tickets" title="Upcoming Tickets">
              <TicketsTab
                bookings={filteredBookings["Upcoming Tickets"]}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
                onCancel={handleCancel}
              />
            </Tab>

            <Tab key="cancelled-tickets" title="Cancelled Tickets">
              <TicketsTab
                bookings={filteredBookings["Cancelled Tickets"]}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
