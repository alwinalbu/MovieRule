import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useParams, useLocation } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config, URL } from "../../../config/constants";
import { socket } from "../../../socket";
import screenImg from "../../../assets/images/screen.png";
// import seatImg from "../../../assets/images/seat.svg";
import {
  Snack,
  TheaterEntity,
} from "../../../interfaces/theater/Theaterinterface";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { waitForCookies } from "../../../utlis/waitForCookies";

interface Seat {
  seatId: string;
  status: "available" | "selected" | "locked" | "sold";
}

interface ScreenData {
  _id: string;
  name: string;
  quality: string;
  sound: string;
  rows: number;
  cols: number;
  price: number;
  image: string;
  theaterId: TheaterEntity;
  // layout: Seat[][];
  layout: (Seat | null)[][];
}

const ScreenLayoutPage: React.FC = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);

  // From route state
  const movie = location.state?.movie;
  const startTime = location.state?.startTime;
  const show = location.state?.show;
  const showId = show._id;

  // States
  const [layout, setLayout] = useState<Seat[][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [lockedSeats, setLockedSeats] = useState<string[]>([]);
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);
  const [screenData, setScreenData] = useState<ScreenData | null>(null);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );
  const [deliveryOptions, setDeliveryOptions] = useState({
    start: false,
    halfTime: false,
  });
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const userId = user?._id;
  const theaterId = screenData?.theaterId?._id;

  // 🧠 Fetch current user
  useEffect(() => {

    const fetchUser = async () => {
      await waitForCookies();
      try {
        const { data } = await axios.get(`${URL}/getUser`, config);
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // 🧠 Fetch screen layout
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await commonRequest(
          "GET",
          `/screens/${screenId}/layout`,
          config
        );
        setScreenData(res.data.screenLayout);
        setLayout(res.data.screenLayout.layout);
      } catch {
        toast.error("Failed to fetch layout");
      } finally {
        setLoading(false);
      }
    };
    fetchLayout();
  }, [screenId]);

  // 🧠 Fetch reserved (sold) seats
  useEffect(() => {
    const fetchReserved = async () => {
      try {
        const res = await commonRequest(
          "GET",
          `/reservations/${showId}`,
          config
        );
        setReservedSeats(res.data.data.reservedSeats || []);
      } catch {
        console.error("Failed to fetch reservation");
      }
    };
    fetchReserved();
  }, [showId]);

  // 🧠 Fetch currently locked seats
  useEffect(() => {
    const fetchLocked = async () => {
      try {
        const res = await commonRequest("GET", `/locks/${showId}`, config);
        setLockedSeats(res.data.lockedSeats || []);
      } catch {
        console.error("Failed to fetch locked seats");
      }
    };
    fetchLocked();
  }, [showId]);

  // 🧠 Fetch snacks
  useEffect(() => {
    const fetchSnacks = async () => {
      if (theaterId) {
        try {
          const res = await commonRequest(
            "GET",
            `/theater/get-snacks?theaterId=${theaterId}`,
            config
          );
          setSnacks(res.data.data);
        } catch {
          toast.error("Failed to fetch snacks");
        }
      }
    };
    fetchSnacks();
  }, [theaterId]);

  // 🧠 Socket.io listeners
  useEffect(() => {
    socket.emit("joinRoom", showId);

    socket.on(
      "seat:locked",
      ({ showId: incomingShowId, seatIds, userId: lockerId }) => {
        if (incomingShowId === showId && lockerId !== user?._id) {
          setLockedSeats((prev) => [...new Set([...prev, ...seatIds])]);
        }
      }
    );

    socket.on("seat:unlocked", ({ showId: incomingShowId, seatIds }) => {
      if (incomingShowId === showId)
        setLockedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
    });

    socket.on("seat:sold", ({ showId: incomingShowId, seatIds }) => {
      if (incomingShowId === showId) {
        setReservedSeats((prev) => [...new Set([...prev, ...seatIds])]);
        setLockedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
      }
    });

    return () => {
      socket.off("seat:locked");
      socket.off("seat:unlocked");
      socket.off("seat:sold");
    };
  }, [showId]);

  // 🧠 Determine seat status
  const getSeatStatus = (
    seatId: string
  ): "available" | "selected" | "locked" | "sold" => {
    if (reservedSeats.includes(seatId)) return "sold";
    if (lockedSeats.includes(seatId)) return "locked";
    if (selectedSeats.has(seatId)) return "selected";
    return "available";
  };

  // ⏱️ Batching logic
  const pendingSeatsRef = useRef<string[]>([]);
  const batchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const processPendingLocks = async () => {
    const seatIds = [...pendingSeatsRef.current];
    pendingSeatsRef.current = [];

    if (seatIds.length === 0) return;

    try {
      await commonRequest("POST", "/lock-seats", config, { showId, seatIds });
      setSelectedSeats((prev) => new Set([...prev, ...seatIds]));
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error("Some seats are already locked by others");
      } else {
        toast.error("Failed to lock seats");
      }
    }
  };

  // 🧠 Handle seat click (with batching)
  const handleSeatClick = async (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === "sold" || status === "locked") return;

    if (selectedSeats.has(seatId)) {
      // Unlock instantly
      try {
        await commonRequest("POST", "/unlock-seats", config, {
          showId,
          seatIds: [seatId],
        });
        setSelectedSeats((prev) => {
          const updated = new Set(prev);
          updated.delete(seatId);
          return updated;
        });
      } catch {
        toast.error("Failed to unlock seat");
      }
      return;
    }

    // Add to pending batch
    pendingSeatsRef.current.push(seatId);
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    batchTimerRef.current = setTimeout(() => {
      processPendingLocks();
    }, 500); // batch delay (ms)
  };

  // 🧠 Delivery timing handler
  const handleDeliveryOptionChange = (option: "start" | "halfTime") => {
    setDeliveryOptions({
      start: option === "start",
      halfTime: option === "halfTime",
    });
  };

  // 🧠 Food & booking logic
  const handleItemAdd = (item: string) =>
    setSelectedItems((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));

  const handleItemRemove = (item: string) =>
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      if (newItems[item] > 0) newItems[item] -= 1;
      if (newItems[item] === 0) delete newItems[item];
      return newItems;
    });

  const calculateTotalPrice = () => {
    const seatTotal = selectedSeats.size * (screenData?.price ?? 0);
    const foodTotal = Object.keys(selectedItems).reduce((acc, item) => {
      const foodItem = snacks.find((f) => f.name === item);
      return acc + (foodItem?.price ?? 0) * selectedItems[item];
    }, 0);
    return (seatTotal + foodTotal).toFixed(2);
  };

  const handleBooking = async (discountedAmount?: number) => {
    const totalPrice = discountedAmount || calculateTotalPrice();
    const bookingData = {
      selectedSeats: Array.from(selectedSeats),
      selectedItems: Object.keys(selectedItems).map((item) => {
        const foodItem = snacks.find((f) => f.name === item);
        return {
          name: item,
          price: foodItem?.price ?? 0,
          quantity: selectedItems[item],
          image: foodItem?.image ?? "",
        };
      }),
      deliveryOptions: Object.keys(deliveryOptions).filter(
        (key) => deliveryOptions[key as keyof typeof deliveryOptions]
      ),
      totalAmount: totalPrice,
      theaterName: screenData?.theaterId.username ?? "",
      screenName: screenData?.name ?? "",
      showTime: startTime,
      movieName: movie?.title ?? "",
      movieImage: movie?.posterPath ?? "",
      show: show ?? "",
      user: userId ?? "",
    };

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!
    );
    const res = await commonRequest(
      "POST",
      "/create-checkout-session",
      config,
      bookingData
    );
    const result = await stripe!.redirectToCheckout({ sessionId: res.data.id });

    if (result.error) {
      toast.error(result.error.message ?? "Payment failed. Please try again.");
    }
    setIsFoodModalOpen(false);
  };

  const confirmBookingWithOffer = () => {
    const discounted = parseFloat(calculateTotalPrice()) * 0.9;
    handleBooking(discounted);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-4 text-white">
      {/* 🎬 Seat Layout */}
      {layout.map((row, r) => (
        <div key={r} className="flex mb-2 items-center">
          <span className="mr-3">{String.fromCharCode(65 + r)}</span>
          {row.map((seat, c) => {
             if (!seat) {
               return <div key={c} className="w-8 h-8 mr-2" />;
             }
            const status = getSeatStatus(seat.seatId);
            return (
              <motion.div
                key={c}
                whileHover={status === "available" ? { scale: 1.1 } : {}}
                animate={
                  status === "selected"
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: "0 0 12px rgba(34,197,94,0.8)",
                      }
                    : { scale: 1, boxShadow: "none" }
                }
                transition={{
                  duration: 0.6,
                  repeat: status === "selected" ? Infinity : 0,
                }}
                className={`w-8 h-8 mr-2 rounded-md flex items-center justify-center text-xs font-bold ${
                  status === "selected"
                    ? "bg-green-500 text-black"
                    : status === "locked"
                    ? "bg-yellow-500 opacity-60 cursor-not-allowed"
                    : status === "sold"
                    ? "bg-red-600 opacity-70 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-400 cursor-pointer"
                }`}
                onClick={() => handleSeatClick(seat.seatId)}
              >
                {seat.seatId.replace(/[^0-9]/g, "")}
              </motion.div>
            );
          })}
        </div>
      ))}

      <img src={screenImg} className="max-w-full mt-4" alt="Screen" />

      {/* 💺 Booking Summary */}
      {screenData && (
        <div className="w-full bg-gray-800 rounded-lg p-4 mt-6 flex flex-col md:flex-row md:items-start">
          <div className="flex flex-col flex-grow mb-4 md:mb-0 md:mr-4">
            <h3 className="text-xl font-semibold mb-2">{screenData.name}</h3>
            <h4 className="text-lg mb-1">
              <i className="fa-solid fa-film mr-1"></i>
              {movie?.title}
            </h4>
            <h4 className="text-sm mb-1">
              <i className="fa-solid fa-tv mr-1"></i>
              {screenData.quality}
            </h4>
            <h4 className="text-sm">
              <i className="fa-solid fa-location-dot mr-1"></i>
              {screenData.theaterId?.city}
            </h4>
          </div>

          <div className="flex flex-col flex-grow text-center">
            <h4 className="text-lg font-semibold mb-2">Seats</h4>
            <p className="mb-2">
              {Array.from(selectedSeats).join(", ") || "No seats selected"}
            </p>
            <p>₹{(selectedSeats.size * (screenData.price || 0)).toFixed(2)}</p>
          </div>

          <div className="flex flex-col flex-grow text-center">
            <h4 className="text-lg font-semibold mb-2">Total</h4>
            <p className="text-xl font-bold">₹{calculateTotalPrice()}</p>
            <Button
              onClick={() =>
                selectedSeats.size > 0
                  ? snacks.length > 0
                    ? setIsFoodModalOpen(true)
                    : setOfferModalOpen(true)
                  : toast.error("Select at least one seat")
              }
              className="bg-red-600 text-white mt-4"
            >
              Proceed to Pay
            </Button>
          </div>
        </div>
      )}

      {/* 🍿 Food Modal */}
      <Modal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        size="3xl"
      >
        <ModalContent className="bg-black text-white">
          <ModalHeader>Select Snacks</ModalHeader>
          <ModalBody>
            {snacks.map((item) => (
              <div key={item._id} className="flex justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    className="w-10 h-10 mr-3 rounded-full"
                  />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center">
                  <Button onClick={() => handleItemRemove(item.name)}>-</Button>
                  <span className="mx-2">{selectedItems[item.name] || 0}</span>
                  <Button onClick={() => handleItemAdd(item.name)}>+</Button>
                  <span className="ml-4">₹{item.price}</span>
                </div>
              </div>
            ))}
          </ModalBody>

          {/* 🎯 Delivery Timing Options + Confirm Button */}
          <ModalFooter className="flex flex-col md:flex-row md:items-center justify-between w-full">
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="mr-2 mb-2 md:mb-0 text-sm text-gray-300">
                🍿 Delivery Timing:
              </span>

              {/* Start of Show */}
              <div
                onClick={() => handleDeliveryOptionChange("start")}
                className={`flex items-center cursor-pointer border rounded-lg px-3 py-2 me-2 transition-colors ${
                  deliveryOptions.start
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div
                  className={`w-4 h-4 mr-2 border-2 rounded-full ${
                    deliveryOptions.start
                      ? "bg-green-400 border-green-500"
                      : "border-gray-400"
                  }`}
                />
                <span>Start of Show</span>
              </div>

              {/* Half-Time */}
              <div
                onClick={() => handleDeliveryOptionChange("halfTime")}
                className={`flex items-center cursor-pointer border rounded-lg px-3 py-2 transition-colors ${
                  deliveryOptions.halfTime
                    ? "border-green-500 bg-green-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div
                  className={`w-4 h-4 mr-2 border-2 rounded-full ${
                    deliveryOptions.halfTime
                      ? "bg-green-400 border-green-500"
                      : "border-gray-400"
                  }`}
                />
                <span>Half-Time</span>
              </div>
            </div>

            <Button
              onClick={() =>
                currentUser?.isSubscribed?.status === "active"
                  ? (setIsFoodModalOpen(false), setOfferModalOpen(true))
                  : handleBooking()
              }
              className="bg-red-600 text-white hover:bg-red-700 mt-3 md:mt-0"
            >
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 🎁 Offer Modal */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setOfferModalOpen(false)}
        className="bg-black text-white"
      >
        <ModalContent>
          <ModalHeader>Special Offer</ModalHeader>
          <ModalBody>
            <p>You're eligible for a 10% discount!</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={confirmBookingWithOffer}
              className="bg-green-600 text-white"
            >
              Confirm with Discount
            </Button>
            <Button
              onClick={() => setOfferModalOpen(false)}
              className="bg-gray-600 text-white"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ScreenLayoutPage;
