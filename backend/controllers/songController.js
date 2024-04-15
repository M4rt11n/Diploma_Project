const Song = require("../models/songModel");
const mongoose = require("mongoose");
const Fuse = require("fuse.js");

// get all songs
const getSongs = async (req, res) => {
  const songs = await Song.find({}).sort({ createdAt: -1 });

  res.status(200).json(songs);
};

const searchSong = async (req, res) => {
  const { title } = req.query; // Get the search query parameter

  if (!title) {
    return res.status(400).json({ error: "Please provide a search term (title)" });
  }

  try {
    const allSongs = await Song.find({}); // Fetch all songs

    // Configure fuse.js options
    const options = {
      keys: ["songTitle"], // Search by songTitle field
      threshold: 0.6, // Adjust threshold for desired fuzziness (0-1)
      includeMatches: true, // Include matched terms in results
    };

    const fuse = new Fuse(allSongs, options); // Create fuse instance

    const searchResults = fuse.search(title); // Perform fuzzy search

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Error searching songs" });
  }
};

// get a single song
const getSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  const song = await Song.findById(id);

  if (!song) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  res.status(200).json(song);
};

// create a new song
const createSong = async (req, res) => {
  const {
    songTitle,
    songKey,
    songBPM,
    songOriginalKey,
    songAuthor,
    songTranslator,
    songData,
  } = req.body;

  // add doc to db
  try {
    const song = await Song.create({
      songTitle,
      songKey,
      songBPM,
      songOriginalKey,
      songAuthor,
      songTranslator,
      songData,
    });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST a new song" });
};

// delete a song
const deleteSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  const song = await Song.findOneAndDelete({ _id: id });

  if (!song) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  res.status(200).json(song);
};

// update a song
const updateSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  const song = await Song.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!song) {
    return res.status(404).json({ error: "Song not found! :(" });
  }

  res.status(200).json(song);
};

module.exports = {
  getSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  searchSong,
};
