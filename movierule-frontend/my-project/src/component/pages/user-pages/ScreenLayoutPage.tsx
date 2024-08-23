// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Checkbox,
// } from "@nextui-org/react";
// import { useParams, useLocation } from "react-router-dom";
// import { commonRequest } from "../../../config/api";
// import { config, URL } from "../../../config/constants";
// import screenImg from "../../../assets/images/screen.png";
// import seatImg from "../../../assets/images/seat.svg";
// import {
//   Snack,
//   TheaterEntity,
// } from "../../../interfaces/theater/Theaterinterface";
// import { loadStripe } from "@stripe/stripe-js";
// import { RootState } from "../../../redux/store";
// import { useSelector } from "react-redux";
// import axios from "axios";

// interface Seat {
//   seatId: string;
//   status: "available" | "selected" | "sold";
// }

// interface ScreenData {
//   _id: string;
//   name: string;
//   quality: string;
//   sound: string;
//   rows: number;
//   cols: number;
//   price: number;
//   image: string;
//   theaterId: TheaterEntity;
//   layout: Seat[][];
// }

// const ScreenLayoutPage: React.FC = () => {
//   const { screenId } = useParams<{ screenId: string }>();
//   const [layout, setLayout] = useState<Seat[][]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [_error, setError] = useState<string | null>(null);
//   const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
//   const [reservedSeats, setReservedSeats] = useState<string[]>([]);
//   const [screenData, setScreenData] = useState<ScreenData | null>(null);
//   const [isFoodModalOpen, setIsFoodModalOpen] = useState<boolean>(false);
//   const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [deliveryOptions, setDeliveryOptions] = useState<{
//     start: boolean;
//     halfTime: boolean;
//   }>({ start: false, halfTime: false });
//   const [snacks, setSnacks] = useState<Snack[]>([]);
//   const { user } = useSelector((state: RootState) => state.user);
//    const [currentUser, setCurrentUser] = useState<any>(null);

//   const userId = user?._id;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await axios.get(`${URL}/getUser`, config);
//         setCurrentUser(data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const location = useLocation();
//   const movie = location.state?.movie;
//   const startTime = location.state?.startTime;
//   const theaterId = screenData?.theaterId._id;
//   const show = location.state?.show;

//   const showId=show._id;

//   console.log(screenData, "screen layout ");

//   //------------------------------------------Screen ID Layout ------------------------------------------------
//   useEffect(() => {
//     const fetchLayout = async () => {
//       try {
//         const response = await commonRequest(
//           "GET",
//           `/screens/${screenId}/layout`,
//           config
//         );
//         setScreenData(response.data.screenLayout);
//         setLayout(response.data.screenLayout.layout);

//       } catch (err) {
//         setError("Failed to fetch layout");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLayout();
//   }, [screenId]);

//    useEffect(() => {
//    const fetchReservation = async (showId: string)=> {
//      try {
//        const response = await commonRequest(
//          "GET",
//          `/reservations/${showId}`,
//          config
//        );
//        console.log(response,"response from reservation")
//        setReservedSeats(response.data.data.reservedSeats);
//      } catch (error) {
//        console.error("Failed to fetch reservation", error);
//        return [];
//      }
//    };

//    fetchReservation(showId);
//  }, [showId]);

//   //----------------------------------------Fetching Snacks---------------------------------------------------------

//   useEffect(() => {
//     const fetchSnacks = async () => {
//       if (theaterId) {
//         try {
//           const response = await commonRequest(
//             "GET",
//             `/theater/get-snacks?theaterId=${theaterId}`,
//             config
//           );

//           console.log(response, "response of snacks");

//           setSnacks(response.data.data);
//         } catch (error: any) {
//           setError("Failed to fetch Snacks");
//         }
//       }
//     };

//     fetchSnacks();
//   }, [theaterId]);

//   //--------------------------------------handling seat click---------------------------------------------------

//   const handleSeatClick = (seatId: string) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       const newSelectedSeats = new Set(prevSelectedSeats);

