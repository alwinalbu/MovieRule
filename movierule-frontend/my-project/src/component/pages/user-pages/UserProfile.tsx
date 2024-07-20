// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AppDispatch } from "../../../redux/store";
// import {
//   updateUserDetails,
//   logout,
// } from "../../../redux/actions/user/userActions";
// import "tailwindcss/tailwind.css";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";

// const UserProfile: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [profilePic, setProfilePic] = useState<File | null>(null);
//   const [profilePicture, setProfilePicture] = useState<any>(undefined);
//   const [editMode, setEditMode] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);


//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   const { user,error:reduxError } = useSelector((state: RootState) => state.user);

//   console.log(user, "user details inside the user profile");

//   // Initialize user details when component mounts
//   useEffect(() => {
//     if (user) {
//       setUsername(user.username || "");
//       setEmail(user.email || "");
//       setProfilePicture(user.profilePicture); // Assuming profilePicture is stored as URL string
//     }
//   }, [user]);

//    useEffect(() => {
//      if (reduxError) {
//        toast.error(reduxError as string);
//      }
//    }, [reduxError]);



//   const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setOldPassword(e.target.value);
//   };

//   const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setProfilePic(e.target.files[0]);
//     }
//   };

//   const handleSave = () => {
//     dispatch(
//       updateUserDetails({
//         userId: user?._id,
//         username,
//         email,
//         oldPassword,
//         password,
//         profilePic,
//       })
//     ).then((res) => {
//       if (res.type && res.type.endsWith("fulfilled")) {
//         toast.success("Profile updated successfully");
//       } else {
//         toast.error("Failed to update profile");
//       }
//     });

//     setEditMode(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//      dispatch(logout());
//      closeMenu();
//      Swal.fire({
//        icon: "success",
//        title: "Logged out successfully!",
//        showConfirmButton: false,
//        timer: 1500,
//      }).then(() => {
//        navigate("/");
//      });
    
//   };

//    const handleLogoClick = () => {
//      if (user) {
//        navigate("/homepage");
//      }
//    };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
//       <header className="relative">
//         <Toaster />
//         <div className="absolute top-4 left-4">
//           <img
//             src="/src/assets/logo-new.png"
//             alt="Logo"
//             className="w-15 h-10 cursor-pointer"
//             onClick={handleLogoClick}
//           />
//         </div>
//         <div className="absolute top-4 right-4 flex items-center space-x-4">
//           <div className="text-right">
//             <h1 className="text-lg font-bold">{user?.username}</h1>
//             <p className="text-sm">{user?.email}</p>
//           </div>
//           <img
//             src={user?.profilePicture || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-12 h-12 rounded-full"
//             onClick={toggleMenu}
//           />
//         </div>
//       </header>
//       {isMenuOpen && (
//         <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 rounded-lg shadow-lg z-10 p-4">
//           <button
//             className="absolute top-2 right-2 text-white"
//             onClick={closeMenu}
//           >
//             &times;
//           </button>
//           <div className="flex flex-col items-center mt-8">
//             <img
//               src={user?.profilePicture || "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full"
//             />
//             <h1 className="mt-4 text-lg font-bold">{user?.username}</h1>
//             <p className="text-sm">{user?.email}</p>
//           </div>
//           <ul className="mt-8 space-y-4">
//             <li>
//               <NavLink
//                 to="/profile"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Personal Info
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/tickets"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Tickets
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/payment-method"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Payment Method
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/stream-library-plan"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Stream Library/Plan
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/chat"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Chat
//               </NavLink>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded-lg"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//       <div className="flex-1 p-8">
//         {/* Profile Picture */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={
//               profilePic
//                 ? URL.createObjectURL(profilePic)
//                 : profilePicture || "https://via.placeholder.com/150"
//             }
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover"
//           />
//         </div>

//         {/* Profile Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">User Profile</h1>
//           <button
//             onClick={() => setEditMode(!editMode)}
//             className="p-2 bg-blue-500 text-white rounded-md"
//           >
//             {editMode ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Username */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             type="text"
//             value={username}
//             disabled={!editMode}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 w-full border rounded-md text-black"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             disabled
//             className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
//           />
//         </div>

//         {/* Change Password */}
//         {editMode && (
//           <>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Old Password
//               </label>
//               <input
//                 type="password"
//                 value={oldPassword}
//                 onChange={handleOldPasswordChange}
//                 className="mt-1 p-2 w-full border rounded-md text-black"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={handleNewPasswordChange}
//                 className="mt-1 p-2 w-full border rounded-md text-black"
//               />
//             </div>
//           </>
//         )}

//         {/* Profile Picture Upload */}
//         {editMode && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Profile Picture
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleProfilePicChange}
//               className="mt-1 p-2 w-full border rounded-md"
//             />
//           </div>
//         )}

//         {/* Save Changes Button */}
//         {editMode && (
//           <button
//             onClick={handleSave}
//             className="mt-4 p-2 bg-blue-500 text-white rounded-md"
//           >
//             Save Changes
//           </button>
//         )}

//         {/* Additional Buttons */}
//         <div className="mt-6">
//           <button className="mt-2 p-2 bg-gray-500 text-white rounded-md w-full">
//             View Tickets
//           </button>
//           <button className="mt-2 p-2 bg-gray-500 text-white rounded-md w-full">
//             View Upcoming Movies
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import {
  updateUserDetails,
  logout,
} from "../../../redux/actions/user/userActions";
import "tailwindcss/tailwind.css";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<any>(undefined);
  const [city, setCity] = useState<string>(""); // Added city state
  const [editMode, setEditMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, error: reduxError } = useSelector(
    (state: RootState) => state.user
  );

  // Initialize user details when component mounts
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setCity(user.city || ""); // Initialize city
      setProfilePicture(user.profilePicture); // Assuming profilePicture is stored as URL string
    }
  }, [user]);

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
      updateUserDetails({
        userId: user?._id,
        username,
        email,
        city, // Include city in update
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/homepage");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="relative">
        <Toaster />
        <div className="absolute top-4 left-4">
          <img
            src="/src/assets/logo-new.png"
            alt="Logo"
            className="w-15 h-10 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="text-right">
            <h1 className="text-lg font-bold">{user?.username}</h1>
            <p className="text-sm">{user?.email}</p>
          </div>
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
            onClick={toggleMenu}
          />
        </div>
      </header>
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 rounded-lg shadow-lg z-10 p-4">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={closeMenu}
          >
            &times;
          </button>
          <div className="flex flex-col items-center mt-8">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold">{user?.username}</h1>
            <p className="text-sm">{user?.email}</p>
          </div>
          <ul className="mt-8 space-y-4">
            <li>
              <NavLink
                to="/profile"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Personal Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payment-method"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Payment Method
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stream-library-plan"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Stream Library/Plan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Chat
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
      <div className="flex-1 p-8">
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
          <h1 className="text-2xl font-bold">User Profile</h1>
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
            className="mt-1 p-2 w-full border rounded-md text-black"
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
            className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={city}
            disabled={!editMode}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
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
                className="mt-1 p-2 w-full border rounded-md text-black"
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
                className="mt-1 p-2 w-full border rounded-md text-black"
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
            View Upcoming Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

