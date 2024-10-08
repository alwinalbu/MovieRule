import { useEffect, useState } from "react";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { commonRequest } from "../../../../config/api"; 
import { config } from "../../../../config/constants"; 
import toast from "react-hot-toast";

type MovieData = {
  title: string;
  totalBookings: number;
};

const chartSetting: Partial<BarChartProps> = {
  width: 600, 
  height: 400, 
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

export default function MostBookedMoviesChart() {
  const [dataset, setDataset] = useState<MovieData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/theater/get-ALLBookings",
          config
        );

        const transformedData: MovieData[] = response.data.bookings.map(
          (movie: any) => ({
            title: movie.title,
            totalBookings: movie.totalBookings,
          })
        );

        setDataset(transformedData);
      } catch (err: any) {
        toast.error("Failed to fetch movie data");
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: 2,
        boxSizing: "border-box",
        overflow: "hidden", 
      }}
    >
      <BarChart
        dataset={dataset}
        series={[
          { dataKey: "totalBookings", label: "Total Bookings", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </Box>
  );
}
