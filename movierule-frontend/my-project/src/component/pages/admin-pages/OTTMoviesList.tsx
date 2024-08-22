import React, { useEffect, useState } from "react";
import MovieCard from "../../moviecard/movieCard";
import { IMovie } from "../../Movies/IMovie";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";

const OTTMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          "/admin/get-OTT-Movies",
          config
        );
        setMovies(response.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch OTT Movies");
        setError("Failed to fetch OTT Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (movieId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await commonRequest(
            "DELETE",
            `/admin/delete-Movie/${movieId}`,
            config
          );

          if (response.status === 200 && response.data.success) {
            setMovies(movies.filter((movie) => movie._id !== movieId));

            Swal.fire("Deleted!", "The movie has been deleted.", "success");
          } else {
            Swal.fire("Failed!", "The movie could not be deleted.", "error");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete movie");
        }
      }
    });
  };

  console.log(movies,"ott movies");
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AdminSidebar />
      <div className="container mx-auto">
        <Toaster position="top-right" reverseOrder={false} />
        <header className="relative">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows
            dynamicHeight
          >
            {movies.map((movie) => (
              <div key={movie._id}>
                <img
                  src={movie.backdrop_path}
                  alt={movie.title}
                  className="w-full h-100 object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
                  <h1 className="text-3xl font-bold">{movie.title}</h1>
                  <p className="text-lg">
                    {movie.releaseDate} - {movie.rating}
                    <span className="text-yellow-400">★</span>
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </header>
        <h2 className="text-3xl font-bold mb-4">Running</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie._id} className="relative">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleDelete(movie._id)}
                className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  
};

export default OTTMoviesList;

