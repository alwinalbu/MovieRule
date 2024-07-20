// import React, { useState, useEffect } from "react";
// import {  Link } from "react-router-dom";
// import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
// import { IMovie } from "../../Movies/IMovie";



// const AddMovieTmdbList: React.FC = () => {
//   const [moviesList, setMoviesList] = useState<IMovie[]>([]);

//   const getMovies = () => {
//     fetch(
//       "https://api.themoviedb.org/3/discover/movie?api_key=2a1ba4f836ae838c2fe9a42ef94af264"
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         setMoviesList(json.results);
//       })
//       .catch((err) => console.error("Error fetching movies:", err));
//   };

//   console.log(moviesList,"reseult here TMDB");
  

//   useEffect(() => {
//     getMovies();
//   }, []);

 

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200">
//       <AdminSidebar />
//       <div className="flex flex-col w-full">
//         <main className="flex-1 p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-semibold">Movies</h1>
//           </div>
//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {moviesList.length > 0 ? (
//               moviesList.map((movie) => (
//                 <Link to={`/admin/movie/${movie.id}`} key={movie.id}>
//                   <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//                       alt={movie.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-4">
//                       <h2 className="text-lg font-semibold">{movie.title}</h2>
//                       <p className="mt-1 text-sm text-gray-300">
//                         Release Date: {movie.release_date}
//                       </p>
//                       <p className="mt-2 text-sm text-gray-400">
//                         Rating: {movie.vote_average}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p>Loading...</p>
//             )}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddMovieTmdbList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import { IMovie } from "../../Movies/IMovie";
import { Pagination } from "@nextui-org/react";

const AddMovieTmdbList: React.FC = () => {
  const [moviesList, setMoviesList] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const getMovies = (page: number) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2a1ba4f836ae838c2fe9a42ef94af264&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => {
        setMoviesList(json.results);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Movies</h1>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moviesList.length > 0 ? (
              moviesList.map((movie) => (
                <Link to={`/admin/movie/${movie.id}`} key={movie.id}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{movie.title}</h2>
                      <p className="mt-1 text-sm text-gray-300">
                        Release Date: {movie.release_date}
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        Rating: {movie.vote_average}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </section>
          <div className="flex justify-center mt-6">
            <Pagination
              showControls
              total={10} // Adjust based on the total number of pages available
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddMovieTmdbList;

