import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profileImg: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("User", userSchema);
