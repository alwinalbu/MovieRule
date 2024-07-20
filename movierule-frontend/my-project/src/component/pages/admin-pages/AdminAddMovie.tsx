import React, { useState } from "react";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";

const AdminAddMovie: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    languages: "",
    rating: "",
    format: "",
    genres: "",
    trailerLink: "", // New field for trailer link
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovieDetails({
      ...movieDetails,
      [name]: value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    // Handle file upload
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="flex">
     <AdminSidebar/>
      <main className="flex-1 bg-black text-white p-6">
        <h1 className="text-3xl mb-6">Add Movie</h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Enter Movie Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.title}
              onChange={handleInputChange}
            />
            <label className="block mb-2">Enter Rating</label>
            <input
              type="text"
              name="rating"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.rating}
              onChange={handleInputChange}
            />
            <label className="block mb-2">Genres</label>
            <input
              type="text"
              name="genres"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.genres}
              onChange={handleInputChange}
            />
            <label className="block mb-2">Upload Banner</label>
            <input
              type="file"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              onChange={(e) => handleFileChange(e, "banner")}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
          <div>
            <label className="block mb-2">Enter Languages Available</label>
            <input
              type="text"
              name="languages"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.languages}
              onChange={handleInputChange}
            />
            <label className="block mb-2">Enter Format</label>
            <input
              type="text"
              name="format"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.format}
              onChange={handleInputChange}
            />
            <label className="block mb-2">Upload Movie</label>
            <input
              type="file"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              onChange={(e) => handleFileChange(e, "movie")}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <label className="block mt-6 mb-2">Upload Card Image</label>
            <input
              type="file"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              onChange={(e) => handleFileChange(e, "cardImage")}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <label className="block mt-6 mb-2">
              Enter YouTube Trailer Link
            </label>
            <input
              type="text"
              name="trailerLink"
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
              value={movieDetails.trailerLink}
              onChange={handleInputChange}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
          Add Movie
        </button>
      </main>
    </div>
  );
};

export default AdminAddMovie;
