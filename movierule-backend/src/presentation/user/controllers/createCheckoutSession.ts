import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";


export const createCheckoutSessionController = (dependencies: IDependencies) => {

  const {
    useCases:{createBookingUseCase},
  }=dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET as string);

      // Extract data from request body
      const {
        selectedSeats,
        selectedItems,
        deliveryOptions,
        totalAmount,
        theaterName,
        screenName,
        showTime,
        movieName,
        movieImage,
        show,
        user
      } = req.body;

    

      console.log(user,"user id backend ");
      

      // Build line items array for Stripe
      const lineItems = [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Theater & Screen Details",
              description: `Theater: ${theaterName}, Screen: ${screenName}, Show Time: ${showTime}`,
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Movie Details",
              images: [movieImage],
              description: movieName
                ? `Movie: ${movieName}`
                : "Movie details not provided",
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
        ...selectedItems.map((item: any) => ({
          price_data: {
            currency: "INR",
            product_data: {
              name: item.name,
              images: [item.image], // Ensure this is an array
            },
            unit_amount: Math.floor(item.price * 100), // Convert to smallest currency unit
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Delivery Options",
              description:
                deliveryOptions.length > 0
                  ? deliveryOptions.join(", ")
                  : "No delivery options selected",
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Selected Seats",
              description:
                selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : "No seats selected",
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Total Amount",
            },
            unit_amount: Math.floor(parseFloat(totalAmount) * 100),
          },
          quantity: 1,
        },
      ];

      // Log line items for debugging
      console.log("Line Items:", lineItems);

      // Create Stripe checkout session
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/paymentCancel?session_id={CHECKOUT_SESSION_ID}`,
      });

        const bookingData:IBooking = {
          sessionId: session.id,
          userId:user,
          showId: show._id,
          theaterId: show.theater_id,
          screenId: show.screen,
          selectedSeats,
          selectedItems: selectedItems || [],
          deliveryOptions: deliveryOptions || [],
          totalAmount: parseFloat(totalAmount),
          paymentStatus: "pending",
        };

      const booking=await createBookingUseCase(dependencies).execute(bookingData)

      if(!booking){
        throw new Error("Booking Couldn't be created ");  
      }

      res.status(200).json({
        success: true,
        id: session.id,
        message: "Payment session created",
      });
    } catch (error: any) {
      console.error("Error creating checkout session", error);
      next(error);
    }
  };
};