//       // Toggle seat selection
//       if (reservedSeats.includes(seatId)) return newSelectedSeats;
//       if (newSelectedSeats.has(seatId)) {
//         newSelectedSeats.delete(seatId);
//       } else {
//         newSelectedSeats.add(seatId);
//       }

//       return newSelectedSeats;
//     });
//   };

//   //------------------------------------------------------------------------------------------------------------------

//  const getSeatStatus = (seatId: string): "available" | "selected" | "sold" => {
//    console.log(reservedSeats,"reserved Seats")
//    if (reservedSeats.includes(seatId)) return "sold";
//    if (selectedSeats.has(seatId)) return "selected";
//    return "available";
//  };

// const displaySeats = (
//   layout: Seat[][],
//   _reservedSeats: string[],
//   _selectedSeats: Set<string>
// ) => {
//   return layout.map((row, rowIndex) => (
//     <div key={rowIndex} className="flex items-center mb-2">
//       <span className="mr-4 text-white">
//         {String.fromCharCode(65 + rowIndex)}
//       </span>
//       {row.map((seat, colIndex) => {
//         if (!seat) return <div key={colIndex} className="w-8 h-8 mr-2" />;

//         const seatStatus = getSeatStatus(seat.seatId);

//         return (
//           <img
//             key={`${rowIndex}-${colIndex}`}
//             src={seatImg}
//             className={`w-8 h-8 mr-2 ${
//               seatStatus === "selected"
//                 ? "bg-green-500"
//                 : seatStatus === "sold"
//                 ? "bg-red-500 cursor-not-allowed"
//                 : "bg-gray-500 cursor-pointer"
//             }`}
//             alt={`Seat ${seat.seatId}`}
//             onClick={() => {
//               if (seatStatus !== "sold") {
//                 handleSeatClick(seat.seatId);
//               }
//             }}
//           />
//         );
//       })}
//     </div>
//   ));
// };

//   //-------------------------------------Food Modal open-------------------------------------------------------
//   const handleSave = () => {
//     setIsFoodModalOpen(true);
//   };

//   //-------------------------------------Handling the booking section..........................................

//   const handleBooking = async () => {

//     const bookingData = {
//       selectedSeats: Array.from(selectedSeats),
//       selectedItems: Object.keys(selectedItems).map((item) => {
//         const foodItem = snacks.find((f) => f.name === item);
//         return {
//           name: item,
//           price: foodItem?.price ?? 0,
//           quantity: selectedItems[item],
//           image: foodItem?.image ?? "",
//         };
//       }),
//       deliveryOptions: Object.keys(deliveryOptions)
//         .filter((key) => deliveryOptions[key as keyof typeof deliveryOptions])
//         .map((key) => key),
//       totalAmount: calculateTotalPrice(),
//       theaterName: screenData?.theaterId.username ?? "",
//       screenName: screenData?.name ?? "",
//       showTime: startTime,
//       movieName: movie?.title ?? "",
//       movieImage: movie?.posterPath ?? "",
//       show: show ?? "",
//       user: userId ?? "",
//     };

//     console.log(bookingData, "booking data");

//     const stripe = await loadStripe(
//       "pk_test_51PfywdInImkOs26H6WShgcp1Ofw9sDXYIOSVlx8hFLmtD8n0YM85SLqgMsDKf0oNsAKri0g4gwys0iAa7DWkXObn00czgPF6N7"
//     );

//     if (!stripe) {
//       console.error("Stripe failed to load");
//       return;
//     }

//     try {
//       const response = await commonRequest(
//         "POST",
//         "/create-checkout-session",
//         config,
//         bookingData
//       );

//       if (!response.data.success) {
//         throw new Error(
//           `Failed to create checkout session: ${response.statusText}`
//         );
//       }

//       const result = await stripe.redirectToCheckout({
//         sessionId: response.data.id,
//       });

//       if (result.error) {
//         console.error("Stripe checkout failed", result.error.message);
//       } else {
//         setIsFoodModalOpen(false);
//       }
//     } catch (error) {
//       console.error("Booking failed", error);
//     }
//   };

