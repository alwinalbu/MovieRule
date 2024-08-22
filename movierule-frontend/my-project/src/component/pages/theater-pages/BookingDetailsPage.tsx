import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
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
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    // Fetch booking details from the backend using bookingId
    const fetchBookingDetails = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/theater/get-booking/${bookingId}`,
          config
        );
        console.log(response, "response");
        setBooking(response.data.data);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleCancel = async () => {
    if (booking) {
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

        toast.success("Cancellation email sent successfully");

        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 2000);
      } catch (error: any) {
        console.error("Failed to cancel the booking:", error);
        toast.error("Failed to cancel the booking");
      }
    }
  };

 if (loading) {
   return (
     <div className="flex justify-center items-center h-60">
       <Spinner size="lg" />
     </div>
   );
 }

 if (!booking) {
   return <div>Booking not found</div>;
 }


 const showDate=new Date(booking.showId.date).toLocaleDateString('en-GB',{
  day:'2-digit',
  month:'2-digit',
  year:"numeric"
 });




  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 min-h-screen flex justify-center items-center">
      <Toaster /> {/* Add Toaster component */}
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
          </div>
          <h2 className="text-2xl mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input readOnly label="Session ID" value={booking.sessionId} />
            <Input readOnly label="Username" value={booking.userId?.username} />
            <Input readOnly label="Email" value={booking.userId?.email} />
            <Input
              readOnly
              label="Show Name"
              value={booking.showId?.show_name}
            />
            <Input
              readOnly
              label="Show Time"
              value={booking.showId?.start_time}
            />
            <Input readOnly label="Show Date" value={showDate} />
            <Input
              readOnly
              label="Movie Name"
              value={booking.showId?.movie?.title}
            />
            <div className="col-span-1">
              <Image
                src={booking.showId?.movie?.posterPath || ""}
                alt="Movie Poster"
                className="cursor-pointer"
              />
            </div>
            <Input
              readOnly
              label="Theater Name"
              value={booking.theaterId?.username}
            />
            <Input readOnly label="City" value={booking.theaterId?.city} />
            <Input
              readOnly
              label="Screen Name"
              value={booking.screenId?.name}
            />
            <Input
              readOnly
              label="Screen Quality"
              value={booking.screenId?.quality}
            />
            <Input
              readOnly
              label="Selected Seats"
              value={booking.selectedSeats.join(", ")}
            />
            <Input
              readOnly
              label="Total Amount"
              value={String(booking.totalAmount)}
            />
            <Input
              readOnly
              label="Payment Status"
              value={booking.paymentStatus}
            />
          </div>
          <h3 className="text-xl mt-4">Selected Items</h3>
          <div className="grid grid-cols-2 gap-4">
            {booking.selectedItems.map((item: any) => (
              <div key={item._id}>
                <Image
                  src={item.image}
                  alt={item.name}
                  className="cursor-pointer"
                />
                <Input readOnly label="Item Name" value={item.name} />
                <Input readOnly label="Price" value={String(item.price)} />
                <Input
                  readOnly
                  label="Quantity"
                  value={String(item.quantity)}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Button color="danger" onClick={() => setCancelModalOpen(true)}>
              Cancel Booking
            </Button>
          </div>
        </div>
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
            <Button onClick={handleCancel}>Submit</Button>
            <Button color="danger" onClick={() => setCancelModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingDetailsPage;
