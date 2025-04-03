import mongoose from "mongoose";

//define subscriptionSchema

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price must be greater than zero"],
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["USD", "EUR", "GBP", "NGN"],
      default: "NGN",
    },
    frequency: {
      type: String,
      required: [true, "frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "weekly",
    },
    category: {
      type: String,
      required: [true, "category is required"],
      enum: [
        "sports",
        "news",
        "career",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "others",
      ],
      default: "technology",
    },
    paymentMethod: {
      type: String,
      required: [true, "payment method is required"],
      enum: ["card", "paypal", "bank transfer"],
      default: "card",
    },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
        type: Date,
        // required: [true, "renewal date is required"],
        validate: {
            validator: function (value)
            {return value > this.startDate},
            message: "Renewal date must be a future date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
  },
  { timestamps: true }
);

// A function that will happen before each one of the document is created.

//AutoCalculate the nenewal date if missing
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily:1,
            weekly:7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
      ;
    }
    //updating the status of the subscription if renewal date hase passed.
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();

})

//create the subscription model

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
