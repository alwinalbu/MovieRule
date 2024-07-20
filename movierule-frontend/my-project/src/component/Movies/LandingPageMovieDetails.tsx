
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { Tooltip } from "@nextui-org/react";
import { RootState } from "../../redux/store";



const LandingPageMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const {state}=useLocation()
  const [movie, setMovie] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  
  

  useEffect(() => {
    if (movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error("Error fetching movie details:", err));

      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: any) => video.type === "Trailer"
          );
          if (trailer) {
            setTrailerKey(trailer.key);
          }
        })
        .catch((err) => console.error("Error fetching movie videos:", err));
    }
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

 

  const toggleTrailer = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBookTickets = () => {
    if (user) {
      navigate(`/booking/movie/${state}`);
    } else {
      alert("Please login to book the movie!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 relative flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        }}
      />

      <div className="relative z-10 w-full md:w-3/4 lg:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="flex-1 flex items-center justify-center">
          <img
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{movie.title}</h2>
          <p className="text-md">{movie.overview}</p>
          <div className="sub-details flex flex-wrap gap-4 font-bold">
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-language"></i> {movie.original_language}
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-regular fa-clock"></i> {movie.runtime} min
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-heart"></i> {movie.vote_average}/10
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-comment"></i> {movie.vote_count} votes
            </h5>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleBookTickets}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Tickets
            </button>
            <Tooltip
              showArrow={true}
              color="primary"
              placement="bottom"
              content="Click this button again to close the video"
            >
              <button
                onClick={toggleTrailer}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
              >
                {isModalOpen ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <button
              onClick={toggleTrailer}
              className="absolute top-0 right-0 mt-2 mr-2 text-white"
            >
              &times;
            </button>
            <YouTube videoId={trailerKey} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageMovieDetails;


