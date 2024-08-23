import React, { useState, useEffect } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import Navbar from "./NavBar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";

interface RefundDetail {
  refundAmount: number;
  refundDate: string;
  movieTitle: string;
  theaterName: string;
  screenName: string;
  showDate: string;
  showTime: string;
  selectedSeats: string[];
}

interface WalletDetails {
  walletBalance: number;
  refunds: RefundDetail[];
}

const WalletPage: React.FC = () => {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?._id;

   
  
  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (!userId) {
        toast.error("User ID is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await commonRequest(
          "GET",
          `/get-wallet/${userId}`,
          config
        );
        setWalletDetails(response.data.data);
      } catch (error) {
        console.error("Failed to fetch wallet details", error);
        toast.error("Failed to fetch wallet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletDetails();
  }, [userId]);

  const renderCell = (refund: RefundDetail, columnKey: string | number) => {
    const key = String(columnKey);

    switch (key) {
      case "refundAmount":
        return `₹${refund.refundAmount.toFixed(2)}`;
      case "refundDate":
        return new Date(refund.refundDate).toLocaleString();
      case "movieTitle":
        return refund.movieTitle || "N/A";
      case "theaterName":
        return refund.theaterName || "N/A";
      case "screenName":
        return refund.screenName || "N/A";
      case "showDate":
        return new Date(refund.showDate).toLocaleDateString();
      case "showTime":
        return refund.showTime || "N/A";
      case "selectedSeats":
        return refund.selectedSeats.join(", ") || "N/A";
      default:
        return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  const columns = [
    { name: "Refund Amount", uid: "refundAmount" },
    { name: "Refund Date", uid: "refundDate" },
    { name: "Movie", uid: "movieTitle" },
    { name: "Theater", uid: "theaterName" },
    { name: "Screen", uid: "screenName" },
    { name: "Show Date", uid: "showDate" },
    { name: "Show Time", uid: "showTime" },
    { name: "Seats", uid: "selectedSeats" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 pt-16 ">
        <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Your Wallet
          </h2>
          <p className="text-lg mb-4 text-white">
            Wallet Balance:{" "}
            <span className="text-green-500">
              ₹{walletDetails?.walletBalance.toFixed(2)}
            </span>
          </p>
          <Table aria-label="Refund History Table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align="start">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={walletDetails?.refunds || []}>
              {(item) => (
                <TableRow key={item.refundDate}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
