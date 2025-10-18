import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const BookingDetailsPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          `/theater/get-booking/${bookingId}`,
          config
        );
        setBooking(response.data.data);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
        toast.error("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  // Cancel booking
  const handleCancel = async () => {
    if (!booking) return;

    try {
      const response = await commonRequest(
        "PATCH",
        `/theater/${booking._id}/cancel-booking`,
        config,
        {
          status: "cancelled",
          comments: cancelReason,
        }
      );

      console.log(response, "Cancel response");

      setBooking({ ...booking, status: "cancelled", comments: cancelReason });
      setCancelModalOpen(false);

      toast.success("Booking cancelled successfully");

      setTimeout(() => navigate(-1), 2000);
    } catch (error: any) {
      console.error("Failed to cancel booking:", error);
      toast.error("Failed to cancel the booking");
    }
  };

  // Format date & time
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = (time: string) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Spinner label="Loading booking..." size="lg" color="primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Booking not found
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 min-h-screen flex justify-center items-center">
      <Toaster />
      <Card className="w-full max-w-5xl bg-white shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer text-xl text-gray-700 hover:text-indigo-600"
          />
          <h2 className="text-2xl font-bold ml-4">Booking Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Poster */}
          <div className="flex justify-center">
            <Image
              src={booking.showId?.movie?.posterPath || ""}
              alt="Movie Poster"
              className="rounded-lg shadow-md max-h-96 object-cover"
            />
          </div>

          {/* Booking Info */}
          <div className="space-y-3">
            <p>
              <strong>Session ID:</strong> {booking.sessionId}
            </p>
            <p>
              <strong>User:</strong> {booking.userId?.username || "N/A"} (
              {booking.userId?.email || "N/A"})
            </p>
            <p>
              <strong>Movie:</strong> {booking.showId?.movie?.title}
            </p>
            <p>
              <strong>Show:</strong> {booking.showId?.show_name}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(booking.showId?.date)}
            </p>
            <p>
              <strong>Time:</strong> {formatTime(booking.showId?.start_time)}
            </p>
            <p>
              <strong>Theater:</strong> {booking.theaterId?.username} (
              {booking.theaterId?.city})
            </p>
            <p>
              <strong>Screen:</strong> {booking.screenId?.name} -{" "}
              {booking.screenId?.quality}
            </p>
            <p>
              <strong>Seats:</strong> {booking.selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{booking.totalAmount}
            </p>
            <p>
              <strong>Payment Status:</strong> {booking.paymentStatus}
            </p>
          </div>
        </div>

        {/* Selected Items */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Snacks & Beverages</h3>
          {booking.selectedItems?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {booking.selectedItems.map((item: any) => (
                <Card key={item._id} shadow="sm">
                  <CardBody className="p-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-full object-cover rounded-md"
                    />
                    <div className="mt-2">
                      <p className="font-bold">{item.name}</p>
                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No snacks added.</p>
          )}
        </div>

        {/* Cancel Booking */}
        {booking.status !== "cancelled" && (
          <div className="mt-6">
            <Button
              color="danger"
              onClick={() => setCancelModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </Card>

      {/* Cancel Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Cancel Booking</ModalHeader>
          <ModalBody>
            <Input
              label="Reason"
              placeholder="Write the reason for cancellation..."
              fullWidth
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCancel} color="primary">
              Submit
            </Button>
            <Button color="danger" onClick={() => setCancelModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingDetailsPage;

