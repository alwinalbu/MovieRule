import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { config, URL } from "../../../config/constants";
import { RootState, AppDispatch } from "../../../redux/store";
import { updateTheaterDetails } from "../../../redux/actions/theaters/theaterActions";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
import { waitForCookies } from "../../../utlis/waitForCookies";

export const TheaterProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<any>(undefined);
  const [city, setCity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { theaterOwner, error: reduxError } = useSelector(
    (state: RootState) => state.theater
  );

  // ✅ Fetch current theater details from backend
  useEffect(() => {
    const fetchTheater = async () => {
       await waitForCookies();
      try {
        const { data } = await axios.get(`${URL}/theater/getTheater`, config);
        console.log(data, "✅ Theater data from backend");

        if (data.success) {
          const theater = data.data;
          setUsername(theater.username || "");
          setEmail(theater.email || "");
          setCity(theater.city || "");
          setProfilePicture(theater.profilePicture || "");
        } else {
          toast.error("Failed to load theater data");
        }
      } catch (error) {
        console.error("❌ Error fetching theater:", error);
        toast.error("Failed to fetch theater details");
      }
    };

    fetchTheater();
  }, []);

  useEffect(() => {
    if (reduxError) toast.error(reduxError as string);
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
        city,
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative flex h-screen overflow-hidden bg-black text-white">
      <Toaster />

      {/* Sidebar with slide animation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#141414] shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <TheaterSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Page Content */}
      <div className="flex flex-col w-full transition-all duration-300">
        <div className="bg-[#141414] p-4 flex justify-center items-center shadow-md relative">
          <button
            className="absolute left-4 text-white focus:outline-none"
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

          <h1 className="text-2xl font-bold tracking-wide text-center">
            Theater Profile
          </h1>
        </div>

        <div className="flex-grow p-6 sm:p-8 md:p-12 overflow-y-auto bg-gradient-to-b from-[#141414] to-black">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={
                profilePic
                  ? window.URL.createObjectURL(profilePic)
                  : profilePicture || "/user.png"
              }
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-red-600 shadow-lg"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mt-3 text-sm"
              />
            )}
          </div>

          {/* Edit Button */}
          <div className="flex justify-center sm:justify-end mb-6">
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50 text-sm sm:text-base rounded-md transition"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Form Section */}
          <div className="space-y-5 max-w-2xl mx-auto w-full">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                disabled={!editMode}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md bg-[#1f1f1f] text-white focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-gray-300"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={city}
                disabled={!editMode}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md bg-[#1f1f1f] text-white focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Change Password */}
            {editMode && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    className="mt-1 p-2 w-full border rounded-md bg-[#1f1f1f] text-white focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handleNewPasswordChange}
                    className="mt-1 p-2 w-full border rounded-md bg-[#1f1f1f] text-white focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </>
            )}
          </div>

          {editMode && (
            <div className="mt-8 flex justify-center sm:justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50 rounded font-bold transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

