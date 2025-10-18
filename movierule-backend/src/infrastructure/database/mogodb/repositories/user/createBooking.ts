import { Booking, IBooking } from "../../models/BookingSchema";


export const createBooking = async (data:IBooking): Promise<IBooking|null> => {
  try {
    const newBooking = await Booking.create(data);
    return newBooking;
  } catch (error:any) {
    throw new Error((error as Error).message);
  }
};
