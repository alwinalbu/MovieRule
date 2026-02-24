import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { EyeIcon } from "../../icons/EyeIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";

export interface User {
  _id?: string;
  username?: string | null;
  email: string | null;
  profilePicture?: string | null;
  status: "active" | "blocked" | "pending" | string;
  city?: string | null;
}

type ChipColor =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "primary"
  | "secondary";

const statusColorMap: Record<User["status"], ChipColor> = {
  active: "success",
  blocked: "danger",
  pending: "warning",
};

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
    status: User["status"]
  ) => {
    const newStatus = status === "blocked" ? "active" : "blocked";
    try {
      await commonRequest("PATCH", `admin/${id}/status`, config, {
        status: newStatus,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Failed to update user status", err);
    }
  };

  const renderCell = (user: User, columnKey: string | number) => {
    const key = String(columnKey);

    if (key === "username") {
      return (
        <div className="flex items-center">
          <img
            src={user.profilePicture || "/default-profile.png"}
            alt={`${user.username || "User"} profile`}
            className="w-10 h-10 rounded-full border border-gray-700 hover:border-[#E50914] transition"
          />
          <div className="ml-2">
            <p className="text-sm font-semibold text-white">
              {user.username || "N/A"}
            </p>
            <p className="text-xs text-gray-400">{user.email || "N/A"}</p>
          </div>
        </div>
      );
    }

    if (key === "city") {
      return (
        <p className="text-sm text-gray-300">{user.city || "Not Provided"}</p>
      );
    }

    if (key === "status") {
      const chipColor =
        statusColorMap[user.status as keyof typeof statusColorMap] || "default";
      return (
        <Chip className="capitalize" color={chipColor} size="sm" variant="flat">
          {user.status || "Unknown"}
        </Chip>
      );
    }

    if (key === "actions") {
      return (
        <div className="flex items-center gap-3">
          <Tooltip content="Details">
            <span className="text-lg text-gray-400 cursor-pointer hover:text-[#E50914] transition">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-gray-400 cursor-pointer hover:text-[#E50914] transition">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-red-500 cursor-pointer hover:text-red-700 transition">
              <DeleteIcon />
            </span>
          </Tooltip>
          <Tooltip
            content={user.status === "blocked" ? "Unblock user" : "Block user"}
          >
            <span
              className={`text-xs font-bold cursor-pointer px-3 py-1 rounded transition ${
                user.status === "blocked"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-[#E50914] hover:bg-red-700 text-white"
              }`}
              onClick={() => handleBlockUnblock(user._id, user.status)}
            >
              {user.status === "blocked" ? "Unblock" : "Block"}
            </span>
          </Tooltip>
        </div>
      );
    }

    return "N/A";
  };

  const columns = [
    { name: "Name", uid: "username" },
    { name: "City", uid: "city" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Users List</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner label="Loading users..." color="primary" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-gray-400 text-center py-10">No users found.</div>
        ) : (
          <div className="overflow-x-auto bg-[#1c1c1c] rounded-lg shadow-lg">
            <Table
              aria-label="Users Table"
              removeWrapper
              classNames={{
                th: "bg-[#1c1c1c] text-gray-300 font-semibold uppercase tracking-wide",
                td: "bg-[#1c1c1c] text-white",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersList;




