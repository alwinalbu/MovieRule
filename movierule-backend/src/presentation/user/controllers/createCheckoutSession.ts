// import { IDependencies } from "../../../application/user/interfaces/IDependencies";
// import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
// import { NextFunction, Request, Response } from "express";
// import Stripe from "stripe";

// export const createCheckoutSessionController = (
//   dependencies: IDependencies
// ) => {
//   const {
//     useCases: { createBookingUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const stripeInstance = new Stripe(process.env.STRIPE_SECRET as string);

//       const {
//         selectedSeats = [],
//         selectedItems = [],
//         deliveryOptions = [],
//         totalAmount,
//         theaterName,
//         screenName,
//         showTime,
//         movieName,
//         movieImage,
//         show,
//         user,
//       } = req.body;

//       const totalNumber = Math.max(0, Number(parseFloat(totalAmount) || 0));
//       const totalInPaise = Math.round(totalNumber * 100); 

//       const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "Theater & Screen Details",
//               description: `Theater: ${theaterName || "N/A"}, Screen: ${
//                 screenName || "N/A"
//               }, Show Time: ${showTime || "N/A"}`,
//             },
//             unit_amount: 0,
//           },
//           quantity: 1,
//         },
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "Movie Details",
//               images: movieImage ? [movieImage] : undefined,
//               description: movieName
//                 ? `Movie: ${movieName}`
//                 : "Movie details not provided",
//             },
//             unit_amount: 0,
//           },
//           quantity: 1,
//         },
      
//         ...((selectedItems || []).map((item: any) => ({
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: item.name,
//               images: item.image ? [item.image] : undefined,
//               description: item.description || undefined,
//             },
//             unit_amount: 0, // kept as 0 to match your existing concept
//           },
//           quantity: item.quantity || 1,
//         })) as Stripe.Checkout.SessionCreateParams.LineItem[]),
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "Selected Seats",
//               description:
//                 selectedSeats && selectedSeats.length > 0
//                   ? selectedSeats.join(", ")
//                   : "No seats selected",
//             },
//             unit_amount: 0,
//           },
//           quantity: 1,
//         },
     
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "Total Amount",
//             },
//             unit_amount: totalInPaise,
//           },
//           quantity: 1,
//         },
//       ];

      
//       const session = await stripeInstance.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         // attach small useful metadata (limited size per key). If you need full JSON, stringify it.
//         metadata: {
//           userId: String(user),
//           showId: show?._id ? String(show._id) : "",
//           selectedSeats: JSON.stringify(selectedSeats || []),
//           selectedItems: JSON.stringify(selectedItems || []),
//           deliveryOptions: JSON.stringify(deliveryOptions || []),
//           client_total: String(totalNumber),
//         },
//         success_url: `${process.env.CLIENT_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.CLIENT_URL}/paymentCancel?session_id={CHECKOUT_SESSION_ID}`,
//       });

//       // Save booking (same as your flow)
//       const bookingData: IBooking = {
//         sessionId: session.id,
//         userId: user,
//         showId: show._id,
//         theaterId: show.theater_id,
//         screenId: show.screen,
//         selectedSeats,
//         selectedItems: selectedItems || [],
//         deliveryOptions: deliveryOptions || [],
//         totalAmount: totalNumber,
//         paymentStatus: "pending",
//       };

//       const booking = await createBookingUseCase(dependencies).execute(
//         bookingData
//       );

//       if (!booking) throw new Error("Booking couldn't be created");

//       res
//         .status(200)
//         .json({
//           success: true,
//           id: session.id,
//           message: "Payment session created",
//         });
//     } catch (error: any) {
//       console.error("Error creating checkout session", error);
//       next(error);
//     }
//   };
// };

import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { IBooking } from "../../../infrastructure/database/mogodb/models/BookingSchema";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

export const createCheckoutSessionController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { createBookingUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET as string);

      const {
        selectedSeats = [],
        selectedItems = [],
        deliveryOptions = [],
        totalAmount,
        theaterName,
        screenName,
        showTime,
        movieName,
        movieImage,
        show,
        user,
      } = req.body;

      const totalNumber = Math.max(0, Number(parseFloat(totalAmount) || 0));
      const totalInPaise = Math.round(totalNumber * 100);

      // ✅ Detect environment
      const isProduction = process.env.NODE_ENV === "production";
      const FRONTEND_URL = isProduction
        ? process.env.CLIENT_URL_PROD || "https://movie-rule.vercel.app"
        : process.env.CLIENT_URL_DEV || "http://localhost:5173";

      // ✅ Stripe line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Theater & Screen Details",
              description: `Theater: ${theaterName || "N/A"}, Screen: ${
                screenName || "N/A"
              }, Show Time: ${showTime || "N/A"}`,
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
              images: movieImage ? [movieImage] : undefined,
              description: movieName
                ? `Movie: ${movieName}`
                : "Movie details not provided",
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
        ...((selectedItems || []).map((item: any) => ({
          price_data: {
            currency: "INR",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : undefined,
              description: item.description || undefined,
            },
            unit_amount: 0,
          },
          quantity: item.quantity || 1,
        })) as Stripe.Checkout.SessionCreateParams.LineItem[]),
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Selected Seats",
              description:
                selectedSeats && selectedSeats.length > 0
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
            unit_amount: totalInPaise,
          },
          quantity: 1,
        },
      ];

      // ✅ Stripe Checkout Session
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        metadata: {
          userId: String(user),
          showId: show?._id ? String(show._id) : "",
          selectedSeats: JSON.stringify(selectedSeats || []),
          selectedItems: JSON.stringify(selectedItems || []),
          deliveryOptions: JSON.stringify(deliveryOptions || []),
          client_total: String(totalNumber),
        },
        success_url: `${FRONTEND_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/paymentCancel?session_id={CHECKOUT_SESSION_ID}`,
      });

      // ✅ Save booking in DB
      const bookingData: IBooking = {
        sessionId: session.id,
        userId: user,
        showId: show._id,
        theaterId: show.theater_id,
        screenId: show.screen,
        selectedSeats,
        selectedItems: selectedItems || [],
        deliveryOptions: deliveryOptions || [],
        totalAmount: totalNumber,
        paymentStatus: "pending",
      };

      const booking = await createBookingUseCase(dependencies).execute(
        bookingData
      );

      if (!booking) throw new Error("Booking couldn't be created");

      return res.status(200).json({
        success: true,
        id: session.id,
        message: "Payment session created",
      });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      next(error);
    }
  };
};

