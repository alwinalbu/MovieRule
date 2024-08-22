
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import AdminSidebar from "../../AdminSidePanal/AdminSidebar";

// export interface Theater {
//   _id?: string;
//   username?: string | null;
//   email: string | null;
//   profilePicture?: string | null;
//   status: string | null;
//   city?: string | null;
// }

// const TheatresList: React.FC = () => {
//   const [theaters, setTheaters] = useState<Theater[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await commonRequest("GET","/admin/get-theaters",config);
//         setTheaters(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch theaters");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBlockUnblock = async (
//     id: string | undefined,
//     status: string | null
//   ) => {
//     const newStatus = status === "blocked" ? "active" : "blocked";
//     try {
//       await commonRequest("PATCH", `/admin/${id}/change-status`, config, {
//         status: newStatus,
//       });
//       setTheaters(
//         theaters.map((theater) =>
//           theater._id === id ? { ...theater, status: newStatus } : theater
//         )
//       );
//     } catch (err) {
//       console.error("Failed to update theater status", err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <AdminSidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6">Theatres List</h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {theaters.map((theater) => (
//             <div
//               key={theater._id}
//               className="bg-gray-800 rounded-lg p-4 cursor-pointer"
//               onClick={() => navigate(`/admin/theater/${theater._id}`)} 
//             >
//               <div className="flex justify-center items-center mb-2">
//                 <img
//                   src={theater.profilePicture || "/default-profile.png"}
//                   alt={`${theater.username}'s profile`}
//                   className="w-30 h-20 rounded-full"
//                 />
//               </div>
//               <div className="text-center mb-2">
//                 <div className="font-bold">{theater.username}</div>
//                 <div>{theater.city}</div>
//               </div>
//               <div className="text-center mb-2">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     theater.status === "active"
//                       ? "bg-green-500"
//                       : theater.status === "blocked"
//                       ? "bg-red-500"
//                       : "bg-yellow-500"
//                   }`}
//                 >
//                   {theater.status}
//                 </span>
//               </div>
//               <div className="flex justify-center items-center">
//                 <button
//                   className={`px-4 py-2 rounded ${
//                     theater.status === "blocked"
//                       ? "bg-red-500"
//                       : "bg-yellow-500"
//                   } text-white`}
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click event
//                     handleBlockUnblock(theater._id, theater.status);
//                   }}
//                 >
//                   {theater.status === "blocked" ? "Unblock" : "Block"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TheatresList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";

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

  const navigate = useNavigate(); // Initialize useNavigate

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
      setTheaters(
        theaters.map((theater) =>
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
      setTheaters(theaters.filter((theater) => theater._id !== id));
    } catch (err) {
      console.error("Failed to delete theater", err);
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
            <div
              key={theater._id}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer"
              onClick={() => navigate(`/admin/theater/${theater._id}`)}
            >
              <div className="flex justify-center items-center mb-2">
                <img
                  src={theater.profilePicture || "/default-profile.png"}
                  alt={`${theater.username}'s profile`}
                  className="w-fit h-48 rounded-full"
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
                {theater.status === "rejected" ? (
                  <button
                    className="px-4 py-2 rounded bg-red-500 text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleDelete(theater._id);
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className={`px-4 py-2 rounded ${
                      theater.status === "blocked"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } text-white`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
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

