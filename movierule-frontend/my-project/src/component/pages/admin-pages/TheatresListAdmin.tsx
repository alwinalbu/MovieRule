import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import { Spinner } from "@nextui-org/react";

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

  const navigate = useNavigate();

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
      await commonRequest("PATCH", `/admin/${id}/change-status`, config, {
        status: newStatus,
      });
      setTheaters((prev) =>
        prev.map((theater) =>
          theater._id === id ? { ...theater, status: newStatus } : theater
        )
      );
    } catch (err) {
      console.error("Failed to update theater status", err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await commonRequest("DELETE", `/admin/${id}/delete-theater`, config);
      setTheaters((prev) => prev.filter((theater) => theater._id !== id));
    } catch (err) {
      console.error("Failed to delete theater", err);
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Theatres List</h1>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Spinner label="Loading theaters..." color="primary" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && theaters.length === 0 && (
          <div className="text-gray-400 text-center py-10">
            No theaters available.
          </div>
        )}

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {theaters.map((theater) => (
            <div
              key={theater._id}
              className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg hover:shadow-red-600/30 transition cursor-pointer"
              onClick={() => navigate(`/admin/theater/${theater._id}`)}
            >
              {/* Profile Picture */}
              <div className="flex justify-center items-center mb-4">
                <img
                  src={theater.profilePicture || "/default-profile.png"}
                  alt={`${theater.username}'s profile`}
                  className="w-28 h-28 rounded-full object-cover border-2 border-gray-700 hover:border-[#E50914] transition"
                />
              </div>

              {/* Info */}
              <div className="text-center mb-3">
                <p className="text-lg font-semibold text-white">
                  {theater.username}
                </p>
                <p className="text-sm text-gray-400">{theater.city || "N/A"}</p>
              </div>

              {/* Status */}
              <div className="text-center mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
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

              {/* Actions */}
              <div className="flex justify-center gap-3">
                {theater.status === "rejected" ? (
                  <button
                    className="px-4 py-1 bg-[#E50914] hover:bg-red-700 rounded text-white text-sm font-bold uppercase tracking-wide"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(theater._id);
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className={`px-4 py-1 rounded text-white text-sm ${
                      theater.status === "blocked"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockUnblock(theater._id, theater.status);
                    }}
                  >
                    {theater.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TheatresList;









