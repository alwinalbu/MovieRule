// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
// import { Pagination, Spinner } from "@nextui-org/react";

// const AddMovieTmdbList: React.FC = () => {
//   const [moviesList, setMoviesList] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const getMovies = async (page: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=2a1ba4f836ae838c2fe9a42ef94af264&page=${page}`
//       );
//       const json = await res.json();
//       setMoviesList(json.results || []);
//     } catch (err) {
//       console.error("Error fetching movies:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getMovies(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200">
//       <AdminSidebar />
//       <div className="flex flex-col w-full">
//         <main className="flex-1 p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-semibold">Movies from TMDB</h1>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <Spinner label="Loading movies..." color="primary" />
//             </div>
//           ) : (
//             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {moviesList.length > 0 ? (
//                 moviesList.map((movie) => (
//                   <Link to={`/admin/movie/${movie.id}`} key={movie.id}>
//                     <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
//                       <img
//                         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//                         alt={movie.title}
//                         className="w-full h-72 object-cover"
//                       />
//                       <div className="p-4">
//                         <h2 className="text-lg font-semibold line-clamp-2">
//                           {movie.title}
//                         </h2>
//                         <p className="mt-1 text-sm text-gray-300">
//                           Release Date: {movie.release_date || "N/A"}
//                         </p>
//                         <p className="mt-2 text-sm text-gray-400">
//                           Rating: ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))
//               ) : (
//                 <div className="col-span-full text-center text-gray-400">
//                   No movies found.
//                 </div>
//               )}
//             </section>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-center mt-8">
//             <Pagination
//               showControls
//               total={50} // TMDB has many pages; adjust or fetch total dynamically
//               page={currentPage}
//               onChange={handlePageChange}
//               color="danger"
//             />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddMovieTmdbList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import { Pagination, Spinner } from "@nextui-org/react";

const AddMovieTmdbList: React.FC = () => {
  const [moviesList, setMoviesList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // Default: English

  // ✅ Fetch movies with popularity + vote filter for better data
  const getMovies = async (page: number, lang: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2a1ba4f836ae838c2fe9a42ef94af264&page=${page}&sort_by=popularity.desc&vote_count.gte=30&with_original_language=${lang}`
      );
      const json = await res.json();
      setMoviesList(json.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Fetch whenever page or language changes
  useEffect(() => {
    getMovies(currentPage, language);
  }, [currentPage, language]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <main className="flex-1 p-6">
          {/* Header and Language Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
            <h1 className="text-2xl font-semibold">
              Regional & English Movies (TMDB)
            </h1>

            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner label="Loading movies..." color="primary" />
            </div>
          ) : (
            // Movie Grid
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {moviesList.length > 0 ? (
                moviesList.map((movie) => (
                  <Link to={`/admin/movie/${movie.id}`} key={movie.id}>
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                        alt={movie.title}
                        className="w-full h-72 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold line-clamp-2">
                          {movie.title || movie.original_title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-300">
                          Release Date: {movie.release_date || "N/A"}
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                          Rating: ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400">
                  No movies found.
                </div>
              )}
            </section>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              showControls
              total={50}
              page={currentPage}
              onChange={handlePageChange}
              color="danger"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddMovieTmdbList;




