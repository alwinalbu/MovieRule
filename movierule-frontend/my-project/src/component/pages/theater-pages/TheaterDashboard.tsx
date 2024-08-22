// import React, { useEffect, useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
// import toast from "react-hot-toast";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import { RootState } from "../../../redux/store";
// import { useSelector } from "react-redux";
// import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { Spinner } from "@nextui-org/react";


// interface Booking {
//   theaterId: {
//     _id: string;
//     username: string;
//     city: string;
//   };
//   showId: {
//     _id: string;
//     movie: {
//       _id: string;
//       title: string;
//       rating: number;
//       posterPath: string;
//       backdrop_path: string;
//     };
//     show_name: string;
//     date: string;
//     start_time: string;
//   };
//   totalAmount: number;
//   selectedItems: Snack[];
//   paymentStatus:string;
// }

// interface Snack {
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface Stats {
//   movieTicketCount: { [title: string]: number }; // Change to use movie titles as keys
//   dailyBookings: { [day: string]: number };
//   monthlyBookings: { [month: string]: number };
//   yearlyBookings: { [year: string]: number };
//   totalRevenue: number;
//   mostPurchasedSnack: string;
//   canceledTicketsCount: number;
//   todaysRevenue: number;
// }

// const chartSetting: Partial<BarChartProps> = {
//   width: 600, // Adjust width as needed
//   height: 290, // Adjust height as needed
//   xAxis: [
//     {
//       label: "Total Bookings",
//     },
//   ],
//   yAxis: [
//     {
//       scaleType: "band",
//       dataKey: "title",
//     },
//   ],
//   grid: {
//     vertical: true,
//   },
// };

// const valueFormatter = (value: number | null) => (value ? `${value}` : "");

// const TheaterDashboard: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [barChartData, setBarChartData] = useState<any[]>([]);
//   const [pieData, setPieData] = useState<any[]>([]);
//   const { theaterOwner } = useSelector((state: RootState) => state.theater);
//   const theaterId = theaterOwner?._id;

//    const todaysdate = new Date().toISOString().split("T")[0];


//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await commonRequest(
//           "GET",
//           `/theater/bookings/${theaterId}`,
//           config
//         );

//         const bookings: Booking[] = response.data.bookings;
//         console.log(bookings, "response from backend");

        
        

//         let revenue = 0;
//         let todaysRevenue = 0;
//         let canceledTicketsCount = 0;
//         let movieTicketCount: { [title: string]: number } = {}; 
//         let monthlyBookings: { [month: string]: number } = {};
//         let yearlyBookings: { [year: string]: number } = {};
//         let snackCount: { [snackName: string]: number } = {};

//         bookings.forEach((booking) => {

//           console.log(booking.paymentStatus,"payment status");

//           if (
//             booking.theaterId._id === theaterId &&
//             booking.paymentStatus === "refunded"
//           ) {
//             canceledTicketsCount += 1;
//           }

//           if (booking.paymentStatus==="paid") {

//             const movieTitle = booking.showId.movie.title;
//             movieTicketCount[movieTitle] =
//               (movieTicketCount[movieTitle] || 0) + 1;

//             const date = new Date(booking.showId.date);
//             const day = date.toISOString().split("T")[0];
//             const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
//             const year = date.getFullYear().toString();

//              if (day === todaysdate) {
//                todaysRevenue += booking.totalAmount;
//              }
//              revenue += booking.totalAmount;

            
//             monthlyBookings[month] = (monthlyBookings[month] || 0) + booking.totalAmount;
//             yearlyBookings[year] = (yearlyBookings[year] || 0) + booking.totalAmount;

//              console.log(revenue, "revenue");
//              console.log(movieTicketCount, "movie ticket count");
//              console.log(monthlyBookings, "monthly bookings");
//              console.log(yearlyBookings, "yearly bookings");

//             booking.selectedItems.forEach((snack) => {
//               snackCount[snack.name] = (snackCount[snack.name] || 0) + 1;
//             });
//           }
//             console.log(booking.selectedItems, "selected items");
//         });
      
        

//         const mostSnack = Object.keys(snackCount).reduce((a, b) =>
//           snackCount[a] > snackCount[b] ? a : b
//         );


//         console.log(revenue, "revenue");
//         console.log(movieTicketCount, "movie ticket count");
//         console.log(monthlyBookings, "monthly bookings");
//         console.log(yearlyBookings, "yearly bookings");
//         console.log(mostSnack, "most purchased snack");

//         setStats({
//           totalRevenue: revenue,
//           movieTicketCount,
//           dailyBookings: { [todaysdate]: todaysRevenue },
//           monthlyBookings,
//           yearlyBookings,
//           mostPurchasedSnack: mostSnack,
//           canceledTicketsCount,
//           todaysRevenue,
//         });

         

//         // Prepare bar chart data
//          const movieData = Object.entries(movieTicketCount).map(
//            ([title, totalBookings]) => ({
//              title,
//              totalBookings,
//            })
//          );

//         setBarChartData(movieData);

//         // Prepare pie chart data
       
//         const monthlyRevenue = Object.values(monthlyBookings).reduce(
//           (a, b) => a + b,
//           0
//         );
//         const yearlyRevenue = Object.values(yearlyBookings).reduce(
//           (a, b) => a + b,
//           0
//         );

           

//         setPieData([
//           {
//             id: 0,
//             value: Object.keys(movieTicketCount).length,
//             label: "Total Movies",
//           },
//           { id: 1, value: todaysRevenue, label: "Daily Revenue" },
//           { id: 2, value: monthlyRevenue, label: "Monthly Revenue" },
//           { id: 3, value: yearlyRevenue, label: "Yearly Revenue" },
//         ]);
//       } catch (error) {
//         toast.error("Failed to fetch movie stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [theaterId]);

// console.log(stats, "stats from backend");
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {isOpen && (
//         <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       )}
//       <div className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
//           <button onClick={toggleSidebar} className="text-white">
//             <GiHamburgerMenu />
//           </button>
//           <h1 className="text-xl">Theater Dashboard</h1>
//           <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
//         </header>

//         <main className="flex-1 p-4">
//           {loading ? (
//             <div className="flex justify-center items-center">
//               <Spinner size="md" />
//             </div>
//           ) : !stats ? (
//             <div className="text-center">No Data Available Now</div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-3">
//                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold">Today's Revenue</h2>
//                   <p className="mt-2 text-2xl  text-green-500">
//                     ₹{stats.todaysRevenue.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold">Total Revenue</h2>
//                   <p className="mt-2 text-2xl  text-green-500">
//                     ₹{stats.totalRevenue.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold">Most Purchased Snack</h2>
//                   <p className="mt-2 text-2xl  text-pink-600">
//                     {stats.mostPurchasedSnack}
//                   </p>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold">Tickets Sold</h2>
//                   <p className="mt-2 text-2xl text-yellow-400">
//                     {Object.values(stats.movieTicketCount).reduce(
//                       (a, b) => a + b,
//                       0
//                     )}
//                   </p>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold">Tickets Cancelled</h2>
//                   <p className="mt-2 text-2xl text-red-500">
//                     {stats.canceledTicketsCount}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold text-black">
//                     Most Booked Movies
//                   </h2>
//                   <div className="h-full flex justify-center items-center">
//                     <BarChart
//                       dataset={barChartData}
//                       series={[
//                         {
//                           dataKey: "totalBookings",
//                           label: "Total Bookings",
//                           valueFormatter,
//                         },
//                       ]}
//                       layout="horizontal"
//                       {...chartSetting}
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                   <h2 className="text-lg font-bold text-black">
//                     Revenue Breakdown
//                   </h2>
//                   <div className="h-full">
//                     <PieChart
//                       series={[
//                         {
//                           data: pieData,
//                           highlightScope: {
//                             faded: "global",
//                             highlighted: "item",
//                           },
//                           faded: {
//                             innerRadius: 30,
//                             additionalRadius: -30,
//                             color: "gray",
//                           },
//                         },
//                       ]}
//                       height={200}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default TheaterDashboard;

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
import toast from "react-hot-toast";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Spinner } from "@nextui-org/react";

interface Booking {
  theaterId: {
    _id: string;
    username: string;
    city: string;
  };
  showId: {
    _id: string;
    movie: {
      _id: string;
      title: string;
      rating: number;
      posterPath: string;
      backdrop_path: string;
    };
    show_name: string;
    date: string;
    start_time: string;
  };
  totalAmount: number;
  selectedItems: Snack[];
  paymentStatus: string;
}

interface Snack {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Stats {
  movieTicketCount: { [title: string]: number }; // Change to use movie titles as keys
  dailyBookings: { [day: string]: number };
  monthlyBookings: { [month: string]: number };
  yearlyBookings: { [year: string]: number };
  totalRevenue: number;
  mostPurchasedSnack: string;
  canceledTicketsCount: number;
  todaysRevenue: number;
}

const chartSetting: Partial<BarChartProps> = {
  width: 600, // Adjust width as needed
  height: 290, // Adjust height as needed
  xAxis: [
    {
      label: "Total Bookings",
    },
  ],
  yAxis: [
    {
      scaleType: "band",
      dataKey: "title",
    },
  ],
  grid: {
    vertical: true,
  },
};

const valueFormatter = (value: number | null) => (value ? `${value}` : "");

const TheaterDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const { theaterOwner } = useSelector((state: RootState) => state.theater);
  const theaterId = theaterOwner?._id;

  const todaysdate = new Date().toISOString().split("T")[0];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await commonRequest(
        "GET",
        `/theater/bookings/${theaterId}`,
        config
      );

      const bookings: Booking[] = response.data.bookings;
      console.log(bookings, "response from backend");

      let revenue = 0;
      let todaysRevenue = 0;
      let canceledTicketsCount = 0;
      let movieTicketCount: { [title: string]: number } = {};
      let monthlyBookings: { [month: string]: number } = {};
      let yearlyBookings: { [year: string]: number } = {};
      let snackCount: { [snackName: string]: number } = {};

      bookings.forEach((booking) => {
        console.log(booking.paymentStatus, "payment status");

        if (
          booking.theaterId._id === theaterId &&
          booking.paymentStatus === "refunded"
        ) {
          canceledTicketsCount += 1;
        }

        if (booking.paymentStatus === "paid") {
          const movieTitle = booking.showId.movie.title;
          movieTicketCount[movieTitle] =
            (movieTicketCount[movieTitle] || 0) + 1;

          const date = new Date(booking.showId.date);
          const day = date.toISOString().split("T")[0];
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
          const year = date.getFullYear().toString();

          if (day === todaysdate) {
            todaysRevenue += booking.totalAmount;
          }
          revenue += booking.totalAmount;

          monthlyBookings[month] =
            (monthlyBookings[month] || 0) + booking.totalAmount;
          yearlyBookings[year] =
            (yearlyBookings[year] || 0) + booking.totalAmount;

          console.log(revenue, "revenue");
          console.log(movieTicketCount, "movie ticket count");
          console.log(monthlyBookings, "monthly bookings");
          console.log(yearlyBookings, "yearly bookings");

          // Only process snacks if they exist in the booking
          if (booking.selectedItems && booking.selectedItems.length > 0) {
            booking.selectedItems.forEach((snack) => {
              snackCount[snack.name] = (snackCount[snack.name] || 0) + 1;
            });
          }
          console.log(booking.selectedItems, "selected items");
        }
      });

      const mostSnack = Object.keys(snackCount).length
        ? Object.keys(snackCount).reduce((a, b) =>
            snackCount[a] > snackCount[b] ? a : b
          )
        : "No snacks purchased";

      console.log(revenue, "revenue");
      console.log(movieTicketCount, "movie ticket count");
      console.log(monthlyBookings, "monthly bookings");
      console.log(yearlyBookings, "yearly bookings");
      console.log(mostSnack, "most purchased snack");

      setStats({
        totalRevenue: revenue,
        movieTicketCount,
        dailyBookings: { [todaysdate]: todaysRevenue },
        monthlyBookings,
        yearlyBookings,
        mostPurchasedSnack: mostSnack,
        canceledTicketsCount,
        todaysRevenue,
      });

      // Prepare bar chart data
      const movieData = Object.entries(movieTicketCount).map(
        ([title, totalBookings]) => ({
          title,
          totalBookings,
        })
      );

      setBarChartData(movieData);

      // Prepare pie chart data
      const monthlyRevenue = Object.values(monthlyBookings).reduce(
        (a, b) => a + b,
        0
      );
      const yearlyRevenue = Object.values(yearlyBookings).reduce(
        (a, b) => a + b,
        0
      );

      setPieData([
        {
          id: 0,
          value: Object.keys(movieTicketCount).length,
          label: "Total Movies",
        },
        { id: 1, value: todaysRevenue, label: "Daily Revenue" },
        { id: 2, value: monthlyRevenue, label: "Monthly Revenue" },
        { id: 3, value: yearlyRevenue, label: "Yearly Revenue" },
      ]);
    } catch (error) {
      toast.error("Failed to fetch movie stats");
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [theaterId]);


  console.log(stats, "stats from backend");
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isOpen && (
        <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <button onClick={toggleSidebar} className="text-white">
            <GiHamburgerMenu />
          </button>
          <h1 className="text-xl">Theater Dashboard</h1>
          <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
        </header>

        <main className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner size="md" />
            </div>
          ) : !stats ? (
            <div className="text-center">No Data Available Now</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-3">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold">Today's Revenue</h2>
                  <p className="mt-2 text-2xl  text-green-500">
                    ₹{stats.todaysRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold">Total Revenue</h2>
                  <p className="mt-2 text-2xl  text-green-500">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold">Most Purchased Snack</h2>
                  <p className="mt-2 text-2xl  text-pink-600">
                    {stats.mostPurchasedSnack}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold">Tickets Sold</h2>
                  <p className="mt-2 text-2xl text-yellow-400">
                    {Object.values(stats.movieTicketCount).reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold">Tickets Cancelled</h2>
                  <p className="mt-2 text-2xl text-red-500">
                    {stats.canceledTicketsCount}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold text-black">
                    Most Booked Movies
                  </h2>
                  <div className="h-full flex justify-center items-center">
                    <BarChart
                      dataset={barChartData}
                      series={[
                        {
                          dataKey: "totalBookings",
                          label: "Total Bookings",
                          valueFormatter,
                        },
                      ]}
                      layout="horizontal"
                      {...chartSetting}
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold text-black">
                    Revenue Breakdown
                  </h2>
                  <div className="h-full">
                    <PieChart
                      series={[
                        {
                          data: pieData,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                        },
                      ]}
                      height={200}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TheaterDashboard;
