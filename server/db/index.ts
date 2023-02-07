import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.set("strictQuery", false);

//     const mongodb = await connect(`${process.env.MONGO_URI}`, {
//       user: `${process.env.MONGO_USERNAME}`,
//       pass: `${process.env.MONGO_PASSWORD}`,
//       dbName: `${process.env.MONGO_DB}`,
//     });

//     console.log(`MongoDB hosted on: ${mongodb.connection.host}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

//  export default connectDB;

let connections = 0;

const connect = async () => {
  try {
    if (connections) {
      console.log("MongoDB: Already connected");

      return;
    }

    if (mongoose.connections.length > 0) {
      connections = mongoose.connections[0].readyState;

      if (connections === 1) {
        console.log("MongoDB: Using previous connection");

        return;
      }

      await mongoose.disconnect();
    }

    mongoose.set("strictQuery", false);

    const mongodb = await mongoose.connect(`${process.env.MONGO_URI}`, {
      user: `${process.env.MONGO_USERNAME}`,
      pass: `${process.env.MONGO_PASSWORD}`,
      dbName: `${process.env.MONGO_DB}`,
    });

    connections = 1;
    console.log(`MongoDB: Hosted on ${mongodb.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (connections === 0) return;

  await mongoose.disconnect();
  connections = 0;

  console.log("MongoDB: Disconnected");
};

export default {
  connect,
  disconnect,
};
