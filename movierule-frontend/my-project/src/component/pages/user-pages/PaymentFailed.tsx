import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const PaymentFailed: React.FC = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    setSessionId(sessionId);
  }, [location.search]);

  console.log(sessionId);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="max-w-[400px] w-full mx-4 shadow-lg">
        <CardHeader className="flex flex-col items-center p-4 bg-white rounded-t-md">
          <DotLottiePlayer
            src="https://lottie.host/770c089d-2503-4f6b-9fb5-c2272badb1aa/bomif3LSTd.lottie"
            loop
            autoplay
            className="w-32 h-32"
          />
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xl font-semibold text-center text-gray-800">
              Payment Failed
            </p>
            <p className="text-sm text-center text-gray-600">
              Unfortunately, your payment could not be processed. <br /> Please
              try again or contact support.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-center items-center p-4 bg-white rounded-b-md">
          <Link
            to="/homepage"
            className="text-primary font-semibold hover:underline"
          >
            Return to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentFailed;
