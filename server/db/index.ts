import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

mongoose.set("strictQuery", false);

async function dbConnect() {
  if (cached.conn) {
    console.log("MongoDB: Already connected");

    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      user: `${process.env.MONGO_USERNAME}`,
      pass: `${process.env.MONGO_PASSWORD}`,
      dbName: `${process.env.MONGO_DB}`,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
    console.log("\nMongoDB: Creating new connection");
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB: Hosted on ${cached.conn.connection.host}`);
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
