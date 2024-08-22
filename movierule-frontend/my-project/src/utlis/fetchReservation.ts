import { commonRequest } from "../config/api";
import { config } from "../config/constants";



const fetchReservation = async (showId: string): Promise<string[]> => {
  try {
    const response = await commonRequest("GET",`/reservations/${showId}`,config);
    return response.data.reservedSeats;
  } catch (error) {
    console.error("Failed to fetch reservation", error);
    return [];
  }
};

export default fetchReservation;
