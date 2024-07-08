import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <header className="bg-gray-900 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
            <ul className="flex space-x-4">
              <li>
                <NavLink to="/" className="hover:text-gray-300">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/stream" className="hover:text-gray-300">
                  Stream
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-gray-300">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gray-300">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            Login
          </NavLink>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        <section
          className="bg-cover bg-center relative"
          style={{ backgroundImage: "url('kung-fu-panda.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-5xl font-bold">Kung Fu Panda 4</h1>
            <p className="mt-4 text-lg">2024 • Comedy • 1hr 34m</p>
            <div className="mt-6">
              <button className="bg-purple-600 text-white px-4 py-2 rounded mr-2 hover:bg-purple-500">
                Watch Trailer
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                Book Now
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Running</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-64 w-full object-cover rounded mb-2"
                />
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="mt-1">
                  {movie.rating}/10 • {movie.votes} Votes
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const movies = [
  {
    id: 1,
    title: "TURBO",
    poster: "turbo.jpg",
    rating: 8.4,
    votes: "4.8K",
  },
  {
    id: 2,
    title: "THALLUMALA",
    poster: "thallumala.jpg",
    rating: 8.6,
    votes: "3.5K",
  },
  {
    id: 3,
    title: "Guivusayoorumoodu Nasdy",
    poster: "guivusayoorumoodu.jpg",
    rating: 7.8,
    votes: "5.4K",
  },
  {
    id: 4,
    title: "Golam",
    poster: "golam.jpg",
    rating: 8.9,
    votes: "3.2K",
  },
  {
    id: 5,
    title: "Bad Boys Ride or Die",
    poster: "badboys.jpg",
    rating: 7.3,
    votes: "1.3K",
  },
  {
    id: 6,
    title: "Furious A New Mod Saga",
    poster: "furious.jpg",
    rating: 8.4,
    votes: "2.4K",
  },
  {
    id: 7,
    title: "Inside Out 2",
    poster: "insideout2.jpg",
    rating: 9.2,
    votes: "2.7K",
  },
  {
    id: 8,
    title: "Deadpool 4 Wolverine",
    poster: "deadpool4.jpg",
    rating: 9.8,
    votes: "4.1K",
  },
];

export default LandingPage;
