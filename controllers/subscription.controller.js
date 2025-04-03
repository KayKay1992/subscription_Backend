import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
      const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id,
      });
  
      // Validate URL before triggering workflow
      const reminderUrl = `${SERVER_URL}api/v1/workflows/subscriptions/reminder`;
      if (!reminderUrl.startsWith('http')) {
        console.error('Invalid server URL configured:', SERVER_URL);
        throw new Error('Server URL must include http:// or https://');
      }
  
      // Trigger workflow
      const { workflowRunId } = await workflowClient.trigger({
        url: reminderUrl,
        body: {
          subscriptionId: subscription._id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        retries: 0,
      });
  
      res.status(201).json({
        message: "Subscription created and reminder workflow triggered",
        workflowRunId,
        subscription
      });
  
    } catch (error) {
      console.error('Error in createSubscription:', error);
      
      if (!res.headersSent) {
        const status = error.status || 500;
        res.status(status).json({
          error: error.message || "Subscription creation failed",
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
      }
      
      next(error);
    }
  };
  
//controller to get user subscriptions

export const getUserSubscriptions = async (req, res, next) => {
  try {
    //check if the user is same as the one in the token
    if (req.user._id.toString()!== req.params.id) {
     const error = new Error('You are not the owner of this account')
     error.status = 401;
     throw error;
    }
    //But if you are authorized 
    const subscriptions = await Subscription.find({ user: req.params.id });
  
    //serve the success response
    res.status(200).json({ message: "User subscriptions", subscriptions });
    
  } catch (error) {
    next(error);
  }
};

