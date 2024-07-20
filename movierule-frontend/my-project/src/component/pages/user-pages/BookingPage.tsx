import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { IMovie } from "../../Movies/IMovie";

interface Screen {
  _id: string;
  name: string;
  quality: string;
}

interface Theater {
  _id: string;
  username: string;
}

interface Show {
  _id: string;
  theater_id: Theater;
  movie: IMovie;
  screen: Screen;
  show_name: string;
  date: string;
  start_time: string;
  end_time: string;
}

const BookingPage: React.FC = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/movies/${movie_id}/available-shows/`,
          config
        );
        console.log(response.data.data, "response from backend");
        setShows(response.data.data);
        setSelectedDate(response.data.data[0]?.date || "");
      } catch (err) {
        setError("Failed to fetch shows");
        toast.error("Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [movie_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const groupShowsByDate = (shows: Show[]) => {
    return shows.reduce((acc: { [key: string]: Show[] }, show) => {
      const date = format(parseISO(show.date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(show);
      return acc;
    }, {});
  };

  const sortedShowsByDate = (shows: { [key: string]: Show[] }) => {
    Object.keys(shows).forEach((date) => {
      shows[date].sort((a, b) => {
        return (
          parseISO(a.start_time).getTime() - parseISO(b.start_time).getTime()
        );
      });
    });
    return shows;
  };

  const groupShowsByTheater = (shows: Show[]) => {
    return shows.reduce((acc: { [key: string]: Show[] }, show) => {
      const theaterId = show.theater_id._id;
      if (!acc[theaterId]) {
        acc[theaterId] = [];
      }
      acc[theaterId].push(show);
      return acc;
    }, {});
  };

  const showsGroupedByDate = sortedShowsByDate(groupShowsByDate(shows));
  const showsGroupedByTheater = groupShowsByTheater(
    showsGroupedByDate[selectedDate] || []
  );

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-white">
        <main className="mt-20 px-4">
          <div className="container mx-auto">
            {shows.length > 0 && (
              <div className="mb-6">
                <img
                  src={shows[0].movie.backdrop_path}
                  alt={shows[0].movie.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                  {shows[0].movie.title}
                </h1>
              </div>
            )}
            <div className="mb-6">
              <div className="flex space-x-2 mb-6">
                {Object.keys(showsGroupedByDate).map((date) => (
                  <button
                    key={date}
                    className={`px-4 py-2 rounded-md ${
                      selectedDate === date
                        ? "text-white bg-red-500"
                        : "text-gray-800 bg-gray-200"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {format(parseISO(date), "EEE dd MMM")}
                  </button>
                ))}
              </div>
            </div>
            {Object.entries(showsGroupedByTheater).map(([theaterId, shows]) => (
              <div key={theaterId} className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {shows[0].theater_id.username}
                </h2>
                <div className="flex flex-col space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow min-w-max flex-none">
                    <div className="flex justify-between gap-4 items-center">
                      <div className="flex gap-4">
                        {shows.map((show) => (
                          <div
                            key={show._id}
                            className="flex space-x-2 overflow-x-auto"
                          >
                            <button className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:text-white hover:bg-red-500 transition-colors duration-300 flex items-center space-x-2">
                              <span>{show.start_time}</span>
                              <span className="text-sm text-blue-950">
                                {show.screen.quality}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="text-gray-600">
                        Cancellation Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default BookingPage;
