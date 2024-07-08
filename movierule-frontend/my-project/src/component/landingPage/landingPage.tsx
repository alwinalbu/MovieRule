// LandingPage.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "../search/search";
import MovieList from "../movieList/movieList";
import AddMovie from "../addMovie/addMovie";
import { moviesData } from "../data";
import { RootState } from "../../redux/store";
import UserDropdown from "../dropdown/UserDropdown";


interface Movie {
  id: number;
  name: string;
  date: string;
  image: string;
  rating: number;
}

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [searchRating, setSearchRating] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleAdd = (newMovie: Movie) => setMovies([...movies, newMovie]);
  const handleRating = (newRate: number) => setSearchRating(newRate);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  // Accessing userData from Redux state
  const {user} = useSelector((state: RootState) => state.user);

  console.log(user, "userdata inside the landing page ");

  useEffect(() => {
    if (user) {
      console.log("User data received:", user);
    }
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to Movie Database</h1>

          {user && (
            <div className="flex items-center">
              <UserDropdown user={user} />
            </div>
          )}
        </div>
        <Search
          searchRating={searchRating}
          searchValue={searchValue}
          handleRating={handleRating}
          handleSearch={handleSearch}
        />
      </header>
      <main className="container mx-auto flex-grow py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MovieList
            movies={movies.filter(
              (movie) =>
                movie.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase().trim()) &&
                movie.rating >= searchRating
            )}
          />
        </div>
        <AddMovie handleAdd={handleAdd} />
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Movie Database. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
