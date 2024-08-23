import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { format } from "date-fns";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";



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
    return <div>Loading...</div>; // Handle loading state
  }

  const moviePoster = booking.showId.movie.posterPath || "default-image-url";
  const formattedDate = formatDate(booking.showId.date);
  const numberOfTickets = booking.selectedSeats.length;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
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
            Theater: {booking.theaterId.username}, {booking.theaterId.city}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="ml-4">
          <p className="text-sm mb-2">{numberOfTickets} Ticket(s)</p>
          <p className="text-sm font-semibold mb-2">
            Screen: {booking.screenId.name} ({booking.screenId.quality})
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">Seats:</span>{" "}
            {booking.selectedSeats.join(", ")}
          </p>
          <p className="text-sm font-semibold mb-2">
            Booking ID: {booking._id}
          </p>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <h5 className="text-lg font-semibold mb-2">Selected Items</h5>
        {booking.selectedItems.map((item:any) => (
          <div key={item.name} className="flex items-center mb-2">
            <Image
              alt={item.name}
              className="object-cover"
              height={50}
              src={item.image}
              width={50}
            />
            <div className="ml-4">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm">Price: ₹{item.price}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mb-4">
        <h5 className="text-lg font-semibold mb-2">Delivery Options</h5>
        <ul>
          {booking.deliveryOptions.map((option:any) => (
            <li key={option} className="text-sm mb-1">
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-full">
        <p className="text-sm font-semibold">Total Amount</p>
        <p className="text-sm font-semibold">₹{booking.totalAmount}</p>
      </div>
    </div>
  );
};

export default QrPage;
