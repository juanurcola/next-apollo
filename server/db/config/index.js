import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

const connection = {isConnected: null};

mongoose.set("strictQuery", false);

const connectDB = async () => {
  if (connection.isConnected) {
    console.log("MongoDB: Already connected");

    return;
  }

  const opts = {
    user: `${process.env.MONGO_USERNAME}`,
    pass: `${process.env.MONGO_PASSWORD}`,
    dbName: `${process.env.MONGO_DB}`,
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  console.log("\nMongoDB: Creating new connection");

  const db = await mongoose.connect(MONGO_URI, opts);

  console.log(`MongoDB: Hosted on ${db.connection.host}`);

  connection.isConnected = db.connections[0].readyState;
};

export default connectDB;
