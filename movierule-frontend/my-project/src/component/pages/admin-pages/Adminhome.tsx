import React, { useEffect, useState } from "react";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import MyPieChart from "./dashboard/MyPieChart";
import MostBookedMovies from "./dashboard/MostBookedMovies";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";

// Import icons
import {
  FaUsers,
  FaUserCheck,
  FaTheaterMasks,
  FaFilm,
  FaTv,
} from "react-icons/fa";

const Adminhome: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubscribedUsers: 0,
    totalTheaters: 0,
    totalTheaterMovies: 0,
    totalOttMovies: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Users
        const usersRes = await commonRequest("GET", "/admin/get-users", config);
        const users = usersRes.data.data || [];
        const totalUsers = users.length;
        const totalSubscribedUsers = users.filter(
          (u: any) => u.isSubscribed?.status === "active"
        ).length;

        // 2. Theaters
        const theatersRes = await commonRequest(
          "GET",
          "/admin/get-theaters",
          config
        );
        const totalTheaters = theatersRes.data.data?.length || 0;

        // 3. Theater Movies
        const theaterMoviesRes = await commonRequest(
          "GET",
          "/admin/get-theatersMovies",
          config
        );
        const totalTheaterMovies = theaterMoviesRes.data.data?.length || 0;

        // 4. OTT Movies
        const ottMoviesRes = await commonRequest(
          "GET",
          "/admin/get-OTT-Movies",
          config
        );
        const totalOttMovies = ottMoviesRes.data.data?.length || 0;

        setStats({
          totalUsers,
          totalSubscribedUsers,
          totalTheaters,
          totalTheaterMovies,
          totalOttMovies,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  // Netflix-style card with icon support
  const cardStyle =
    "p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#1c1c1c] to-[#141414] border border-red-700/40 hover:border-[#E50914] hover:shadow-red-600/30 transition flex flex-col items-center text-center";

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-4">
            Welcome, <span className="text-[#E50914]">Admin</span>
          </h1>

          {/* Quick Stats Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {/* Total Users */}
            <div className={cardStyle}>
              <FaUsers className="text-4xl text-[#E50914] mb-2" />
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Total Users
              </p>
              <p className="text-3xl font-bold text-white">
                {stats.totalUsers}
              </p>
            </div>

            {/* Subscribed Users */}
            <div className={cardStyle}>
              <FaUserCheck className="text-4xl text-green-500 mb-2" />
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Subscribed Users
              </p>
              <p className="text-3xl font-bold text-white">
                {stats.totalSubscribedUsers}
              </p>
            </div>

            {/* Theaters */}
            <div className={cardStyle}>
              <FaTheaterMasks className="text-4xl text-blue-500 mb-2" />
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Theaters
              </p>
              <p className="text-3xl font-bold text-white">
                {stats.totalTheaters}
              </p>
            </div>

            {/* Theater Movies */}
            <div className={cardStyle}>
              <FaFilm className="text-4xl text-purple-500 mb-2" />
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Theater Movies
              </p>
              <p className="text-3xl font-bold text-white">
                {stats.totalTheaterMovies}
              </p>
            </div>

            {/* OTT Movies */}
            <div className={cardStyle}>
              <FaTv className="text-4xl text-yellow-500 mb-2" />
              <p className="text-sm uppercase tracking-wide text-gray-400">
                OTT Movies
              </p>
              <p className="text-3xl font-bold text-white">
                {stats.totalOttMovies}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <section className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg hover:shadow-red-600/30 transition">
            <h2 className="text-xl font-bold mb-4 text-gray-200 uppercase tracking-wide">
              Overview
            </h2>
            <MyPieChart />
          </section>

          <section className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg hover:shadow-red-600/30 transition col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-200 uppercase tracking-wide">
              Most Booked Movies
            </h2>
            <MostBookedMovies />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Adminhome;



