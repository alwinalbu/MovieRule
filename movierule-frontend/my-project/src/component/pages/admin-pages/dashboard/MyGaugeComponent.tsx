import React, { useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { TheaterEntity } from "../../../../interfaces/theater/Theaterinterface";
import { commonRequest } from "../../../../config/api";
import { config } from "../../../../config/constants";

const MyGaugeComponent: React.FC = () => {
  const [theaters, setTheaters] = useState<TheaterEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          "/admin/get-theaters",
          config
        );

        console.log(response, "responsed from backend");

        setTheaters(response.data.data);
      } catch (err) {
        setError("Failed to fetch theaters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Filter the active theaters
  const activeTheatersCount = theaters.filter(
    (theater) => theater.status === "active"
  ).length;



  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <Gauge
        value={activeTheatersCount}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {activeTheatersCount}%
      </div>
    </div>
  );
};

export default MyGaugeComponent;
