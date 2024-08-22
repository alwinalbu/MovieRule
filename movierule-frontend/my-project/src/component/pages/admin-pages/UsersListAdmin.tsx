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
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Failed to update user status", err);
    }
  };

  const renderCell = (user: User, columnKey: string | number) => {
    const key = String(columnKey);
    const cellValue = user[key as keyof User];

    switch (key) {
      case "username":
        return (
          <div className="flex items-center">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt={`${user.username}'s profile`}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p className="text-sm text-gray-500">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        );
      case "city":
         return (
           <div className="flex flex-col">
             <p className="text-sm text-gray-500">{user.city}</p>
           </div>
         );
      case "status":
        const chipColor =
          statusColorMap[user.status as keyof typeof statusColorMap] ||
          "default";
        return (
          <Chip
            className="capitalize"
            color={chipColor}
            size="sm"
            variant="flat"
          >
            {cellValue || "Unknown"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
              <Tooltip
                content={
                  user.status === "blocked" ? "Unblock user" : "Block user"
                }
              >
                <span
                  className={`text-lg cursor-pointer ${
                    user.status === "blocked" ? "text-success" : "text-danger"
                  }`}
                  onClick={() => handleBlockUnblock(user._id, user.status)}
                >
                  {user.status === "blocked" ? "Unblock" : "Block"}
                </span>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { name: "Name", uid: "username" },
    { name: "City", uid: "city" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <div className="bg-black min-h-screen text-white ">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Users List</h1>
        <Table
          aria-label="Example table with custom cells"
          
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
      </main>
    </div>
  );
};

export default UsersList;

