import { IBooking } from "./TicketsPage";
import {  Image, } from "@nextui-org/react";
interface BookingDetailProps {
  booking: IBooking;
  onClose: () => void;
}

 export const TicketDetail: React.FC<BookingDetailProps> = ({ booking, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-20 p-4 overflow-auto">
      <button onClick={onClose} className="mb-4 text-red-500">
        Close
      </button>
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <p>
        <strong>Session ID:</strong> {booking.sessionId}
      </p>
      <p>
        <strong>User ID:</strong> {booking.userId}
      </p>
      <p>
        <strong>Show ID:</strong> {booking.showId}
      </p>
      <p>
        <strong>Theater ID:</strong> {booking.theaterId}
      </p>
      <p>
        <strong>Screen ID:</strong> {booking.screenId}
      </p>
      <p>
        <strong>Selected Seats:</strong> {booking.selectedSeats.join(", ")}
      </p>

      
        <>
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          {booking.selectedItems?.map((item) => (
            <div key={item._id} className="flex items-center mb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="mr-4"
              />
              <div>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </>
      

      
        <p>
          <strong>Delivery Options:</strong>{" "}
          {booking.deliveryOptions?.join(", ")}
        </p>
      

      <p>
        <strong>Total Amount:</strong> ${booking.totalAmount}
      </p>
      <p>
        <strong>Payment Status:</strong> {booking.paymentStatus}
      </p>
    </div>
  );
};
