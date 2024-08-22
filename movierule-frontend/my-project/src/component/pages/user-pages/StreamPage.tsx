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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest("GET", "/get-OTT-Movies", config);

        console.log(response,"response from backedn");
        
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
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
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

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {currentMovie && currentMovie.trailerKey ? (
        <div className="relative video-container">
          <YouTube
            videoId={currentMovie.trailerKey}
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0, // Hide controls
                modestbranding: 1, // Hide YouTube logo
                fs: 0, // Disable fullscreen button
                iv_load_policy: 3, // Disable video annotations
                cc_load_policy: 0, // Disable captions
              },
            }}
            onReady={onReady}
            onEnd={onEnd}
            className="absolute inset-0"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
            <h1 className="text-3xl font-bold">{currentMovie.title}</h1>
            <p className="text-lg">
              {currentMovie.releaseDate} - {currentMovie.rating}
              <span className="text-yellow-400">★</span>
            </p>
            <button
              onClick={handleNextMovie}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Next Movie
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Running</h2>
        <StreamRowPost
          heading="Latest Streaming Movies"
          endpoint="/get-OTT-Movies"
        />
      </main>
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {selectedMovie && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedMovie.title}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedMovie.overview}</p>
                  <div className="video-container mt-10">
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
