import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Button,
  Progress,
  Image,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaClock, FaChair, FaUser, FaMoneyBill } from "react-icons/fa";
import { IoIosRefresh, IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";

const ManageShowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showId = location.state;

  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState<any>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // ✅ Fetch backend data directly here
  const fetchManageShowData = async (id: string) => {
    try {
      const response = await commonRequest(
        "GET",
        `/theater/show/manage/${id}`,
        config
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch show data"
      );
    }
  };

  // ✅ Cancel show API call
  const cancelShow = async () => {
    try {
      setCancelLoading(true);
      const response = await commonRequest(
        "PATCH",
        `/theater/show/${showId}/cancel`,
        config,
        { reason: "Show cancelled by theater" }
      );
      toast.success(response.data.message || "Show cancelled successfully");
      setTimeout(() => {
        navigate("/theater/create-shows"); 
      }, 1200);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel show");
    } finally {
      setCancelLoading(false);
      onOpenChange();
    }
  };

  // ✅ Load show data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchManageShowData(showId);
        setShowData(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [showId]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner label="Loading Show Details..." size="lg" />
      </div>
    );
  }

  if (!showData) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Failed to load show data.
      </div>
    );
  }

  const { show, screen, bookings, stats } = showData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <Toaster />

      {/* 🎞️ HEADER / HERO SECTION */}
      <div className="relative flex flex-col md:flex-row gap-6 mb-8">
        <Image
          src={show.movie.posterPath}
          alt={show.movie.title}
          className="rounded-2xl shadow-lg w-full md:w-1/3 object-cover"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{show.movie.title}</h1>
            <p className="text-gray-400 text-sm mb-2">
              {show.theater_id.username}
            </p>
            <p className="text-gray-300">
              <b>{show.show_name}</b> — {screen.name}
            </p>
            <p className="text-gray-400 mt-2">
              {new Date(show.date).toLocaleDateString()} | {show.start_time} -{" "}
              {show.end_time}
            </p>
            <p className="text-gray-400 mt-3 text-sm max-w-lg">
              {show.movie.overview}
            </p>

            {/* 🟢 Show status indicator */}
            <p className="text-gray-400 mt-2">
              Status:{" "}
              <span
                className={
                  stats.showStatus === "Upcoming"
                    ? "text-green-400"
                    : stats.showStatus === "Running"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {stats.showStatus}
              </span>
            </p>

            <p className="text-gray-400 mt-2">
              Time Left:{" "}
              <span className="text-green-400">{stats.timeLeft}</span>
            </p>
          </div>

          {/* 🎬 Action Buttons */}
          <div className="flex gap-3 mt-4">
            {/* 🛑 Cancel Show Button */}
            {stats.showStatus === "Upcoming" ? (
              <Button
                color="danger"
                startContent={<IoMdClose />}
                onPress={onOpen}
                className="transition hover:scale-105"
              >
                Cancel Show
              </Button>
            ) : (
              <Button
                color="default"
                isDisabled
                startContent={<IoMdClose />}
                className="opacity-50 cursor-not-allowed"
              >
                {stats.showStatus === "Running"
                  ? "Show Running"
                  : "Show Completed"}
              </Button>
            )}

            {/* 🔄 Refresh Button */}
            <Button
              color="primary"
              startContent={<IoIosRefresh />}
              onPress={() => window.location.reload()}
              className="transition hover:scale-105"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* 📊 STATS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-800 text-center">
          <CardBody>
            <FaChair className="mx-auto text-3xl mb-2 text-blue-400" />
            <p>Total Seats</p>
            <h2 className="text-2xl font-bold">{stats.totalSeats}</h2>
          </CardBody>
        </Card>

        <Card className="bg-gray-800 text-center">
          <CardBody>
            <FaUser className="mx-auto text-3xl mb-2 text-green-400" />
            <p>Booked Seats</p>
            <h2 className="text-2xl font-bold">{stats.bookedSeats}</h2>
          </CardBody>
        </Card>

        <Card className="bg-gray-800 text-center">
          <CardBody>
            <FaClock className="mx-auto text-3xl mb-2 text-yellow-400" />
            <p>Available Seats</p>
            <h2 className="text-2xl font-bold">{stats.availableSeats}</h2>
          </CardBody>
        </Card>

        <Card className="bg-gray-800 text-center">
          <CardBody>
            <FaMoneyBill className="mx-auto text-3xl mb-2 text-green-500" />
            <p>Total Revenue</p>
            <h2 className="text-2xl font-bold">₹{stats.revenue}</h2>
          </CardBody>
        </Card>
      </div>

      {/* 📈 Progress Bar */}
      <div className="mb-10">
        <p className="text-gray-400 mb-2">
          Occupancy Rate (
          {Math.round((stats.bookedSeats / stats.totalSeats) * 100)}%)
        </p>
        <Progress
          value={(stats.bookedSeats / stats.totalSeats) * 100}
          color="success"
        />
      </div>

      <Divider className="my-8 bg-gray-700" />

      {/* 🪑 SEAT LAYOUT SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Seat Layout</h2>
        <div className="bg-gray-800 p-4 rounded-lg inline-block overflow-auto shadow-lg">
          {Array.from({ length: screen.rows }).map((_, rowIdx) => {
            const rowLabel = String.fromCharCode(65 + rowIdx);
            return (
              <div key={rowIdx} className="flex justify-center mb-2">
                {Array.from({ length: screen.cols }).map((_, colIdx) => {
                  const seatId = `${rowLabel}${colIdx + 1}`;
                  const isBooked = bookings.some(
                    (b: any) =>
                      b.status !== "cancelled" &&
                      b.paymentStatus !== "refunded" &&
                      b.selectedSeats.includes(seatId)
                  );
                  return (
                    <div
                      key={seatId}
                      title={seatId}
                      className={`w-7 h-7 mx-1 rounded-md text-xs flex justify-center items-center font-semibold cursor-pointer ${
                        isBooked
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-black"
                      } hover:scale-105 transition`}
                    >
                      {colIdx + 1}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <Divider className="my-8 bg-gray-700" />

      {/* 🧾 BOOKINGS TABLE */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Seats</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b: any, idx: number) => (
                <tr
                  key={idx}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{b.userId?.username || "Unknown"}</td>
                  <td className="p-3">{b.selectedSeats.join(", ")}</td>
                  <td className="p-3">₹{b.totalAmount}</td>
                  <td
                    className={`p-3 ${
                      b.paymentStatus === "paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {b.paymentStatus}
                  </td>
                  <td className="p-3">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ❗ Cancel Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        <ModalContent>
          <ModalHeader>Cancel Show</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to cancel this show?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onPress={cancelShow}
              isLoading={cancelLoading}
            >
              Confirm Cancel
            </Button>
            <Button variant="light" onPress={onOpenChange}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageShowPage;

