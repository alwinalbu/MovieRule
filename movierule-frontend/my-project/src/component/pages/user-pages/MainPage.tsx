import React, { useEffect, useState, useRef } from "react";
import NavBar from "./UserNavBar";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import YouTube from "react-youtube";
import RowPost from "./RowPost";
import Footer from "../Footer";

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
            const trailerResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
            );
            const trailerData = await trailerResponse.json();
            const trailer = trailerData.results.find(
              (video: any) => video.type === "Trailer"
            );
            return { ...movie, trailerKey: trailer ? trailer.key : null };
          })
        );

        setMovies(moviesWithTrailers);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 90000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [movies]);

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const currentMovie = movies[currentMovieIndex];

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  const onEnd = () => {
    handleNextMovie();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* HERO TRAILER SECTION */}
      {currentMovie ? (
        <div className="relative h-[80vh] w-full overflow-hidden">
          {/* Desktop: YouTube Background */}
          <div className="hidden md:block absolute inset-0">
            {currentMovie.trailerKey ? (
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
                  },
                }}
                onReady={onReady}
                onEnd={onEnd}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={currentMovie.posterPath}
                alt={currentMovie.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Mobile: Poster fallback */}
          <div className="md:hidden">
            <img
              src={currentMovie.posterPath}
              alt={currentMovie.title}
              className="w-full h-[70vh] object-cover"
            />
          </div>

          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

          {/* Hero Content */}
          <div className="absolute bottom-16 left-6 md:left-16 max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              {currentMovie.title}
            </h1>
            <p className="text-sm md:text-lg mb-6 line-clamp-3 text-gray-300">
              {currentMovie.overview}
            </p>
            <p className="hidden md:block text-gray-300 mb-4">
              {currentMovie.releaseDate} • {currentMovie.rating}⭐
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleNextMovie}
                className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded font-semibold"
              >
                Next Movie
              </button>
              {/* <button className="flex items-center gap-2 bg-white text-black px-4 md:px-6 py-2 rounded font-semibold hover:bg-gray-300 transition">
                <Play size={20} /> Play
              </button> */}
              {/* <button className="flex items-center gap-2 bg-gray-700/80 text-white px-4 md:px-6 py-2 rounded font-semibold hover:bg-gray-600 transition">
                <Info size={20} /> More Info
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* MOVIE ROWS */}
      <main className="px-4 md:px-10 -mt-8 relative z-10">
        <RowPost heading="Trending Now" endpoint="/get-Movies" />
      </main>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default LandingPage;


