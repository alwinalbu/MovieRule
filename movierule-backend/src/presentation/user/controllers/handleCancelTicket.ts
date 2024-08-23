
import { User } from "@/infrastructure/database/mogodb/models/userSchema";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Booking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { Reservation } from "../../../infrastructure/database/mogodb/models/Reservation";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";


export const handleCancelTicketController = (dependencies: IDependencies) => {
  const {
    useCases: { getBookingByIdUseCase },
  } = dependencies;

  const stripe = new Stripe(process.env.STRIPE_SECRET as string);

  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    console.log(id, "booking id here");

    try {
      const booking = await getBookingByIdUseCase(dependencies).execute(id);

      console.log(booking, "booking from mogo");

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      if (booking.paymentStatus !== "paid") {
        return res
          .status(400)
          .json({ error: "Only paid bookings can be canceled" });
      }

      // Retrieve the Checkout Session
      const session = await stripe.checkout.sessions.retrieve(
        booking.sessionId
      );

      if (!session.payment_intent) {
        return res
          .status(400)
          .json({ error: "Payment intent not found for this session" });
      }

      // Refund process
      const refund = await stripe.refunds.create({
        payment_intent: session.payment_intent as string,
        reason: "requested_by_customer",
      });

      // Update booking status

      // await Booking.updateOne(
      //   { _id: id },
      //   { $set: { paymentStatus: "refunded" } }
      // );

      await Booking.updateOne(
        { _id: id },
        {
          $set: {
            paymentStatus: "refunded",
            refundAmount: refund.amount / 100, // Stripe stores amounts in cents
            refundId: refund.id,
            refundDate: new Date(),
          },
        }
      );

      // Update the user's wallet balance
      await User.updateOne(
        { _id: booking.userId },
        { $inc: { walletBalance: refund.amount / 100 } } // Add the refund amount to the wallet balance
      );

      // Process all reservations for the given showId
      const showId = booking.showId;
      const selectedSeats = booking.selectedSeats;

      const reservations = await Reservation.find({ showId });

      for (const reservation of reservations) {
        const reservationSeats = reservation.reservedSeats;

        if (selectedSeats.every((seat) => reservationSeats.includes(seat))) {
          await Reservation.deleteOne({ _id: reservation._id });
        }
      }

      res.status(200).json({
        message: "Ticket canceled and refunded successfully",
        refund,
      });
    } catch (error) {
      console.error("Failed to cancel ticket:", error);
      res.status(500).json({ error: "Failed to cancel ticket" });
    }
  };
};
