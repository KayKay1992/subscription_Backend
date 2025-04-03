import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    //creating new subscription
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    //once we create a subscription and the user is authorised we serve a success message
    res
      .status(201)
      .json({ message: "Subscription created successfully", subscription });
  } catch (error) {
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

