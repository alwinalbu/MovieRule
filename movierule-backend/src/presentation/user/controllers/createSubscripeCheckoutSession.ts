
import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { SubscriptionData } from "../../../domain/user/entities";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

export const createSubscripeCheckoutSession = (dependencies: IDependencies) => {
  const {
    useCases: { createUserSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET as string);

      const { amount, userId } = req.body;

      console.log(req.body, "req body");

      console.log(amount, "amount backend");
      console.log(userId, "user id backend");

      // Create Stripe checkout session for subscription
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "INR",
              product_data: {
                name: "Subscription Plan",
              },
              unit_amount: Math.floor(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment", // Use "payment" mode for one-time payments
        success_url: `http://localhost:5173/subscriptionSuccess?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`,
        cancel_url: `http://localhost:5173/subscriptionCancel?session_id={CHECKOUT_SESSION_ID}`,
      });

      // Update user with subscription details
      const subscriptionData: SubscriptionData = {
        status: "initiated",
        sessionId: session.id,
        amount: amount,
        paymentStatus: "pending",
      };

      const updatedUser = await createUserSubscriptionUseCase(
        dependencies
      ).execute(userId, subscriptionData);

      if (!updatedUser) {
        throw new Error("User subscription update failed");
      }

      console.log(updatedUser, "user is updated here in backend");

      res.status(200).json({
        success: true,
        id: session.id,
        message: "Subscription session created",
      });
    } catch (error: any) {
      console.error("Error creating subscription session", error);
      next(error);
    }
  };
};

