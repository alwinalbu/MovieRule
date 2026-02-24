
import React, { useRef } from "react";
import {
  Card,
  Button,
  Image,
  Modal,
  ModalContent,
  CardFooter,
} from "@nextui-org/react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import QRCode from "qrcode.react";
import Swal from "sweetalert2";

interface TicketsCardProps {
  booking: any;
  onCancel?: (bookingId: string) => void;
}

const convertObjectIdTo10DigitNumber = (objectId: string): number => {
  const bigIntValue = BigInt(`0x${objectId}`);
  const max10DigitNumber = BigInt(10000000000); // 10^10
  const numericId = bigIntValue % max10DigitNumber;
  return Number(numericId);
};

// Formatting date
export const formatDate = (date: string): string => {
  const datestr = new Date(date);
  if (isNaN(datestr.getTime())) {
    // Handle invalid date here
    console.error(`Invalid date: ${date}`);
    return "Invalid date";
  }
  return format(datestr, "MMMM dd, yyyy");
};

export const TicketsCard: React.FC<TicketsCardProps> = ({
  booking,
  onCancel,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const moviePoster = booking.showId.movie.posterPath || "default-image-url";
  const formattedBookingId = convertObjectIdTo10DigitNumber(booking._id);
  const numberOfTickets = booking.selectedSeats.length;
  const formattedDate = formatDate(booking.showId.date);


 const bookingId = booking._id; 
 const ticketURL = `http://192.168.29.4:5173/booked-ticket?data=${bookingId}`;

  const downloadTicketAsImage = async () => {
    const node = modalContentRef.current;

    if (node) {
      try {
        const dataUrl = await htmlToImage.toPng(node);
        saveAs(dataUrl, "ticket-details.png");
      } catch (error) {
        console.error("Error generating image:", error);
        // Handle error, e.g., display an error message to the user
      }
    } else {
      console.error('Element with id "modal-content" not found.');
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this ticket!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      if (onCancel) {
        onCancel(booking._id);
      } else {
        console.error("Cancel function is not defined.");
      }
    }
  };

  return (
    <>
      <Card
        isFooterBlurred
        radius="lg"
        className="relative overflow-hidden cursor-pointer transform transition-transform hover:scale-105 mt-5"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "300px",
          borderRadius: "12px",
          border: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Image
          alt="Movie Poster"
          className="object-cover"
          height={300}
          src={moviePoster}
          width={300}
        />
        <CardFooter
          className="absolute bottom-0 left-0 w-full p-4 bg-opacity-60 text-black rounded-t-lg flex justify-between items-center"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px 12px 0 0",
            boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.4)",
            zIndex: 10,
          }}
        >
          <div className="flex flex-col">
            <p className="text-xs mb-1">{booking.showId.movie.title}</p>
            <p className="text-xs mb-1">
              <span className="font-semibold">Seats:</span>{" "}
              {booking.selectedSeats.join(", ")}
            </p>
            <p className="text-xs mb-1">
              <span className="font-semibold">Screen:</span>{" "}
              {booking.screenId?.name}
            </p>
            <p className="text-xs mb-1">
              <span className="font-semibold">Payment:</span>{" "}
              {booking.paymentStatus}
            </p>
          </div>
          <Button
            className="text-tiny text-white bg-blue-700 mr-2"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            onPress={onOpen}
          >
            View Details
          </Button>
          {new Date(booking.showId.date) > new Date() &&
            booking.paymentStatus !== "refunded" && (
              <Button
                className="text-tiny text-white bg-red-600"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onClick={handleCancel}
              >
                Cancel Ticket
              </Button>
            )}
        </CardFooter>
      </Card>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <div ref={modalContentRef}>
          <ModalContent className="rounded-lg">
            <div className="bg-white rounded-lg shadow-lg text-black flex items-center justify-center">
              <div className="flex flex-col mb-4">
                <h4 className="text-lg font-semibold text-center mt-2 mb-2">
                  {booking.showId.show_name}
                </h4>
                <div className="flex items-center mb-4">
                  <Image
                    alt="Movie Poster"
                    className="object-cover"
                    height={200}
                    src={moviePoster}
                    width={150}
                  />
                  <div className="ml-4">
                    <h5 className="text-xl font-bold mb-2">
                      {booking.showId.movie.title}
                    </h5>
                    <p className="text-sm font-semibold mb-2 text-yellow-500">
                      <span className="font-semibold text-black">Rating: </span>
                      {booking.showId.movie.rating} ★ ★
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Date: </span>
                      {formattedDate} | {booking.showId.start_time}
                    </p>
                    <p className="text-sm font-semibold mb-2">
                      Theater: {booking.theaterId.username},{" "}
                      {booking.theaterId.city}
                    </p>
                  </div>
                </div>
                <p className="text-sm my-4 text-center font-semibold bg-gray-200 text-gray-700 py-2 px-4 rounded-full">
                  -----------------SCAN QR CODE AT CINEMA-------------
                </p>

                <div className="flex items-center mb-4">
                  <QRCode
                    value={ticketURL}
                    size={128}
                    fgColor="#000000" // Set foreground color
                    bgColor="#ffffff" // Set background color
                  />
                  <div className="ml-4">
                    <p className="text-sm mb-2">{numberOfTickets} Ticket(s)</p>
                    <p className="text-sm font-semibold mb-2">
                      Screen: {booking.screenId.name} (
                      {booking.screenId.quality})
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Seats:</span>{" "}
                      {booking.selectedSeats.join(", ")}
                    </p>
                    <p className="text-sm font-semibold mb-2">
                      Booking ID: {formattedBookingId}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-full">
                  <p className="text-sm font-semibold">Total Amount</p>
                  <p className="text-sm font-semibold">
                    ₹{booking.totalAmount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <Button
                size="sm"
                color="primary"
                className="text-tiny text-white bg-red-600 mt-2"
                onClick={downloadTicketAsImage}
              >
                Download Ticket Or Take A Screen Shot
              </Button>
            </div>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
};
