import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import toast, { Toaster } from "react-hot-toast";

const TheaterDetailsPage: React.FC = () => {
  const { theaterId } = useParams<{ theaterId: string }>();
  const navigate = useNavigate();
  const [theater, setTheater] = useState<TheaterEntity | null>(null);

  const [isProfilePictureOpen, setProfilePictureOpen] = useState(false);
  const [isAadhaarCardOpen, setAadhaarCardOpen] = useState(false);
  const [isLicenseDocumentOpen, setLicenseDocumentOpen] = useState(false);

  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const fetchTheaterDetails = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/admin/get-theater/${theaterId}`,
          config
        );
        setTheater(response.data.data);
      } catch (error) {
        console.error("Failed to fetch theater details:", error);
      }
    };
    fetchTheaterDetails();
  }, [theaterId]);

  const handleAccept = async () => {
    if (!theater) return;
    try {
      await commonRequest(
        "PATCH",
        `/admin/${theater._id}/accept-theater`,
        config,
        { status: "active" }
      );

      setTheater({ ...theater, status: "active" });
      setAcceptModalOpen(false);
      toast.success("Theater accepted successfully");
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.error("Failed to accept the theater:", error);
      toast.error("Failed to accept the theater");
    }
  };

  const handleReject = async () => {
    if (!theater) return;
    try {
      await commonRequest(
        "PATCH",
        `/admin/${theater._id}/accept-theater`,
        config,
        { status: "rejected", comments: rejectReason }
      );

      setTheater({ ...theater, status: "rejected", comments: rejectReason });
      setRejectModalOpen(false);
      toast.success("Theater rejected successfully");
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.error("Failed to reject the theater:", error);
      toast.error("Failed to reject the theater");
    }
  };

  if (!theater) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#141414]">
        <Spinner label="Loading theater details..." color="primary" />
      </div>
    );
  }

  return (
    <div className="bg-[#141414] text-white min-h-screen flex justify-center items-center p-6">
      <Toaster />
      <Card className="w-full max-w-5xl bg-[#1c1c1c] rounded-xl shadow-lg p-8 hover:shadow-red-600/30 transition">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-white tracking-wide mb-4">
          {theater.username || "Theater"} Details
        </h2>

        {/* Status Badge */}
        <div className="mb-8">
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide ${
              theater.status === "active"
                ? "bg-green-600 text-white"
                : theater.status === "blocked"
                ? "bg-[#E50914] text-white"
                : theater.status === "rejected"
                ? "bg-yellow-400 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {theater.status?.toUpperCase() || "PENDING"}
          </span>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Image
            src={theater.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="cursor-pointer rounded-lg border border-gray-700 hover:border-[#E50914] hover:scale-105 transition"
            onClick={() => setProfilePictureOpen(true)}
          />
          <Image
            src={theater.aadhaarCard || "/default-profile.png"}
            alt="Aadhaar Card"
            className="cursor-pointer rounded-lg border border-gray-700 hover:border-[#E50914] hover:scale-105 transition"
            onClick={() => setAadhaarCardOpen(true)}
          />
          <Image
            src={theater.licenseDocument || "/default-profile.png"}
            alt="License Document"
            className="cursor-pointer rounded-lg border border-gray-700 hover:border-[#E50914] hover:scale-105 transition"
            onClick={() => setLicenseDocumentOpen(true)}
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input readOnly label="Username" value={theater.username || "N/A"} />
          <Input readOnly label="Email" value={theater.email || "N/A"} />
          <Input
            readOnly
            label="Owner Name"
            value={theater.OwnerName || "N/A"}
          />
          <Input readOnly label="Address" value={theater.address || "N/A"} />
          <Input readOnly label="City" value={theater.city || "N/A"} />
          <Input readOnly label="State" value={theater.state || "N/A"} />
          <Input readOnly label="Zip Code" value={theater.zipCode || "N/A"} />
          <Input readOnly label="Phone" value={theater.phone || "N/A"} />
          <Input readOnly label="Role" value={theater.role || "N/A"} />
          <Input readOnly label="Status" value={theater.status || "N/A"} />
          <Input readOnly label="Comments" value={theater.comments || "N/A"} />
        </div>

        {/* Action Buttons - Only show if status is pending */}
        {theater.status !== "active" && theater.status !== "rejected" && (
          <div className="mt-8 flex gap-6 justify-end">
            <Button
              className="px-6 font-bold bg-green-600 hover:bg-green-700 text-white uppercase tracking-wide"
              onClick={() => setAcceptModalOpen(true)}
            >
              Accept
            </Button>
            <Button
              className="px-6 font-bold bg-[#E50914] hover:bg-red-700 text-white uppercase tracking-wide"
              onClick={() => setRejectModalOpen(true)}
            >
              Reject
            </Button>
          </div>
        )}
      </Card>

      {/* Profile Picture Modal */}
      <Modal
        isOpen={isProfilePictureOpen}
        onClose={() => setProfilePictureOpen(false)}
      >
        <ModalContent>
          <ModalBody>
            <Image
              src={theater.profilePicture || ""}
              alt="Profile"
              className="w-full h-auto"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Aadhaar Modal */}
      <Modal
        isOpen={isAadhaarCardOpen}
        onClose={() => setAadhaarCardOpen(false)}
      >
        <ModalContent>
          <ModalBody>
            <Image
              src={theater.aadhaarCard || ""}
              alt="Aadhaar Card"
              className="w-full h-auto"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* License Modal */}
      <Modal
        isOpen={isLicenseDocumentOpen}
        onClose={() => setLicenseDocumentOpen(false)}
      >
        <ModalContent>
          <ModalBody>
            <Image
              src={theater.licenseDocument || ""}
              alt="License Document"
              className="w-full h-auto"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Accept Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Acceptance</ModalHeader>
          <ModalBody>
            Are you sure you want to <b>ACCEPT</b> this theater?
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-5 font-bold"
              onClick={handleAccept}
            >
              Yes
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white px-5"
              onClick={() => setAcceptModalOpen(false)}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reject Modal */}
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
            <Button
              className="bg-[#E50914] hover:bg-red-700 text-white px-5 font-bold"
              onClick={handleReject}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white px-5"
              onClick={() => setRejectModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TheaterDetailsPage;
