
import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import Modal from "react-modal";

export interface Theater {
  _id?: string;
  username?: string | null;
  email: string | null;
  profilePicture?: string | null;
  status: string | null;
  city?: string | null;
}

const TheatresList: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          "/admin/get-theaters",
          config
        );
        setTheaters(response.data.data);
      } catch (err) {
        setError("Failed to fetch theaters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBlockUnblock = async (
    id: string | undefined,
    status: string | null
  ) => {
    const newStatus = status === "blocked" ? "active" : "blocked";
    try {
      await commonRequest("PATCH", `/theater/${id}/status`, config, {
        status: newStatus,
      });
      setTheaters(
        theaters.map((theater) =>
          theater._id === id ? { ...theater, status: newStatus } : theater
        )
      );
    } catch (err) {
      console.error("Failed to update theater status", err);
    }
  };

  const handleAccept = async () => {
    if (selectedTheater?._id) {
      try {
        await commonRequest(
          "PATCH",
          `/admin/${selectedTheater._id}/accept-theater`,
          config,
          {
            status: "active",
          }
        );
        setTheaters(
          theaters.map((theater) =>
            theater._id === selectedTheater._id
              ? { ...theater, status: "active" }
              : theater
          )
        );
        setIsModalOpen(false); 
      } catch (err) {
        console.error("Failed to accept theater", err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Theatres List</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {theaters.map((theater) => (
            <div key={theater._id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-center items-center mb-2">
                <img
                  src={theater.profilePicture || "/default-profile.png"}
                  alt={`${theater.username}'s profile`}
                  className="w-30 h-20 rounded-full"
                />
              </div>
              <div className="text-center mb-2">
                <div className="font-bold">{theater.username}</div>
                <div>{theater.city}</div>
              </div>
              <div className="text-center mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    theater.status === "active"
                      ? "bg-green-500"
                      : theater.status === "blocked"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {theater.status}
                </span>
              </div>
              <div className="flex justify-center items-center">
                {theater.status === "pending" && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      setSelectedTheater(theater);
                      setIsModalOpen(true);
                    }}
                  >
                    Accept
                  </button>
                )}
                <button
                  className={`px-4 py-2 rounded ${
                    theater.status === "blocked"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  } text-white`}
                  onClick={() =>
                    handleBlockUnblock(theater._id, theater.status)
                  }
                >
                  {theater.status === "blocked" ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Accept Theater"
        className="bg-gray-800 p-4 rounded-lg text-white max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
        ariaHideApp={false} // Disable hiding the app
      >
        <h2 className="text-xl mb-4">Accept Theater</h2>
        <p>
          Are you sure you want to accept the theater "
          {selectedTheater?.username}"?
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TheatresList;
