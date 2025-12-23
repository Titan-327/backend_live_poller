import Poll from "../models/poll.js";


// CREATE POLL
export const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const poll = await Poll.create({
      teacherId: req.user.id,
      question,
      options: options.map(opt => ({ text: opt })),
    });

    res.status(201).json({
      message: "Poll created successfully",
      pollId: poll._id
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// START POLL
export const startPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.teacherId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    poll.isActive = true;
    await poll.save();

    res.json({ message: "Poll started successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// END POLL
export const endPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.teacherId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    poll.isActive = false;
    poll.endedAt = new Date();
    await poll.save();

    res.json({ message: "Poll ended successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET POLL BY ID
export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId).select(
      "question options isActive totalVotes"
    );

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//GET MY POLLS
export const getMyPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ teacherId: req.user.id })
      .select("question isActive createdAt");

    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
