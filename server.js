import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import pollRoutes from "./routes/poll.routes.js";
import http from "http";
import {Server} from "socket.io";
import Poll from "./models/poll.js";
import Vote from "./models/vote.js";
import crypto from "crypto";
dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/poll", pollRoutes);

// Database connection
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
socket.on("join_poll", ({ pollId }) => {
  socket.join(pollId);
  console.log(`Socket ${socket.id} joined poll ${pollId}`);
});
 socket.on("cast_vote", async ({ pollId, optionId }) => {
    try {
      // 1. Find poll
      const poll = await Poll.findById(pollId);
      if (!poll || !poll.isActive) {
        return socket.emit("vote_error", "Poll is inactive");
      }

      // 2. Create voter hash
      const voterHash = crypto
        .createHash("sha256")
        .update(socket.id)
        .digest("hex");

      // 3. Prevent double voting
      const alreadyVoted = await Vote.findOne({ pollId, voterHash });
      if (alreadyVoted) {
        return socket.emit("vote_error", "You have already voted");
      }

      // 4. Save vote
      await Vote.create({
        pollId,
        optionId,
        voterHash
      });

      // 5. Update poll counts atomically
      await Poll.updateOne(
        { _id: pollId, "options._id": optionId },
        {
          $inc: {
            "options.$.voteCount": 1,
            totalVotes: 1
          }
        }
      );

      // 6. Get updated poll
      const updatedPoll = await Poll.findById(pollId);

      // 7. Broadcast update
      io.to(pollId).emit("poll_update", updatedPoll);

    } catch (error) {
      socket.emit("vote_error", "Voting failed");
    }
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const PORT =3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
