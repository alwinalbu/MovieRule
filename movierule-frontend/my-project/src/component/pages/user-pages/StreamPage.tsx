import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import Navbar from "./NavBar";
import "../../../styles.css";
import YouTube from "react-youtube";
import { RootState } from "../../../redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import StreamRowPost from "./StreamRowPost";

const StreamPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest("GET", "/get-OTT-Movies", config);
        const moviesData = response.data.data;

        // Fetch trailers
        const moviesWithTrailers = await Promise.all(
          moviesData.map(async (movie: any) => {
            const trailerResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
            );
            const trailerData = await trailerResponse.json();
            const trailer = trailerData.results.find(
              (video: any) => video.type === "Trailer"
            );

            return {
              ...movie,
              trailerKey: trailer ? trailer.key : null,
            };
          })
        );

        setMovies(moviesWithTrailers);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, [user]);

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

  const onReady = (event: any) => event.target.playVideo();
  const onEnd = () => handleNextMovie();

  const handlePlay = (movie: any) => {
    setSelectedMovie(movie);
    onOpenChange();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      {currentMovie && currentMovie.trailerKey ? (
        <div className="relative w-full aspect-video">
          <YouTube
            videoId={currentMovie.trailerKey}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                fs: 0,
                iv_load_policy: 3,
                cc_load_policy: 0,
                mute: 0,
                rel: 0,
              },
            }}
            onReady={onReady}
            onEnd={onEnd}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          {/* Hero Content */}
          <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 max-w-sm sm:max-w-xl px-2">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              {currentMovie.title}
            </h1>
            <p className="mt-4 text-gray-300 hidden md:block">
              {currentMovie.overview?.slice(0, 120)}...
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => handlePlay(currentMovie)}
                className="px-4 sm:px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
              >
                ▶ Play
              </button>
              <button
                onClick={handleNextMovie}
                className="px-4 sm:px-6 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600"
              >
                Next Trailer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-6">Loading...</p>
      )}

      {/* Rows */}
      <main className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Now Streaming</h2>
        <StreamRowPost
          heading="Latest Streaming Movies"
          endpoint="/get-OTT-Movies"
        />
      </main>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Movie Modal */}
      {selectedMovie && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-bold">
                  {selectedMovie.title}
                </ModalHeader>
                <ModalBody>
                  <p className="mb-4">{selectedMovie.overview}</p>
                  <div className="video-container">
                    <video
                      controls
                      className="w-full h-auto rounded-lg shadow-md"
                    >
                      <source
                        src={selectedMovie.streamingURL}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default StreamPage;


