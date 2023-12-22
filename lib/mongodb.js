import mongoose, { Mongoose } from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB is connected");
    }
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
