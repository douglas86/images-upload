import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { keys } from "./config/keys";

const app = express();

app.use(fileUpload());

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

// uplaod endpoint
app.post(`/uplaod`, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ mgs: "No file uploaded" });
  }
  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
