import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: [optionSchema],
    isActive: {
      type: Boolean,
      default: true
    },
    endedAt: {
  type: Date
},
    totalVotes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Poll", pollSchema);
