import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import RowPost from "./RowPost";
import Navbar from "./NavBar";
import "../../../styles.css";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion"; 
import { RootState } from "../../../redux/store";

const UserHomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.user);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🎥 Fetch movies + their trailer keys
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/theater/get-Movies",
          config
        );
        const moviesData = response.data.data;

        const moviesWithTrailers = await Promise.all(
          moviesData.map(async (movie: any) => {
            try {
              const trailerResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
              );
              const trailerData = await trailerResponse.json();
              const trailer = trailerData.results.find(
                (video: any) => video.type === "Trailer"
              );
              return { ...movie, trailerKey: trailer ? trailer.key : null };
            } catch {
              return { ...movie, trailerKey: null };
            }
          })
        );

        setMovies(moviesWithTrailers);
      } catch (err) {
        console.error("Failed to fetch movies", err);
        setError("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [user]);

  // ⏳ Auto-switch movie every 90 seconds
  useEffect(() => {
    if (movies.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
      }, 90000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [movies]);

  const handleNextMovie = () => {
    setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
  };

  const currentMovie = movies[currentMovieIndex];

  const onReady = (event: any) => event.target.playVideo();
  const onEnd = () => handleNextMovie();

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar />

      {/* 🎬 Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {currentMovie && currentMovie.trailerKey ? (
            <motion.div
              key={currentMovie.trailerKey} 
              className="absolute inset-0"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              <YouTube
                videoId={currentMovie.trailerKey}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    modestbranding: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    cc_load_policy: 0,
                    enablejsapi: 1,
                    origin: window.location.origin, 
                    rel: 0,
                  },
                }}
                onReady={onReady}
                onEnd={onEnd}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 🔲 Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* 🎞️ Movie Info with fade-up animation */}
              <div className="absolute bottom-16 left-6 md:left-16 max-w-xl">
                <motion.h1
                  className="text-3xl md:text-5xl font-extrabold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {currentMovie.title}
                </motion.h1>
                <motion.p
                  className="hidden md:block text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  {currentMovie.releaseDate} • {currentMovie.rating}⭐
                </motion.p>
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-300 transition">
                    ▶ Play
                  </button>
                  <button className="bg-gray-700 text-white font-bold px-6 py-2 rounded hover:bg-gray-600 transition">
                    + My List
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="loading"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 📺 Rows Section */}
      <main className="p-4 md:p-8">
        <RowPost heading="Trending Now" endpoint="/get-Movies" />
      </main>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default UserHomePage;
