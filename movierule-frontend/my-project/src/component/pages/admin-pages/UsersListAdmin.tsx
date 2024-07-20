import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";

export interface User {
  _id?: string;
  username?: string | null;
  email: string | null;
  profilePicture?: string | null;
  status: string | null;
  city?: string | null;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest("GET", "/admin/get-users", config);
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch users");
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
      await commonRequest("PATCH", `admin/${id}/status`, config, {
        status: newStatus,
      });
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Failed to update user status", err);
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
        <h1 className="text-3xl font-bold mb-6">Users List</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-center items-center mb-2">
                <img
                  src={user.profilePicture || "/default-profile.png"}
                  alt={`${user.username}'s profile`}
                  className="w-30 h-20 rounded-full"
                />
              </div>
              <div className="text-center mb-2">
                <div className="font-bold">{user.username}</div>
                <div>{user.city}</div>
              </div>
              <div className="text-center mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "active"
                      ? "bg-green-500"
                      : user.status === "blocked"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className={`px-4 py-2 rounded ${
                    user.status === "blocked" ? "bg-red-500" : "bg-yellow-500"
                  } text-white`}
                  onClick={() => handleBlockUnblock(user._id, user.status)}
                >
                  {user.status === "blocked" ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UsersList;
