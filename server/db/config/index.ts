import mongoose, {connect} from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const mongodb = await connect(`${process.env.MONGO_URI}`, {
      user: `${process.env.MONGO_USERNAME}`,
      pass: `${process.env.MONGO_PASSWORD}`,
      dbName: `${process.env.MONGO_DB}`,
    });

    console.log(`MongoDB hosted on: ${mongodb.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
