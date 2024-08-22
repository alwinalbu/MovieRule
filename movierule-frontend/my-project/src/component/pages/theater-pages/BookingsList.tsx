// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Spinner } from "@nextui-org/react";
// import { IBooking } from "../user-pages/TicketsPage";
// import { RootState } from "../../../redux/store";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import { formatDate } from "../user-pages/TicketsCard";
// import { FaHeart } from "react-icons/fa"; // Import a like icon or button component

// const BookingsList: React.FC = () => {
//   const { theaterOwner, error: reduxError } = useSelector(
//     (state: RootState) => state.theater
//   );
//   const [bookings, setBookings] = useState<IBooking[]>([]);
//   const [isLoading, setLoading] = useState<boolean>(false);

//   const theaterId = theaterOwner?._id;

//   const fetchBookings = async () => {
//     if (!theaterId) {
//       console.error("Theater ID is not available.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await commonRequest(
//         "GET",
//         `/theater/bookings/${theaterId}`,
//         config
//       );

//       console.log(res, "bookings from backend in theater");

//       setBookings(res.data.bookings);
//     } catch (error) {
//       console.error("Failed to fetch bookings", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [theaterId]);

//   if (reduxError) {
//     return (
//       <div className="error-message text-red-600 text-center my-4">
//         Error: {reduxError}
//       </div>
//     );
//   }

//   const handlePosterClick = (movieId: string, bookingId: string) => {
//     // Handle poster click action
//     console.log(`Movie ID: ${movieId}, Booking ID: ${bookingId}`);
//   };

//   const handleLikeClick = (bookingId: string) => {
//     // Handle like button click
//     console.log(`Like clicked for Booking ID: ${bookingId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h3 className="text-xl font-semibold mb-4 text-center">Bookings</h3>
//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Spinner label="Loading..." color="primary" />
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-4">
//           {bookings.length > 0 ? (
//             bookings.map((booking) => (
//               <div
//                 className="booking-card w-64 h-96 p-4 bg-gray-800 rounded-lg shadow-md relative"
//                 key={booking._id}
//               >
//                 <img
//                   className="poster w-full h-64 object-cover cursor-pointer transition-transform transform hover:scale-105"
//                   src={booking.showId.movie.posterPath}
//                   alt={`Poster of ${booking.showId.movie.title}`}
//                   onClick={() =>
//                     handlePosterClick(booking.showId.movie._id, booking._id)
//                   }
//                 />
//                 <div className="absolute top-2 right-2">
//                   {/* <button
//                     className="text-red-500 hover:text-red-400"
//                     onClick={() => handleLikeClick(booking._id)}
//                   >
//                     <FaHeart size={24} />
//                   </button> */}
//                 </div>
//                 <h4 className="text-lg font-semibold mt-2">
//                   {booking.showId.movie.title}
//                 </h4>
//                 <p>Date: {formatDate(booking.showId.date)}</p>
//                 <p>Time: {booking.showId.start_time}</p>
//                 <p>Seats: {booking.selectedSeats.join(", ")}</p>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-400">No bookings found.</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingsList;


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
  useDisclosure,
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const theaterId = theaterOwner?._id;

  const fetchBookings = async (page: number) => {
    if (!theaterId) {
      console.error("Theater ID is not available.");
      return;
    }
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [theaterId, currentPage]);

  const handlePosterClick = (movieId: string, bookingId: string) => {
    console.log(`Movie ID: ${movieId}, Booking ID: ${bookingId}`);
  };

  const openRejectModal = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setRejectModalOpen(true);
  };

  const handleReject = async () => {
    if (!currentBookingId) return;

    try {
      await commonRequest(
        "PATCH",
        `/bookings/${currentBookingId}/cancel`,
        config,
        {
          reason: rejectReason,
        }
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === currentBookingId
            ? { ...booking, status: "canceled" }
            : booking
        )
      );
      setRejectModalOpen(false);
      setRejectReason("");
    } catch (err) {
      console.error("Failed to cancel booking", err);
    }
  };

  const handleDetailsClick = (bookingId: string) => {
    navigate(`/theater/booking-details/${bookingId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


   const toggleSidebar = () => {
     setSidebarOpen(!sidebarOpen);
   };

  const renderCell = (booking:any, columnKey: string | number) => {
    const key = String(columnKey);
    const cellValue = booking[key as keyof IBooking];

    switch (key) {
      case "movie":
        return (
          <div className="flex items-center">
            <img
              src={booking.showId.movie.posterPath}
              alt={`Poster of ${booking.showId.movie.title}`}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() =>
                handlePosterClick(booking.showId.movie._id, booking._id)
              }
            />
            <div className="ml-2">
              <p className="text-sm text-gray-500">
                {booking.showId.movie.title}
              </p>
            </div>
          </div>
        );
      case "date":
        return (
          <p className="text-sm text-gray-500">
            {formatDate(booking.showId.date)}
          </p>
        );
      case "start_time":
        return (
          <p className="text-sm text-gray-500">{booking.showId.start_time}</p>
        );
      case "selectedSeats":
        return (
          <p className="text-sm text-gray-500">
            {booking.selectedSeats.join(", ")}
          </p>
        );
      case "paymentStatus":
        const chipColor =
          booking.paymentStatus === "paid"
            ? "success"
            : booking.paymentStatus === "pending"
            ? "warning"
            : "danger";
        return (
          <Chip
            className="capitalize"
            color={chipColor}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleDetailsClick(booking._id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Cancel booking">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => openRejectModal(booking._id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { name: "Movie", uid: "movie" },
    { name: "Date", uid: "date" },
    { name: "Time", uid: "start_time" },
    { name: "Seats", uid: "selectedSeats" },
    { name: "Payment Status", uid: "paymentStatus" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="p-6">
        <button onClick={toggleSidebar} className="text-white">
          <GiHamburgerMenu />
        </button>
        {sidebarOpen && (
          <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        )}
        <h1 className="text-3xl font-bold mb-6">Bookings List</h1>
        <Table aria-label="Bookings table with custom cells">
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
              <TableRow key={item._id}>
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
            initialPage={currentPage}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </main>
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Reason for Rejection</ModalHeader>
          <ModalBody>
            <Input
              label="Reason"
              placeholder="Write the reason for rejection..."
              fullWidth
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleReject}>Submit</Button>
            <Button color="danger" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingsList;
