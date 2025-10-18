import React from "react";
import StarRating from "../rating/starRating";

interface SearchProps {
  searchRating: number;
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRating: (rating: number) => void;
}

const Search: React.FC<SearchProps> = ({
  searchRating,
  searchValue,
  handleSearch,
  handleRating,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Alwin Denny</h1> */}
      <div className="flex items-center mb-4">
        <input
          value={searchValue}
          onChange={handleSearch}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none"
          type="text"
          placeholder="Enter a movie to search"
        />
      </div>
      <StarRating rate={searchRating} handleRating={handleRating} />
    </div>
  );
};

export default Search;
