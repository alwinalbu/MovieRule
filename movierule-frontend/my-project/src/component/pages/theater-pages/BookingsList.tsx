import React, { useEffect, useState } from "react";
import {
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Pagination,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "../../icons/EyeIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { formatDate } from "../user-pages/TicketsCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import toast from "react-hot-toast";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";

export interface IBooking {
  _id: string;
  showId: {
    movie: {
      title: string;
      posterPath: string;
      _id: string;
    };
    date: string;
    start_time: string;
  };
  selectedSeats: string[];
  paymentStatus: "paid" | "pending" | "failed";
}

const BookingsList: React.FC = () => {
  const navigate = useNavigate();
  const { theaterOwner } = useSelector((state: RootState) => state.theater);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theaterId = theaterOwner?._id;

  const fetchBookings = async (page: number) => {
    if (!theaterId) return;
    setLoading(true);
    try {
      const res = await commonRequest(
        "GET",
        `/theater/bookings/${theaterId}?page=${page}`,
        config
      );
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [theaterId, currentPage]);

  const openRejectModal = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setRejectModalOpen(true);
  };

  const handleReject = async () => {
    if (!currentBookingId || !rejectReason.trim()) {
      toast.error("Please enter a reason for rejection");
      return;
    }

    try {
      await commonRequest(
        "PATCH",
        `/theater/bookings/${currentBookingId}/cancel`,
        config,
        { reason: rejectReason }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b._id === currentBookingId ? { ...b, paymentStatus: "failed" } : b
        )
      );
      toast.success("Booking rejected successfully");
      setRejectModalOpen(false);
      setRejectReason("");
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleDetailsClick = (bookingId: string) => {
    navigate(`/theater/booking-details/${bookingId}`);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderCell = (booking: IBooking, columnKey: string | number) => {
    switch (columnKey) {
      case "movie":
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleDetailsClick(booking._id)}
          >
            <img
              src={booking.showId.movie.posterPath}
              alt={booking.showId.movie.title}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p className="text-sm">{booking.showId.movie.title}</p>
            </div>
          </div>
        );
      case "date":
        return <span>{formatDate(booking.showId.date)}</span>;
      case "start_time":
        return <span>{booking.showId.start_time}</span>;
      case "selectedSeats":
        return <span>{booking.selectedSeats.join(", ")}</span>;
      case "paymentStatus":
        const chipColor =
          booking.paymentStatus === "paid"
            ? "success"
            : booking.paymentStatus === "pending"
            ? "warning"
            : "danger";
        return (
          <Chip color={chipColor} size="sm" variant="flat">
            {booking.paymentStatus}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-3">
            <Tooltip content="Details">
              <span
                className="text-lg cursor-pointer"
                onClick={() => handleDetailsClick(booking._id)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Cancel booking">
              <span
                className="text-lg text-danger cursor-pointer"
                onClick={() => openRejectModal(booking._id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  const columns = [
    { name: "Movie", uid: "movie" },
    { name: "Date", uid: "date" },
    { name: "Time", uid: "start_time" },
    { name: "Seats", uid: "selectedSeats" },
    { name: "Payment Status", uid: "paymentStatus" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-black">
      <main className="p-4 sm:p-6">
        {/* Sidebar Toggle */}
        <button onClick={toggleSidebar} className="text-white mb-4">
          <GiHamburgerMenu size={20} />
        </button>
        {sidebarOpen && (
          <TheaterSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Bookings List</h1>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spinner label="Loading..." color="primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-400 font-medium">{error}</div>
        )}

        {/* Empty */}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="text-center text-gray-400">No bookings found</div>
        )}

        {/* Table */}
        {bookings.length > 0 && (
          <>
            <Table aria-label="Bookings Table">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={bookings}>
                {(item) => (
                  <TableRow key={item._id} className="hover:bg-gray-800/40">
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-center mt-6">
              <Pagination
                isCompact
                showControls
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </main>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Reason for Rejection</ModalHeader>
          <ModalBody>
            <Input
              label="Reason"
              placeholder="Write the reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReject} className="bg-indigo-500 text-white">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingsList;
