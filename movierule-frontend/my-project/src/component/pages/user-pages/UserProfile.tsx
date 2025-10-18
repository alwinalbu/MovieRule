import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { updateUserDetails } from "../../../redux/actions/user/userActions";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./NavBar";
import axios from "axios";
import { config, URL } from "../../../config/constants";


const UserProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<any>(undefined);
  const [city, setCity] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, error: reduxError } = useSelector(
    (state: RootState) => state.user
  );

  console.log(user, "user inside the userprofile");

  // ✅ Fetch full user details once when profile loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${URL}/getUser`, config);

        console.log(data, "✅ Full user data from backend");

        // Set user details from backend
        setUsername(data.username || "");
        setEmail(data.email || "");
        setCity(data.city || "");
        setProfilePicture(data.profilePicture || "");
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        toast.error("Failed to fetch user details");
      }
    };

    fetchUser();
  }, []);

  // Redux error handling
  useEffect(() => {
    if (reduxError) toast.error(reduxError as string);
  }, [reduxError]);

  const handleSave = () => {
    dispatch(
      updateUserDetails({
        userId: user?._id,
        username,
        email,
        city,
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Toaster />
      <Navbar />

      {/* Main content wrapper */}
      <div className="flex-1 flex justify-center items-start p-6 mt-16">
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                profilePic
                  ? window.URL.createObjectURL(profilePic) // 👈 use `window.URL` explicitly
                  : profilePicture || "/user.png"
              }
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-red-600 shadow-md hover:scale-105 transition-transform"
            />

            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && setProfilePic(e.target.files[0])
                }
                className="mt-3 text-sm"
              />
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition text-sm sm:text-base"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400">Username</label>
              <input
                type="text"
                value={username}
                disabled={!editMode}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 p-2 w-full rounded bg-gray-800 text-white text-sm sm:text-base ${
                  editMode ? "border border-gray-600" : "cursor-not-allowed"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="mt-1 p-2 w-full rounded bg-gray-700 text-gray-400 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-gray-400">City</label>
              <input
                type="text"
                value={city}
                disabled={!editMode}
                onChange={(e) => setCity(e.target.value)}
                className={`mt-1 p-2 w-full rounded bg-gray-800 text-white text-sm sm:text-base ${
                  editMode ? "border border-gray-600" : "cursor-not-allowed"
                }`}
              />
            </div>

            {/* Passwords */}
            {editMode && (
              <>
                <div>
                  <label className="block text-sm text-gray-400">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 p-2 w-full rounded bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full rounded bg-gray-800 text-white border border-gray-600 text-sm sm:text-base"
                  />
                </div>
              </>
            )}
          </div>

          {/* Save button */}
          {editMode && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-bold transition text-sm sm:text-base"
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

export default UserProfile;
