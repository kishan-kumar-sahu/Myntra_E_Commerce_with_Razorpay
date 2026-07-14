import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [
      {
        productId: String,
        title: String,
        imgSrc: String,
        qty: Number,
        price: Number
      }
    ],

    amount: {
      type: Number,
      required: true
    },

    paymentId: String,

    payStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: ["placed", "packed", "shipped", "delivered"],
      default: "placed"
    },

    userShipping: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      phoneNumber: String
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