//   //-----------------------------------------Calcuate Total Price---------------------------------------------

//   const calculateTotalPrice = () => {
//     const seatTotal = selectedSeats.size * (screenData?.price ?? 0);
//     const foodTotal = Object.keys(selectedItems).reduce((acc, item) => {
//       const foodItem = snacks.find((f) => f.name === item);
//       return acc + (foodItem?.price ?? 0) * selectedItems[item];
//     }, 0);
//     return (seatTotal + foodTotal).toFixed(2);
//   };

//   //----------------------------------------Seat Number-----------------------------------------------------

//   const getSeatNumber = (rowNumber: number, colNumber: number) => {
//     return `${String.fromCharCode(65 + rowNumber)}-${colNumber + 1}`;
//   };

//   //------------------------------------------Delivery Option-------------------------------------------------

//   const handleDeliveryOptionChange = (option: "start" | "halfTime") => {
//     setDeliveryOptions((prevOptions) => ({
//       ...prevOptions,
//       [option]: !prevOptions[option],
//     }));
//   };

//   //------------------------------------------Handling of Food Items------------------------------------------

//   const handleItemAdd = (item: string) => {
//     setSelectedItems((prev) => ({
//       ...prev,
//       [item]: (prev[item] || 0) + 1,
//     }));
//   };

//   const handleItemRemove = (item: string) => {
//     setSelectedItems((prev) => {
//       const newItems = { ...prev };
//       if (newItems[item] > 0) {
//         newItems[item] -= 1;
//       }
//       if (newItems[item] === 0) {
//         delete newItems[item];
//       }
//       return newItems;
//     });
//   };

//   //------------------------------------------------------------------------------------------------------------
//   if (loading) return <div>Loading...</div>;
//   // if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center py-4">
//       <div className="container mx-auto px-4">
//         {/* Screen Layout */}
//         <div className="flex flex-col items-center justify-center text-white">
//           {layout.length > 0 &&
//             displaySeats(layout, Array.from(selectedSeats), selectedSeats)}

//           <img src={screenImg} className="max-w-full mt-4" alt="Screen" />
//         </div>

//         {/* Screen Data */}
//         {screenData && (
//           <div
//             className="w-full bg-gray-800 text-white rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-start"
//             style={{ minHeight: "150px" }}
//           >
//             {/* Screen Details */}
//             <div className="flex flex-col flex-grow mb-4 md:mb-0 md:mr-4">
//               <h3 className="text-xl font-semibold mb-2">{screenData.name}</h3>
//               <h4 className="text-lg mb-1">
//                 <i className="fa-solid fa-film mr-1"></i> {movie.title}
//               </h4>
//               <h4 className="text-sm mb-1">
//                 <i className="fa-solid fa-tv mr-1"></i> {screenData.quality}
//               </h4>
//               <h4 className="text-sm">
//                 <i className="fa-solid fa-location-dot mr-1"></i>{" "}
//                 {screenData.theaterId.city}
//               </h4>
//             </div>

//             {/* Seats Summary */}
//             <div className="flex flex-col flex-grow mb-4 md:mb-0 md:mx-4 text-center">
//               <h4 className="text-lg font-semibold mb-2">Seats</h4>
//               {Array.from(selectedSeats)
//                 .map((seatId) => {
//                   const rowIndex = layout.findIndex((row) =>
//                     row.some((seat) => seat && seat.seatId === seatId)
//                   );
//                   const colIndex =
//                     rowIndex !== -1 && layout[rowIndex]
//                       ? layout[rowIndex].findIndex(
//                           (seat) => seat && seat.seatId === seatId
//                         )
//                       : undefined;

//                   return rowIndex !== -1 && colIndex !== undefined
//                     ? getSeatNumber(rowIndex, colIndex)
//                     : "";
//                 })
//                 .filter(
//                   (seat, index, self) => seat && self.indexOf(seat) === index
//                 )
//                 .join(", ")}

//               <p className="mb-4">
//                 ₹{(selectedSeats.size * (screenData.price || 0)).toFixed(2)}
//               </p>
//             </div>

