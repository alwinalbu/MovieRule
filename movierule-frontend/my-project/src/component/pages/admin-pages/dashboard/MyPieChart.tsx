import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TheaterEntity } from "../../../../interfaces/theater/Theaterinterface";
import { commonRequest } from "../../../../config/api";
import { config } from "../../../../config/constants";
import { IMovie } from "../../../Movies/IMovie";
import { FaSpinner } from "react-icons/fa";
import { User } from "../UsersListAdmin";

const MyPieChart: React.FC = () => {
  const [theaters, setTheaters] = useState<TheaterEntity[]>([]);
  const [ottMovies, setOTTMovies] = useState<IMovie[]>([]);
  const [theaterMovies, setTheaterMovies] = useState<IMovie[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          usersResponse,
          theatersResponse,
          ottMoviesResponse,
          theaterMoviesResponse,
        ] = await Promise.all([
          commonRequest("GET", "/admin/get-users", config),
          commonRequest("GET", "/admin/get-theaters", config),
          commonRequest("GET", "/admin/get-OTT-Movies", config),
          commonRequest("GET", "/admin/get-theatersMovies", config),
        ]);

        setUsers(usersResponse.data.data);
        setTheaters(theatersResponse.data.data);
        setOTTMovies(ottMoviesResponse.data.data);
        setTheaterMovies(theaterMoviesResponse.data.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  const activeTheatersCount = theaters.filter(
    (theater) => theater.status === "active"
  ).length;
  const activeUsersCount = users.filter(
    (user) => user.status === "active"
  ).length;

  const data = [
    { id: 0, value: activeTheatersCount, label: "Active Theaters" },
    { id: 1, value: ottMovies.length, label: "OTT Movies" },
    { id: 2, value: theaterMovies.length, label: "Theater Movies" },
    { id: 3, value: activeUsersCount, label: "Active Users" },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </div>
  );
};

export default MyPieChart;

