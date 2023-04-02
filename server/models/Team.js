import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  tasksDone: [
    {
      type: Number,
      required: false,
    },
  ],
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;
