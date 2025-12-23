import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true
    },
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    voterHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

voteSchema.index({ pollId: 1, voterHash: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
