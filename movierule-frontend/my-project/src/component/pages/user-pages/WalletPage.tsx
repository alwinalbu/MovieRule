import React, { useEffect, useState } from "react";
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
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white text-xl">
        Loading your wallet...
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
      <div className="min-h-screen bg-gray-950 pt-20 px-4 sm:px-6 lg:px-10 text-white">
        <div className="max-w-6xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl p-6">
          {/* Wallet Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-3xl font-bold text-red-500">My Wallet</h2>
            <p className="text-lg mt-3 sm:mt-0">
              Balance:{" "}
              <span className="text-green-400 font-semibold">
                ₹{walletDetails?.walletBalance.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Refund History Table */}
          {walletDetails?.refunds?.length ? (
            <Table
              aria-label="Refund History Table"
              className="rounded-lg overflow-hidden"
              removeWrapper
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align="start"
                    className="text-white bg-gray-800"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={walletDetails?.refunds || []}>
                {(item) => (
                  <TableRow
                    key={item.refundDate}
                    className="hover:bg-gray-800/60"
                  >
                    {(columnKey) => (
                      <TableCell className="text-sm text-gray-200">
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-400 text-center py-6">
              No refund history available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletPage;

