import mongoose from "mongoose";

const configDb = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
};

export default configDb;
