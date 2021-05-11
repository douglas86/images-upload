import express from "express";
import mongoose from "mongoose"
import { keys } from "./config/keys";

const app = express();

const CONNECTION_URL = keys.mongodb.connection;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((err) => err.message);

mongoose.set("useFindAndModify", false);
