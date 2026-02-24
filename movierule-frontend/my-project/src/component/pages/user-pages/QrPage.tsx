
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { format } from "date-fns";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import QRCode from "qrcode.react";

const formatDate = (date: string): string => {
  const datestr = new Date(date);
  if (isNaN(datestr.getTime())) {
    console.error(`Invalid date: ${date}`);
    return "Invalid date";
  }
  return format(datestr, "MMMM dd, yyyy");
};

const QrPage: React.FC = () => {
  const [_searchParams] = useSearchParams();
  const [booking, setBooking] = useState<any | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const bookingId = queryParams.get("data");

    if (bookingId) {
      const fetchBookingData = async () => {
        try {
          const response = await commonRequest(
            "GET",
            `/bookings/${bookingId}`,
            config
          );
          setBooking(response.data.booking);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      };

      fetchBookingData();
    }
  }, [location.search]);

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  const moviePoster = booking.showId.movie.posterPath || "default-image-url";
  const formattedDate = formatDate(booking.showId.date);
  const numberOfTickets = booking.selectedSeats.length;

  // QR Code URL for scanning at theater
  const ticketURL = `${window.location.origin}/booked-ticket?data=${booking._id}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-4 text-center">
          <h2 className="text-2xl font-bold">Movie Ticket</h2>
          <p className="text-sm">Please present this QR code at the cinema</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-center mb-4">
            {booking.showId.show_name}
          </h4>

          <div className="flex items-center mb-6">
            <Image
              alt="Movie Poster"
              className="object-cover rounded-lg"
              height={180}
              src={moviePoster}
              width={130}
            />
            <div className="ml-4">
              <h5 className="text-xl font-bold mb-2">
                {booking.showId.movie.title}
              </h5>
              <p className="text-sm text-yellow-600 mb-2">
                ⭐ {booking.showId.movie.rating}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Date: </span>
                {formattedDate} | {booking.showId.start_time}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Theater: </span>
                {booking.theaterId.username}, {booking.theaterId.city}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Screen: </span>
                {booking.screenId.name} ({booking.screenId.quality})
              </p>
              <p className="text-sm">
                <span className="font-semibold">Seats: </span>
                {booking.selectedSeats.join(", ")}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <QRCode value={ticketURL} size={150} fgColor="#000000" />
              <p className="text-xs text-center mt-2 text-gray-700">
                {numberOfTickets} Ticket(s)
              </p>
            </div>
          </div>

          {/* Selected Items */}
          {booking.selectedItems && booking.selectedItems.length > 0 && (
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Snacks & Drinks</h5>
              <div className="space-y-2">
                {booking.selectedItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-100 p-2 rounded-lg"
                  >
                    <Image
                      alt={item.name}
                      className="object-cover rounded"
                      height={50}
                      src={item.image}
                      width={50}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Options */}
          {booking.deliveryOptions && booking.deliveryOptions.length > 0 && (
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Delivery Options</h5>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {booking.deliveryOptions.map((option: any) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Price */}
          <div className="flex justify-between items-center bg-gray-200 py-3 px-4 rounded-lg">
            <p className="text-sm font-semibold">Total Amount</p>
            <p className="text-sm font-bold">₹{booking.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPage;

