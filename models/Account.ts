import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  access_token: { type: String },
  refresh_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  id_token: { type: String },
});

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
