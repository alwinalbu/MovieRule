import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Play } from "lucide-react";
import { toast } from "react-toastify";
import { commonRequest } from "../../../config/api";
import { config, URL } from "../../../config/constants";
import Navbar from "./NavBar";
import axios from "axios";
import { waitForCookies } from "../../../utlis/waitForCookies";

const MyListPage: React.FC = () => {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null); 
  const navigate = useNavigate();

  // ✅ First fetch logged in user
 useEffect(() => {
   const fetchUser = async () => {

    await waitForCookies();
    
     try {
       const { data } = await axios.get(`${URL}/getUser`, config);
       
       console.log(data,"from backedn about user in list page");
       
       setCurrentUser(data);
       setCurrentUserId(data?._id);
     } catch (error) {
       console.error("Error fetching user:", error);
     }
   };
   fetchUser();
 }, []);

  
  console.log(currentUser, "Current user in MyListPage");

  
  // Fetch watchlist
  const fetchWatchlist = async () => {
    setLoading(true);
    try {
     const response = await commonRequest(
       "GET",
       `/get-watchlist?userId=${currentUserId}`,
       config
     );

      if (response.data.success) {
        setWatchlist(response.data.data || []);
      } else {
        toast.error("Failed to fetch watchlist");
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      toast.error("Error fetching watchlist");
    }
    setLoading(false);
  };

  
  useEffect(() => {
    if (currentUserId) {
      fetchWatchlist();
    }
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="px-6 md:px-16 py-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">My List</h1>

        {watchlist.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">Your list is empty.</p>
            <p className="text-sm">
              Browse movies and click “+ My List” to add them here.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
              onClick={() => navigate("/stream-library-plan")}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie._id}
                className="relative group cursor-pointer"
                onClick={() =>
                  navigate(`/movie/${movie.id}`, {
                    state: { dbMovieId: movie._id, type: movie.type },
                  })
                }
              >
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-full h-48 sm:h-56 md:h-72 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-3 rounded-md">
                  <h3 className="text-sm md:text-base font-bold mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie.id}`, {
                          state: { dbMovieId: movie._id, type: movie.type },
                        });
                      }}
                    >
                      <Play size={14} /> Play
                    </button>
                    <button
                      className="flex items-center gap-1 bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie.id}`, {
                          state: { dbMovieId: movie._id, type: movie.type },
                        });
                      }}
                    >
                      <Info size={14} /> Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListPage;

