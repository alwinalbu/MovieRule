// import React, { useEffect, useState } from "react";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import toast, { Toaster } from "react-hot-toast";
// import { format, parseISO, parse } from "date-fns";
// import { useNavigate, useParams } from "react-router-dom";
// import { IMovie } from "../../Movies/IMovie";

// interface Screen {
//   _id: string;
//   name: string;
//   quality: string;
// }

// interface Theater {
//   _id: string;
//   username: string;
// }

//  export interface Show {
//   _id: string;
//   theater_id: Theater;
//   movie: IMovie;
//   screen: Screen;
//   show_name: string;
//   date: string;
//   start_time: string;
//   end_time: string;
// }

// const formatTime = (time: string) => {
//   try {
//     const parsedDate = parse(time, "HH:mm", new Date());
//     return format(parsedDate, "h:mm a");
//   } catch (error) {
//     console.error("Error formatting time:", error);
//     return "Invalid time";
//   }
// };

// const BookingPage: React.FC = () => {
//   const { movie_id } = useParams<{ movie_id: string }>();
//   const [shows, setShows] = useState<Show[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [movieDetails, setMovieDetails] = useState<IMovie | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         const response = await commonRequest(
//           "GET",
//           `/movies/${movie_id}/available-shows/`,
//           config
//         );
//         console.log(response.data.data, "response from backend");
//         setShows(response.data.data);
//         setSelectedDate(response.data.data[0]?.date || "");
//         if (response.data.data.length > 0) {
//           setMovieDetails(response.data.data[0].movie);
//         }
//       } catch (err) {
//         setError("Failed to fetch shows");
//         toast.error("Failed to fetch shows");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShows();
//   }, [movie_id]);

//   // const handleButtonClick = (screenId: string) => {
//   //   navigate(`/screen-layout/${screenId}`);
//   // };

