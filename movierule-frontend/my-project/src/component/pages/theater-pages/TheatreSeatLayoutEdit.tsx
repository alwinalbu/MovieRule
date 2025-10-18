import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import screenImg from "../../../assets/images/screen.png";
import seatImg from "../../../assets/images/seat.svg";
import rSeat from "../../../assets/images/removeseat.svg";
import { Button, Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";

const TheatreSeatLayoutEdit = () => {
  const { screenId } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<(number | null)[][]>([]);
  const [originalLayout, setOriginalLayout] = useState<(number | null)[][]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Screen Layout
  const fetchScreenData = async () => {
    try {
      const response = await commonRequest(
        "GET",
        `/theater/screen-layout/${screenId}/`,
        config
      );
      const screenData = response.data;
      setLayout(screenData.layout);
      setOriginalLayout(screenData.layout);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load screen layout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreenData();
  }, [screenId]);

  // Toggle Seat
  const handleSeatClick = (rowIndex: number, colIndex: number) => {
    const newLayout = layout.map((row, rowIdx) =>
      row.map((seatId, colIdx) => {
        if (rowIdx === rowIndex && colIdx === colIndex) {
          return seatId ? null : originalLayout[rowIdx][colIdx];
        }
        return seatId;
      })
    );
    setLayout(newLayout);
  };

  // Save Layout
  const handleSave = async () => {
    try {
      const response = await commonRequest(
        "PUT",
        `/theater/update-layout/${screenId}/`,
        config,
        { layout }
      );
      if (response.status === 200) {
        toast.success("Layout saved successfully ✅");
        navigate(-1);
      } else {
        toast.error("Failed to save layout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save layout");
    }
  };

  // Reset to Original
  const handleReset = () => {
    setLayout(originalLayout);
    toast("Layout reset to original", { icon: "↩️" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Seat Layout</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Tap a seat to remove/restore it
        </p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* Seat Grid */}
          <div className="flex flex-col gap-1 sm:gap-2 items-center justify-center mb-6 overflow-x-auto">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 sm:gap-2">
                {row.map((seatId, colIndex) => (
                  <img
                    key={colIndex}
                    src={seatId ? seatImg : rSeat}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                    className="w-5 h-5 sm:w-8 sm:h-8 cursor-pointer hover:scale-110 transition-transform"
                    alt={`Seat ${rowIndex}-${colIndex}`}
                  />
                ))}
              </div>
            ))}

            {/* Screen Image */}
            <div className="mt-6">
              <img
                src={screenImg}
                className="max-w-[70%] sm:max-w-[80%] mx-auto"
                alt="Screen"
              />
              <p className="text-center text-gray-400 text-sm mt-2">
                Screen this way
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <img
                src={seatImg}
                className="w-4 h-4 sm:w-6 sm:h-6"
                alt="Available Seat"
              />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={rSeat}
                className="w-4 h-4 sm:w-6 sm:h-6"
                alt="Removed Seat"
              />
              <span>Removed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 flex-wrap">
            <Button
              onClick={handleReset}
              variant="bordered"
              className="text-gray-300 border-gray-500 hover:bg-gray-800 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm"
            >
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
            >
              Save Layout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TheatreSeatLayoutEdit;
