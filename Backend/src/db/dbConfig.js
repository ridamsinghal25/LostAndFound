import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connectionToDB = await mongoose.connect(
      `${process.env.MONGO_URI}/lostandfound`
    );

    console.log("Connection : ", connectionToDB.connection());

    return connectionToDB;
  } catch (error) {
    console.log("Something went wrong while connecting to database: ", error);
    process.exit(1);
  }
};

export default dbConnect;