//   const handleButtonClick = (
//     screenId: string,
//     movie: IMovie,
//     show:Show,
//     formattedStartTime: string
//   ) => {
//     navigate(`/screen-layout/${screenId}`, {
//       state: { movie, show,startTime: formattedStartTime },
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const groupShowsByDate = (shows: Show[]) => {
//     return shows.reduce((acc: { [key: string]: Show[] }, show) => {
//       const date = format(parseISO(show.date), "yyyy-MM-dd");
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(show);
//       return acc;
//     }, {});
//   };

//   const sortedShowsByDate = (shows: { [key: string]: Show[] }) => {
//     Object.keys(shows).forEach((date) => {
//       shows[date].sort((a, b) => {
//         return (
//           parseISO(a.start_time).getTime() - parseISO(b.start_time).getTime()
//         );
//       });
//     });
//     return shows;
//   };

//   const groupShowsByTheater = (shows: Show[]) => {
//     return shows.reduce((acc: { [key: string]: Show[] }, show) => {
//       const theaterId = show.theater_id._id;
//       if (!acc[theaterId]) {
//         acc[theaterId] = [];
//       }
//       acc[theaterId].push(show);
//       return acc;
//     }, {});
//   };

//   const showsGroupedByDate = sortedShowsByDate(groupShowsByDate(shows));
//   const showsGroupedByTheater = groupShowsByTheater(
//     showsGroupedByDate[selectedDate] || []
//   );

//   return (
//     <>
//       <Toaster />
//       <div className="min-h-screen bg-white">
//         <main className=" py-3">
//           <div className="container mx-auto">
//             {shows.length > 0 && (
//               <div className="mb-6">
//                 <img
//                   src={shows[0].movie.backdrop_path}
//                   alt={shows[0].movie.title}
//                   className="w-full h-64 object-cover mb-4 rounded-lg"
//                 />
//                 <h1 className="text-3xl font-bold mb-2 text-gray-800">
//                   {shows[0].movie.title}
//                 </h1>
//               </div>
//             )}
//             <div className="mb-6">
//               <div className="flex space-x-2 mb-6">
//                 {Object.keys(showsGroupedByDate).map((date) => (
//                   <button
//                     key={date}
//                     className={`px-4 py-2 rounded-md ${
//                       selectedDate === date
//                         ? "text-white bg-red-500"
//                         : "text-gray-800 bg-gray-200"
//                     }`}
//                     onClick={() => setSelectedDate(date)}
//                   >
//                     {format(parseISO(date), "EEE dd MMM")}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {Object.entries(showsGroupedByTheater).map(([theaterId, shows]) => (
//               <div key={theaterId} className="mb-6">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                   {shows[0].theater_id.username}
//                 </h2>
//                 <div className="flex flex-col space-y-4">
//                   <div className="bg-white p-4 rounded-lg shadow min-w-max flex-none">
//                     <div className="flex justify-between gap-4 items-center">
//                       <div className="flex gap-4">
//                         {shows.map((show) => {
//                           const formattedStartTime = formatTime(
//                             show.start_time
//                           );
//                           return (
//                             <div
//                               key={show._id}
//                               className="flex space-x-2 overflow-x-auto"
//                             >
//                               <button
//                                 className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:text-white hover:bg-red-500 transition-colors duration-300 flex items-center space-x-2"
//                                 onClick={() =>
//                                   handleButtonClick(
//                                     show.screen._id,
//                                     show.movie,
//                                     show,
//                                     formattedStartTime
//                                   )
//                                 }
//                               >
//                                 <span>{formattedStartTime}</span>
//                                 <span className="text-sm text-blue-950">
//                                   {show.screen.quality}
//                                 </span>
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                       <div className="text-gray-600">
//                         Cancellation Available
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default BookingPage;

// import React, { useEffect, useState } from "react";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import toast, { Toaster } from "react-hot-toast";
// import { format, parseISO, parse, isBefore } from "date-fns";
// import { useNavigate, useParams } from "react-router-dom";
// import { IMovie } from "../../Movies/IMovie";

// interface Screen {
//   _id: string;
//   name: string;
//   quality: string;
// }

// interface Theater {
//   _id: string;
//   username: string;
// }

// export interface Show {
//   _id: string;
//   theater_id: Theater;
//   movie: IMovie;
//   screen: Screen;
//   show_name: string;
//   date: string;
//   start_time: string;
//   end_time: string;
// }

// const formatTime = (time: string) => {
//   try {
//     const parsedDate = parse(time, "HH:mm", new Date());
//     return format(parsedDate, "h:mm a");
//   } catch (error) {
//     console.error("Error formatting time:", error);
//     return "Invalid time";
//   }
// };

// const BookingPage: React.FC = () => {
//   const { movie_id } = useParams<{ movie_id: string }>();
//   const [shows, setShows] = useState<Show[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [movieDetails, setMovieDetails] = useState<IMovie | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         const response = await commonRequest(
//           "GET",
//           `/movies/${movie_id}/available-shows/`,
//           config
//         );
//         console.log(response.data.data, "response from backend");
//         setShows(response.data.data);
//         setSelectedDate(response.data.data[0]?.date || "");
//         if (response.data.data.length > 0) {
//           setMovieDetails(response.data.data[0].movie);
//         }
//       } catch (err) {
//         setError("Failed to fetch shows");
//         toast.error("Failed to fetch shows");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShows();
//   }, [movie_id]);

//   const handleButtonClick = (
//     screenId: string,
//     movie: IMovie,
//     show: Show,
//     formattedStartTime: string
//   ) => {
//     navigate(`/screen-layout/${screenId}`, {
//       state: { movie, show, startTime: formattedStartTime },
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const groupShowsByDate = (shows: Show[]) => {
//     const currentDate = new Date();

//     return shows.reduce((acc: { [key: string]: Show[] }, show) => {
//       const showDate = parseISO(show.date);
//       if (isBefore(showDate, currentDate)) {
//         return acc; // Skip dates before the current date
//       }
//       const date = format(showDate, "yyyy-MM-dd");
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(show);
//       return acc;
//     }, {});
//   };

//   const sortedShowsByDate = (shows: { [key: string]: Show[] }) => {
//     Object.keys(shows).forEach((date) => {
//       shows[date].sort((a, b) => {
//         return (
//           parseISO(a.start_time).getTime() - parseISO(b.start_time).getTime()
//         );
//       });
//     });
//     return shows;
//   };

//   const groupShowsByTheater = (shows: Show[]) => {
//     return shows.reduce((acc: { [key: string]: Show[] }, show) => {
//       const theaterId = show.theater_id._id;
//       if (!acc[theaterId]) {
//         acc[theaterId] = [];
//       }
//       acc[theaterId].push(show);
//       return acc;
//     }, {});
//   };

//   const showsGroupedByDate = sortedShowsByDate(groupShowsByDate(shows));
//   const showsGroupedByTheater = groupShowsByTheater(
//     showsGroupedByDate[selectedDate] || []
//   );

//   return (
//     <>
//       <Toaster />
//       <div className="min-h-screen bg-white">
//         <main className=" py-3">
//           <div className="container mx-auto">
//             {shows.length > 0 && (
//               <div className="mb-6">
//                 <img
//                   src={shows[0].movie.backdrop_path}
//                   alt={shows[0].movie.title}
//                   className="w-full h-64 object-cover mb-4 rounded-lg"
//                 />
//                 <h1 className="text-3xl font-bold mb-2 text-gray-800">
//                   {shows[0].movie.title}
//                 </h1>
//               </div>
//             )}
//             <div className="mb-6">
//               <div className="flex space-x-2 mb-6">
//                 {Object.keys(showsGroupedByDate).map((date) => (
//                   <button
//                     key={date}
//                     className={`px-4 py-2 rounded-md ${
//                       selectedDate === date
//                         ? "text-white bg-red-500"
//                         : "text-gray-800 bg-gray-200"
//                     }`}
//                     onClick={() => setSelectedDate(date)}
//                   >
//                     {format(parseISO(date), "EEE dd MMM")}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {Object.entries(showsGroupedByTheater).map(([theaterId, shows]) => (
//               <div key={theaterId} className="mb-6">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                   {shows[0].theater_id.username}
//                 </h2>
//                 <div className="flex flex-col space-y-4">
//                   <div className="bg-white p-4 rounded-lg shadow min-w-max flex-none">
//                     <div className="flex justify-between gap-4 items-center">
//                       <div className="flex gap-4">
//                         {shows.map((show) => {
//                           const formattedStartTime = formatTime(
//                             show.start_time
//                           );
//                           return (
//                             <div
//                               key={show._id}
//                               className="flex space-x-2 overflow-x-auto"
//                             >
//                               <button
//                                 className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:text-white hover:bg-red-500 transition-colors duration-300 flex items-center space-x-2"
//                                 onClick={() =>
//                                   handleButtonClick(
//                                     show.screen._id,
//                                     show.movie,
//                                     show,
//                                     formattedStartTime
//                                   )
//                                 }
//                               >
//                                 <span>{formattedStartTime}</span>
//                                 <span className="text-sm text-blue-950">
//                                   {show.screen.quality}
//                                 </span>
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                       <div className="text-gray-600">
//                         Cancellation Available
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default BookingPage;

import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { format, parseISO, parse, isBefore, isSameDay } from "date-fns";
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
  const [movieDetails, setMovieDetails] = useState<IMovie | null>(null);

  const navigate = useNavigate();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const groupShowsByDate = (shows: Show[]) => {
    const currentDate = new Date();

    return shows.reduce((acc: { [key: string]: Show[] }, show) => {
      const showDate = parseISO(show.date);
      const showDateTime = parse(show.start_time, "HH:mm", showDate);

      // Skip dates before the current date or times past the current time on the same date
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
      <div className="min-h-screen bg-white">
        <main className="py-3">
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
                        {shows.map((show) => {
                          const formattedStartTime = formatTime(
                            show.start_time
                          );
                          return (
                            <div
                              key={show._id}
                              className="flex space-x-2 overflow-x-auto"
                            >
                              <button
                                className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:text-white hover:bg-red-500 transition-colors duration-300 flex items-center space-x-2"
                                onClick={() =>
                                  handleButtonClick(
                                    show.screen._id,
                                    show.movie,
                                    show,
                                    formattedStartTime
                                  )
                                }
                              >
                                <span>{formattedStartTime}</span>
                                <span className="text-sm text-blue-950">
                                  {show.screen.quality}
                                </span>
                              </button>
                            </div>
                          );
                        })}
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
