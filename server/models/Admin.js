import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  task: {
    type: Number,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
