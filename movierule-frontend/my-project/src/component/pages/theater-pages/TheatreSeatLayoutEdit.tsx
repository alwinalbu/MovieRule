import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import screenImg from "../../../assets/images/screen.png";
import seatImg from "../../../assets/images/seat.svg";
import rSeat from "../../../assets/images/removeseat.svg";
import { Button } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";

const TheatreSeatLayoutEdit = () => {
  const { screenId } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<(number | null)[][]>([]);
  const [originalLayout, setOriginalLayout] = useState<(number | null)[][]>([]);

  console.log(screenId, "front end theater seat layout screen id");

  const fetchScreenData = async () => {
    try {
      const response = await commonRequest(
        "GET",
        `/theater/screen-layout/${screenId}/`,
        config
      );
      const screenData = response.data;

      console.log(screenData, "screendata from backend in front end");

      setLayout(screenData.layout);
      setOriginalLayout(screenData.layout); // Store the original layout
    } catch (error) {
      console.log(error);
      toast.error("Failed to get screen data");
    }
  };

  useEffect(() => {
    fetchScreenData();
  }, [screenId]);

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

  const handleSave = async () => {
    try {
      const response = await commonRequest(
        "PUT",
        `/theater/update-layout/${screenId}/`,
        config,
        { layout }
      );

      if (response.status === 200) {
        toast.success("Layout saved successfully");
        navigate(-1); 
      } else {
        toast.error("Failed to save layout");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save layout");
    }
  };

  return (
    <>
      
      <div className="h-screen bg-black p-4">
        <div className="flex items-center justify-center font-semibold text-2xl mt-4 mb-8 text-white">
          <h1>Edit Seat Layout</h1>
        </div>
        <div className="grid gap-2 flex-row items-center justify-center">
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center">
              {row.map((seatId, colIndex) => (
                <React.Fragment key={colIndex}>
                  {seatId ? (
                    <img
                      src={seatImg}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      className="w-8 h-8 mr-2 cursor-pointer"
                      alt={`Seat ${rowIndex}-${colIndex}`}
                    />
                  ) : (
                    <img
                      src={rSeat}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      className="w-8 h-8 mr-2 cursor-pointer"
                      alt={`Seat ${rowIndex}-${colIndex}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
          <div className="flex items-center justify-center mt-4">
            <img src={screenImg} className="max-w-[85%]" alt="Screen" />
          </div>
        </div>
        <div className="flex justify-center items-center mt-9">
          <Button
            onClick={handleSave}
            variant="shadow"
            className="bg-indigo-500"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default TheatreSeatLayoutEdit;
