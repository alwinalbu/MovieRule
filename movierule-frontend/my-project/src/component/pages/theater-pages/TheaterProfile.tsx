
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { RootState, AppDispatch } from "../../../redux/store";
import { updateTheaterDetails } from "../../../redux/actions/theaters/theaterActions";

export const TheaterProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<any>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  

  const dispatch = useDispatch<AppDispatch>();
 const { theaterOwner, error: reduxError } = useSelector(
   (state: RootState) => state.theater
 );

  
  useEffect(() => {
    if (theaterOwner) {
      setUsername(theaterOwner.username || "");
      setEmail(theaterOwner.email || "");
      setProfilePicture(theaterOwner.profilePicture); 
    }
  }, [theaterOwner]);

 useEffect(() => {
   if (reduxError) {
     toast.error(reduxError as string);
   }
 }, [reduxError]);
 
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSave = () => {
      dispatch(
        updateTheaterDetails({
          theaterId: theaterOwner?._id,
          username,
          email,
          oldPassword,
          password,
          profilePic,
        })
      ).then((res) => {
        if (res.type && res.type.endsWith("fulfilled")) {
          toast.success("Profile updated successfully");
        } else {
          toast.error("Failed to update profile");
        }
      });
    setEditMode(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster />
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform transition-transform ease-in-out duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2">
            <NavLink className="hover:underline" to="/theater/dashboard">
              Home
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink className="hover:underline" to="/theater/tickets">
              View Tickets
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink className="hover:underline" to="/theater/movies">
              Manage Movies
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink className="hover:underline" to="/theater/settings">
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Page Content */}
      <div className="flex flex-col w-full">
        {/* Top Navigation */}
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Theater Profile</h1>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8 overflow-y-auto">
          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : profilePicture || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* Profile Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Theater Profile</h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              disabled={!editMode}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
          </div>

          {/* Change Password */}
          {editMode && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handleNewPasswordChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}

          {/* Profile Picture Upload */}
          {editMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          )}

          {/* Save Changes Button */}
          {editMode && (
            <button
              onClick={handleSave}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Save Changes
            </button>
          )}

          {/* Additional Buttons */}
          <div className="mt-6">
            <button className="mt-2 p-2 bg-gray-500 text-white rounded-md w-full">
              View Tickets
            </button>
            <button className="mt-2 p-2 bg-gray-500 text-white rounded-md w-full">
              Manage Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

