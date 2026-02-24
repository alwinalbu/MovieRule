
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast from "react-hot-toast";

const SubscriptionSuccess: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract userId from the URL query parameters
  const userId = new URLSearchParams(location.search).get("user_id");

  console.log(userId, "user id from URL");

  const updateSubscription = async () => {
    try {
      const body = {
        isSubscribed: {
          status: "active",
          paymentStatus: "paid",
        },
      };

      const response = await commonRequest(
        "PATCH",
        `/users/${userId}/subscription`,
        config,
        body
      );

      console.log(response, "response from backend");

      if (response.status === 200) {
        toast.success("Subscription activated successfully!");
      } else {
        throw new Error("Failed to activate subscription.");
      }
    } catch (error: any) {
      console.error("Error updating subscription:", error);
      toast.error("Failed to activate subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      updateSubscription();
    } else {
      setError("User ID is missing in the URL.");
      setLoading(false);
    }
  }, [location.search, userId]);

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
              Subscription Successful
            </p>
            <p className="text-sm text-center text-gray-600">
              Thank you for subscribing to MOVIERULE! <br /> Enjoy your
              exclusive content.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-center items-center p-4 bg-white rounded-b-md">
          <Link
            to="/stream-library-plan"
            className="text-primary font-semibold hover:underline"
          >
            Stream Movies
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;

