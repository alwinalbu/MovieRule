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

      console.log("📩 Subscription request:", req.body);

      const isProduction = process.env.NODE_ENV === "production";
      const FRONTEND_URL = isProduction
        ? process.env.CLIENT_URL_PROD
        : process.env.CLIENT_URL_DEV;

      // ✅ Create Stripe Checkout session
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "INR",
              product_data: {
                name: "MovieRule Premium Subscription",
              },
              unit_amount: Math.floor(amount * 100), // convert INR → paise
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${FRONTEND_URL}/subscriptionSuccess?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`,
        cancel_url: `${FRONTEND_URL}/subscriptionCancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          userId,
          amount,
        },
      });

      // ✅ Save subscription initiation status
      const subscriptionData: SubscriptionData = {
        status: "initiated",
        sessionId: session.id,
        amount,
        paymentStatus: "pending",
      };

      const updatedUser = await createUserSubscriptionUseCase(
        dependencies
      ).execute(userId, subscriptionData);

      if (!updatedUser) {
        throw new Error("User subscription update failed");
      }

      console.log("✅ User subscription initialized:", updatedUser);

      return res.status(200).json({
        success: true,
        id: session.id,
        message: "Subscription checkout session created successfully",
      });
    } catch (error: any) {
      console.error("❌ Error creating subscription session:", error);
      next(error);
    }
  };
};
