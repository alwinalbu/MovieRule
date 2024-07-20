import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavBar from "./UserNavBar";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";


const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/theater/get-Movies",
          config
        );
        const moviesData = response.data.data;

        // Fetch trailer keys for each movie
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
  }, []);

  const handlePosterClick = (trailerKey: string | null) => {
    if (trailerKey) {
      setSelectedTrailer(trailerKey);
    }
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  return (
    <div className="bg-black text-white">
      <header className="bg-gray-900 py-4">
        <NavBar />
      </header>

      <main className="container mx-auto py-8">
        {selectedTrailer ? (
          <div className="relative bg-cover bg-center h-96">
            <YouTube
              videoId={selectedTrailer}
              opts={{
                playerVars: {
                  autoplay: 1,
                  fs: 1,
                },
              }}
              className="absolute inset-0 w-full h-full"
            />
            <button
              onClick={closeTrailer}
              className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        ) : (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showIndicators={false}
            showThumbs={false}
            className="bg-cover bg-center relative"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handlePosterClick(movie.trailerKey)}
              >
                <img src={movie.backdrop_path} alt={movie.title} />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 p-8">
                  <h1 className="text-5xl font-bold">{movie.title}</h1>
                  <p className="mt-4 text-lg">
                    {movie.releaseDate} • {movie.genre} • {movie.duration}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Running</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div
                  className="bg-gray-800 rounded overflow-hidden"
                  style={{ height: "400px" }}
                >
                  {movie?.posterPath ? (
                    <img
                      src={movie.posterPath}
                      alt={`Poster of ${movie.title}`}
                      className="h-3/4 w-full object-cover"
                    />
                  ) : (
                    <div className="h-3/4 w-full bg-gray-200 flex items-center justify-center">
                      <span>No poster available</span>
                    </div>
                  )}
                  <div className="h-1/4 p-4">
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    <p className="mt-1">
                      {movie.rating}/10 • {movie.votes} Votes
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
};

export default LandingPage;



