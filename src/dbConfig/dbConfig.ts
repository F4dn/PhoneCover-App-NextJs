import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("MongoDb connnected");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error, please make sure db is up and running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
};