//             {/* Snacks Summary */}
//             <div className="flex flex-col flex-grow text-center">
//               <h4 className="text-lg font-semibold mb-2">Snacks</h4>
//               <p className="mb-4">
//                 {Object.keys(selectedItems)
//                   .map((item) => `${item} x${selectedItems[item]}`)
//                   .join(", ")}
//               </p>
//               <p className="mb-4">
//                 ₹
//                 {Object.keys(selectedItems)
//                   .reduce((acc, item) => {
//                     const foodItem = snacks.find((f) => f.name === item);
//                     return acc + (foodItem?.price ?? 0) * selectedItems[item];
//                   }, 0)
//                   .toFixed(2)}
//               </p>
//             </div>

//             {/* Total Summary */}
//             <div className="flex flex-col flex-grow text-center">
//               <h4 className="text-lg font-semibold mb-2">Total</h4>
//               <p className="text-xl font-bold">₹{calculateTotalPrice()}</p>
//               <Button
//                 onClick={handleSave}
//                 className="bg-red-600 text-white hover:bg-red-700 mt-4"
//               >
//                 Proceed to Pay
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Food Modal */}
//       <Modal
//         isOpen={isFoodModalOpen}
//         onClose={() => setIsFoodModalOpen(false)}
//         size="lg"
//         className="bg-black text-white"
//       >
//         <ModalContent>
//           <ModalHeader>
//             <h3 className="text-xl font-semibold">Select Your Snacks</h3>
//           </ModalHeader>
//           <ModalBody>
//             {snacks.length === 0 ? (
//               <div className="text-center text-lg">No snacks available</div>
//             ) : (
//               snacks.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex items-center justify-between mb-4"
//                 >
//                   <div className="flex items-center">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 rounded-full mr-4"
//                     />
//                     <span>{item.name}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       onClick={() => handleItemRemove(item.name)}
//                       className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                     >
//                       -
//                     </button>
//                     <span className="mx-2">
//                       {selectedItems[item.name] || 0}
//                     </span>
//                     <button
//                       onClick={() => handleItemAdd(item.name)}
//                       className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                     >
//                       +
//                     </button>
//                     <span className="ml-4">₹{item.price.toFixed(2)}</span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <div className="flex flex-col md:flex-row md:items-center text-center md:text-left">
//               <span className="mr-2 mb-2 md:mb-0">Delivery Options:</span>
//               <div className="flex flex-col md:flex-row md:items-center">
//                 <Checkbox
//                   checked={deliveryOptions.start}
//                   onChange={() => handleDeliveryOptionChange("start")}
//                   className="mr-4 mb-2 md:mb-0"
//                 >
//                   Start of Show
//                 </Checkbox>
//                 <Checkbox
//                   checked={deliveryOptions.halfTime}
//                   onChange={() => handleDeliveryOptionChange("halfTime")}
//                 >
//                   Half Time
//                 </Checkbox>
//               </div>
//             </div>
//             <Button
//               onClick={handleBooking}
//               className="bg-red-600 text-white hover:bg-red-700 ml-4"
//             >
//               Confirm Booking
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );

// };

// export default ScreenLayoutPage;

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { useParams, useLocation } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config, URL } from "../../../config/constants";
import screenImg from "../../../assets/images/screen.png";
import seatImg from "../../../assets/images/seat.svg";
import {
  Snack,
  TheaterEntity,
} from "../../../interfaces/theater/Theaterinterface";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

interface Seat {
  seatId: string;
  status: "available" | "selected" | "sold";
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
  layout: Seat[][];
}

