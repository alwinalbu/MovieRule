import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { format, parseISO, parse, isBefore } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
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

export interface Show {
  _id: string;
  theater_id: Theater;
  movie: IMovie;
  screen: Screen;
  show_name: string;
  date: string;
  start_time: string;
  end_time: string;
}

const formatTime = (time: string) => {
  try {
    const parsedDate = parse(time, "HH:mm", new Date());
    return format(parsedDate, "h:mm a");
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

const BookingPage: React.FC = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [_movieDetails, setMovieDetails] = useState<IMovie | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/movies/${movie_id}/available-shows/`,
          config
        );
        setShows(response.data.data);
        setSelectedDate(response.data.data[0]?.date || "");
        if (response.data.data.length > 0) {
          setMovieDetails(response.data.data[0].movie);
        }
      } catch (err) {
        setError("Failed to fetch shows");
        toast.error("Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [movie_id]);

  const handleButtonClick = (
    screenId: string,
    movie: IMovie,
    show: Show,
    formattedStartTime: string
  ) => {
    navigate(`/screen-layout/${screenId}`, {
      state: { movie, show, startTime: formattedStartTime },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gray-900">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-gray-900">
        Error: {error}
      </div>
    );

  const groupShowsByDate = (shows: Show[]) => {
    const currentDate = new Date();

    return shows.reduce((acc: { [key: string]: Show[] }, show) => {
      const showDate = parseISO(show.date);
      const showDateTime = parse(show.start_time, "HH:mm", showDate);

      if (isBefore(showDateTime, currentDate)) {
        return acc;
      }

      const date = format(showDate, "yyyy-MM-dd");
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
          parse(a.start_time, "HH:mm", new Date()).getTime() -
          parse(b.start_time, "HH:mm", new Date()).getTime()
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
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Movie Hero Section */}
        {shows.length > 0 && (
          <div className="relative w-full h-72 mb-6">
            <img
              src={shows[0].movie.backdrop_path}
              alt={shows[0].movie.title}
              className="w-full h-72 object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <h1 className="text-3xl font-bold">{shows[0].movie.title}</h1>
              <p className="text-sm text-gray-200 mt-2">
                Choose a date & showtime to continue booking
              </p>
            </div>
          </div>
        )}

        <main className="px-4 md:px-8">
          {/* Date Selector */}
          <div className="flex overflow-x-auto gap-3 mb-8 scrollbar-hide">
            {Object.keys(showsGroupedByDate).map((date) => (
              <button
                key={date}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedDate === date
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-red-500 hover:text-white"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {format(parseISO(date), "EEE dd MMM")}
              </button>
            ))}
          </div>

          {/* Theater & Showtimes */}
          {Object.entries(showsGroupedByTheater).map(([theaterId, shows]) => (
            <div
              key={theaterId}
              className="mb-10 bg-gray-900 rounded-lg shadow-lg p-4"
            >
              <h2 className="text-xl font-bold mb-4 text-red-400">
                {shows[0].theater_id.username}
              </h2>
              <div className="flex flex-wrap gap-3">
                {shows.map((show) => {
                  const formattedStartTime = formatTime(show.start_time);
                  return (
                    <button
                      key={show._id}
                      className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-red-600 transition text-sm flex flex-col items-center shadow-md"
                      onClick={() =>
                        handleButtonClick(
                          show.screen._id,
                          show.movie,
                          show,
                          formattedStartTime
                        )
                      }
                    >
                      <span className="font-semibold">
                        {formattedStartTime}
                      </span>
                      <span className="text-xs text-gray-300">
                        {show.screen.quality}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default BookingPage;

