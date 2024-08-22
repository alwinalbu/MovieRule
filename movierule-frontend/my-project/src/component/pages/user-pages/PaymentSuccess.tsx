
// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";
// import { Link, useLocation } from "react-router-dom";
// import { DotLottiePlayer } from "@dotlottie/react-player";
// import "@dotlottie/react-player/dist/index.css";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import toast from "react-hot-toast";

// const PaymentSuccess: React.FC = () => {
//   const location = useLocation();
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentStatus] = useState<string>("paid");

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const sessionId = queryParams.get("session_id");
//     setSessionId(sessionId);

//     const patchBooking = async () => {
//       if (!sessionId) {
//         setError("No session ID found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Update the booking status
//         const response = await commonRequest(
//           "PATCH",
//           `/bookings/${sessionId}`,
//           config,
//           { paymentStatus: currentStatus }
//         );

//         console.log(response, "response from backend");

//         if (response.status === 200) {
//           toast.success("Booking status updated successfully!");

//           // Handle seat status update
//           const { screenId, userId, selectedSeats } = response.data.booking; 

//           if (screenId && userId) {
//             const seatUpdateResponse = await commonRequest(
//               "PATCH",
//               `/screens/${screenId}/book`,
//               config,
//               {
//                 selectedSeats,
//                 userId,
//               }
//             );

//             console.log(seatUpdateResponse, "response of seat status updated");
//             if (seatUpdateResponse.status === 200) {
//               toast.success("Seats updated successfully!");
//             } else {
//               throw new Error("Failed to update seats.");
//             }
//           }
//         } else {
//           throw new Error("Failed to update booking status.");
//         }
//       } catch (error: any) {
//         console.error("Error updating booking status:", error);
//         toast.error("Failed to update booking status. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     patchBooking();
//   }, [location.search, currentStatus]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-screen flex justify-center items-center">{error}</div>
//     );
//   }

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <Card className="max-w-[400px] w-full mx-4 shadow-lg">
//         <CardHeader className="flex flex-col items-center p-4 bg-white rounded-t-md">
//           <DotLottiePlayer
//             src="https://lottie.host/e6708c1b-b13f-4996-b04c-c75831eb3b01/4AuYKnw9y9.json"
//             loop
//             autoplay
//             className="w-32 h-32"
//           />
//           <div className="flex flex-col gap-2 mt-4">
//             <p className="text-xl font-semibold text-center text-gray-800">
//               Payment Successful
//             </p>
//             <p className="text-sm text-center text-gray-600">
//               Thank you for choosing MOVIERULE! <br /> We hope you enjoy your
//               movie experience.
//             </p>
//           </div>
//         </CardHeader>
//         <Divider />
//         <CardFooter className="flex justify-center items-center p-4 bg-white rounded-b-md">
//           <Link
//             to="/tickets"
//             className="text-primary font-semibold hover:underline"
//           >
//             See your Ticket Details
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default PaymentSuccess;





import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast from "react-hot-toast";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus] = useState<string>("paid");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    setSessionId(sessionId);

    const patchBooking = async () => {
      if (!sessionId) {
        setError("No session ID found.");
        setLoading(false);
        return;
      }

      try {
        // Update the booking status
        const response = await commonRequest(
          "PATCH",
          `/bookings/${sessionId}`,
          config,
          { paymentStatus: currentStatus }
        );

        console.log(response, "response from backend");

        if (response.status === 200) {
          toast.success("Booking status updated successfully!");

          // Handle seat status update
          // const { screenId, userId, selectedSeats } = response.data.booking;

          // if (screenId && userId) {
          //   const seatUpdateResponse = await commonRequest(
          //     "PATCH",
          //     `/screens/${screenId}/book`,
          //     config,
          //     {
          //       selectedSeats,
          //       userId,
          //     }
          //   );

          //   console.log(seatUpdateResponse, "response of seat status updated");
          //   if (seatUpdateResponse.status === 200) {
          //     toast.success("Seats updated successfully!");
          //   } else {
          //     throw new Error("Failed to update seats.");
          //   }
          // }
        } else {
          throw new Error("Failed to update booking status.");
        }
      } catch (error: any) {
        console.error("Error updating booking status:", error);
        toast.error("Failed to update booking status. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    patchBooking();
  }, [location.search, currentStatus]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">{error}</div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="max-w-[400px] w-full mx-4 shadow-lg">
        <CardHeader className="flex flex-col items-center p-4 bg-white rounded-t-md">
          <DotLottiePlayer
            src="https://lottie.host/e6708c1b-b13f-4996-b04c-c75831eb3b01/4AuYKnw9y9.json"
            loop
            autoplay
            className="w-32 h-32"
          />
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xl font-semibold text-center text-gray-800">
              Payment Successful
            </p>
            <p className="text-sm text-center text-gray-600">
              Thank you for choosing MOVIERULE! <br /> We hope you enjoy your
              movie experience.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-center items-center p-4 bg-white rounded-b-md">
          <Link
            to="/tickets"
            className="text-primary font-semibold hover:underline"
          >
            See your Ticket Details
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;