const ScreenLayoutPage: React.FC = () => {
  const { screenId } = useParams<{ screenId: string }>();
  const [layout, setLayout] = useState<Seat[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);
  const [screenData, setScreenData] = useState<ScreenData | null>(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );
  const [deliveryOptions, setDeliveryOptions] = useState<{
    start: boolean;
    halfTime: boolean;
  }>({ start: false, halfTime: false });
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);

  const userId = user?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${URL}/getUser`, config);
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  console.log(currentUser, "current user");

  const location = useLocation();
  const movie = location.state?.movie;
  const startTime = location.state?.startTime;
  const theaterId = screenData?.theaterId._id;
  const show = location.state?.show;

  const showId = show._id;

  console.log(showId, "show id");

  console.log(screenData, "screen layout ");

  //------------------------------------------Screen ID Layout ------------------------------------------------
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/screens/${screenId}/layout`,
          config
        );
        setScreenData(response.data.screenLayout);
        setLayout(response.data.screenLayout.layout);
      } catch (err) {
        setError("Failed to fetch layout");
      } finally {
        setLoading(false);
      }
    };

    fetchLayout();
  }, [screenId]);

  useEffect(() => {
    const fetchReservation = async (showId: string) => {
      try {
        const response = await commonRequest(
          "GET",
          `/reservations/${showId}`,
          config
        );

        setReservedSeats(response.data.data.reservedSeats);
      } catch (error) {
        console.error("Failed to fetch reservation", error);
        return [];
      }
    };

    fetchReservation(showId);
  }, [showId]);

  //----------------------------------------Fetching Snacks---------------------------------------------------------

  useEffect(() => {
    const fetchSnacks = async () => {
      if (theaterId) {
        try {
          const response = await commonRequest(
            "GET",
            `/theater/get-snacks?theaterId=${theaterId}`,
            config
          );

          console.log(response, "response of snacks");

          setSnacks(response.data.data);
        } catch (error: any) {
          setError("Failed to fetch Snacks");
        }
      }
    };

    fetchSnacks();
  }, [theaterId]);

  //--------------------------------------handling seat click---------------------------------------------------

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = new Set(prevSelectedSeats);

      // Toggle seat selection
      if (reservedSeats.includes(seatId)) return newSelectedSeats;
      if (newSelectedSeats.has(seatId)) {
        newSelectedSeats.delete(seatId);
      } else {
        newSelectedSeats.add(seatId);
      }

      return newSelectedSeats;
    });
  };

  //------------------------------------------------------------------------------------------------------------------

  const getSeatStatus = (seatId: string): "available" | "selected" | "sold" => {
    if (reservedSeats.includes(seatId)) return "sold";
    if (selectedSeats.has(seatId)) return "selected";
    return "available";
  };

  const displaySeats = (
    layout: Seat[][],
    _reservedSeats: string[],
    _selectedSeats: Set<string>
  ) => {
    return layout.map((row, rowIndex) => (
      <div key={rowIndex} className="flex items-center mb-2">
        <span className="mr-4 text-white">
          {String.fromCharCode(65 + rowIndex)}
        </span>
        {row.map((seat, colIndex) => {
          if (!seat) return <div key={colIndex} className="w-8 h-8 mr-2" />;

          const seatStatus = getSeatStatus(seat.seatId);

          return (
            <img
              key={`${rowIndex}-${colIndex}`}
              src={seatImg}
              className={`w-8 h-8 mr-2 ${
                seatStatus === "selected"
                  ? "bg-green-500"
                  : seatStatus === "sold"
                  ? "bg-red-500 cursor-not-allowed"
                  : "bg-gray-500 cursor-pointer"
              }`}
              alt={`Seat ${seat.seatId}`}
              onClick={() => {
                if (seatStatus !== "sold") {
                  handleSeatClick(seat.seatId);
                }
              }}
            />
          );
        })}
      </div>
    ));
  };

  //-------------------------------------Food Modal open-------------------------------------------------------
