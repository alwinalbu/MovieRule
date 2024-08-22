import React from "react";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import MyPieChart from "./dashboard/MyPieChart";
import MostBookedMovies from "./dashboard/MostBookedMovies";

const Adminhome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Sidebar */}
      <header className="w-full bg-gray-800 text-white">
        <AdminSidebar />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {/* Pie Chart */}
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <MyPieChart />
          </section>

          {/* Most Booked Movies */}
          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Most Booked Movies</h2>
            <MostBookedMovies />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Adminhome;

