import React, { useState } from "react";

const Seat = ({ seatNumber, isSelected, onSelect }) => {
  return (
    <div
      className={`w-12 h-12 m-1 flex items-center justify-center cursor-pointer ${
        isSelected ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={() => onSelect(seatNumber)}
    >
      {seatNumber}
    </div>
  );
};

const SeatSelection= () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((num) => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const seats = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap max-w-md mx-auto">
      {seats.map((seat) => (
        <Seat
          key={seat}
          seatNumber={seat}
          isSelected={selectedSeats.includes(seat)}
          onSelect={handleSelectSeat}
        />
      ))}
    </div>
  );
};

export default SeatSelection;