const handleSave = () => {
  if (selectedSeats.size === 0) {
    toast.error("Please select at least one seat to proceed.");
    return;
  }

  if (snacks.length > 0) {
    setIsFoodModalOpen(true);
  } else {
    setOfferModalOpen(true);
  }
};

  //-------------------------------------Handling the booking section..........................................

  const handleBooking = async (discountedAmount?: number) => {
    const totalPrice = discountedAmount || calculateTotalPrice(); // Use discounted amount if available
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
      deliveryOptions: Object.keys(deliveryOptions)
        .filter((key) => deliveryOptions[key as keyof typeof deliveryOptions])
        .map((key) => key),
      totalAmount: totalPrice, // Use the total amount with discount if applicable
      theaterName: screenData?.theaterId.username ?? "",
      screenName: screenData?.name ?? "",
      showTime: startTime,
      movieName: movie?.title ?? "",
      movieImage: movie?.posterPath ?? "",
      show: show ?? "",
      user: userId ?? "",
    };

    console.log(bookingData, "booking data");

    const stripe = await loadStripe(
      "pk_test_51PfywdInImkOs26H6WShgcp1Ofw9sDXYIOSVlx8hFLmtD8n0YM85SLqgMsDKf0oNsAKri0g4gwys0iAa7DWkXObn00czgPF6N7"
    );

    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    try {
      const response = await commonRequest(
        "POST",
        "/create-checkout-session",
        config,
        bookingData
      );

      if (!response.data.success) {
        throw new Error(
          `Failed to create checkout session: ${response.statusText}`
        );
      }

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error("Stripe checkout failed", result.error.message);
      } else {
        setIsFoodModalOpen(false);
      }
    } catch (error) {
      console.error("Booking failed", error);
    }
  };

  // Function to apply the discount and proceed with booking
  const confirmBookingWithOffer = () => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const discountedAmount = totalPrice * 0.9;

    setOfferModalOpen(false);
    handleBooking(discountedAmount);
  };

  //-----------------------------------------Calcuate Total Price---------------------------------------------

  const calculateTotalPrice = () => {
    const seatTotal = selectedSeats.size * (screenData?.price ?? 0);
    const foodTotal = Object.keys(selectedItems).reduce((acc, item) => {
      const foodItem = snacks.find((f) => f.name === item);
      return acc + (foodItem?.price ?? 0) * selectedItems[item];
    }, 0);
    return (seatTotal + foodTotal).toFixed(2);
  };

  //----------------------------------------Seat Number-----------------------------------------------------

  const getSeatNumber = (rowNumber: number, colNumber: number) => {
    return `${String.fromCharCode(65 + rowNumber)}-${colNumber + 1}`;
  };

  //------------------------------------------Delivery Option-------------------------------------------------

  const handleDeliveryOptionChange = (option: "start" | "halfTime") => {
    setDeliveryOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  //------------------------------------------Handling of Food Items------------------------------------------

  const handleItemAdd = (item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: (prev[item] || 0) + 1,
    }));
  };

  const handleItemRemove = (item: string) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      if (newItems[item] > 0) {
        newItems[item] -= 1;
      }
      if (newItems[item] === 0) {
        delete newItems[item];
      }
      return newItems;
    });
  };

  //------------------------------------------------------------------------------------------------------------
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-black flex w-full justify-center flex-col items-center py-4">
      <div className="container mx-auto px-4">
        {/* Screen Layout */}
        <div className="flex flex-col items-center justify-center text-white">
          {layout.length > 0 &&
            displaySeats(layout, Array.from(selectedSeats), selectedSeats)}

          <img src={screenImg} className="max-w-full mt-4" alt="Screen" />
        </div>

        {/* Screen Data */}
        {screenData && (
          <div
            className="w-full bg-gray-800 text-white rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-start"
            style={{ minHeight: "150px" }}
          >
            {/* Screen Details */}
            <div className="flex flex-col flex-grow mb-4 md:mb-0 md:mr-4">
              <h3 className="text-xl font-semibold mb-2">{screenData.name}</h3>
              <h4 className="text-lg mb-1">
                <i className="fa-solid fa-film mr-1"></i> {movie.title}
              </h4>
              <h4 className="text-sm mb-1">
                <i className="fa-solid fa-tv mr-1"></i> {screenData.quality}
              </h4>
              <h4 className="text-sm">
                <i className="fa-solid fa-location-dot mr-1"></i>{" "}
                {screenData.theaterId.city}
              </h4>
            </div>

            {/* Seats Summary */}
            <div className="flex flex-col flex-grow mb-4 md:mb-0 md:mx-4 text-center">
              <h4 className="text-lg font-semibold mb-2">Seats</h4>
              {Array.from(selectedSeats)
                .map((seatId) => {
                  const rowIndex = layout.findIndex((row) =>
                    row.some((seat) => seat && seat.seatId === seatId)
                  );
                  const colIndex =
                    rowIndex !== -1 && layout[rowIndex]
                      ? layout[rowIndex].findIndex(
                          (seat) => seat && seat.seatId === seatId
                        )
                      : undefined;

                  return rowIndex !== -1 && colIndex !== undefined
                    ? getSeatNumber(rowIndex, colIndex)
                    : "";
                })
                .filter(
                  (seat, index, self) => seat && self.indexOf(seat) === index
                )
                .join(", ")}

              <p className="mb-4">
                ₹{(selectedSeats.size * (screenData.price || 0)).toFixed(2)}
              </p>
            </div>

            {/* Snacks Summary */}
            <div className="flex flex-col flex-grow text-center">
              <h4 className="text-lg font-semibold mb-2">Snacks</h4>
              <p className="mb-4">
                {Object.keys(selectedItems)
                  .map((item) => `${item} x${selectedItems[item]}`)
                  .join(", ")}
              </p>
              <p className="mb-4">
                ₹
                {Object.keys(selectedItems)
                  .reduce((acc, item) => {
                    const foodItem = snacks.find((f) => f.name === item);
                    return acc + (foodItem?.price ?? 0) * selectedItems[item];
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Total Summary */}
            <div className="flex flex-col flex-grow text-center">
              <h4 className="text-lg font-semibold mb-2">Total</h4>
              <p className="text-xl font-bold">₹{calculateTotalPrice()}</p>
              <Button
                onClick={handleSave}
                className="bg-red-600 text-white hover:bg-red-700 mt-4"
              >
                Proceed to Pay
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Food Modal */}
      <Modal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        size="lg"
        className="bg-black text-white  fixed inset-0 flex items-center justify-center"
      >
        <ModalContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalHeader>
            <h3 className="text-xl font-semibold">Select Your Snacks</h3>
          </ModalHeader>
          <ModalBody>
            {snacks.length === 0 ? (
              <div className="text-center text-lg">No snacks available</div>
            ) : (
              snacks.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleItemRemove(item.name)}
                      className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      -
                    </button>
                    <span className="mx-2">
                      {selectedItems[item.name] || 0}
                    </span>
                    <button
                      onClick={() => handleItemAdd(item.name)}
                      className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      +
                    </button>
                    <span className="ml-4">₹{item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-col md:flex-row md:items-center text-center md:text-left">
              <span className="mr-2 mb-2 md:mb-0">Delivery Options:</span>
              <div className="flex flex-col md:flex-row md:items-center">
                <Checkbox
                  checked={deliveryOptions.start}
                  onChange={() => handleDeliveryOptionChange("start")}
                  className="mr-4 mb-2 md:mb-0"
                >
                  Start of Show
                </Checkbox>
                <Checkbox
                  checked={deliveryOptions.halfTime}
                  onChange={() => handleDeliveryOptionChange("halfTime")}
                >
                  Half Time
                </Checkbox>
              </div>
            </div>
            <Button
              onClick={() => {
                if (
                  currentUser.isSubscribed &&
                  currentUser.isSubscribed.status === "active"
                ) {
                  setIsFoodModalOpen(false);
                  setOfferModalOpen(true); // Open the offer modal
                } else {
                  handleBooking(); // Proceed without discount
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 ml-4"
            >
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Offer Modal */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setOfferModalOpen(false)}
        closeButton
        className="bg-black text-white fixed inset-0 flex items-center justify-center"
      >
        <ModalContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalHeader>
            <h2>Special Offer!</h2>
          </ModalHeader>
          <ModalBody>
            <p>You're eligible for a 10% discount on your booking.</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={confirmBookingWithOffer}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Confirm Booking with Discount
            </Button>
            <Button
              onClick={() => setOfferModalOpen(false)}
              className="text-gray-600 hover:bg-gray-200"
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
