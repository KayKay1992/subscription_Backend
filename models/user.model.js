import mongoose from "mongoose";

//create a userSchema object

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username required"],
    unique: true,
    trim: true,
    minLength: 2,
    maxLength: 55,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
    minLength: [6, "password must not be less than 6"],
  },
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
 
}, //timestamp will track creation and modification date i.e createdAt, updatedAt, 
  { timestamps: true });

  //create a User model using userSchema
  const User = mongoose.model("User", userSchema);
  export default User;

