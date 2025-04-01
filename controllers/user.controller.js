import User from "../models/user.model.js";


//function to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    //controller to get all users
    const users = await User.find()
    return res.status(200).json({
        message: "All users fetched successfully",
        users,
        success: true

    });
  } catch (error) {
   next(error);
  }
};
//function to get a user
export const getUser = async (req, res, next) => {
  try {
    //controller to get all users
    const user = await User.findById(req.params.id).select('-password');
    //if no user 
    if (!user) {
        const error = new Error('No user found');
        error.statusCode = 404;
        throw error;
    }
    //serve a response if the fetch was successful
    return res.status(200).json({
        message: "user fetched successfully",
        user,
        success: true
    });
    // Catch an error if the fetch was unsuccessful
  } catch (error) {
   next(error);
  }
};


