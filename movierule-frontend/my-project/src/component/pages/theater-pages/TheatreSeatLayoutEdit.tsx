import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import screenImg from "../../../assets/images/screen.png";
import seatImg from "../../../assets/images/seat.svg";
import rSeat from "../../../assets/images/removeseat.svg";
import { Button, Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import _ from "lodash"; 

const TheatreSeatLayoutEdit = () => {
  const { screenId } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<(any | null)[][]>([]);
  const [originalLayout, setOriginalLayout] = useState<(any | null)[][]>([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch Screen Layout
  const fetchScreenData = async () => {
    try {
      const response = await commonRequest(
        "GET",
        `/theater/screen-layout/${screenId}/`,
        config
      );

      const screenData = response.data;

      // 🟢 Use `baseLayout` (original) for restoring seats
      setLayout(_.cloneDeep(screenData.layout));
      setOriginalLayout(
        _.cloneDeep(screenData.baseLayout || screenData.layout)
      );
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

  // 🟢 Toggle Seat between available <-> removed
  const handleSeatClick = (rowIndex: number, colIndex: number) => {
    const newLayout = layout.map((row, rowIdx) =>
      row.map((seat, colIdx) => {
        if (rowIdx === rowIndex && colIdx === colIndex) {
          // If seat is available, make it null
          // If seat is null (removed), restore from the permanent original layout
          return seat ? null : _.cloneDeep(originalLayout[rowIdx][colIdx]);
        }
        return seat;
      })
    );
    setLayout(newLayout);
  };

  // 🟢 Save the current layout
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

  // 🟢 Reset back to original layout
  const handleReset = () => {
    setLayout(_.cloneDeep(originalLayout));
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
                {row.map((seat, colIndex) => (
                  <img
                    key={colIndex}
                    src={seat ? seatImg : rSeat}
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
                alt="Available"
              />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={rSeat}
                className="w-4 h-4 sm:w-6 sm:h-6"
                alt="Removed"
              />
              <span>Removed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 flex-wrap">
            <Button onClick={handleReset} variant="bordered">
              Reset
            </Button>
            <Button onClick={handleSave} className="bg-red-600 text-white">
              Save Layout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TheatreSeatLayoutEdit;

