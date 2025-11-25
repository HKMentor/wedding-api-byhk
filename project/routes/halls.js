const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to halls data
const hallsPath = path.join(__dirname, "../data/halls.json");
let hallsData = JSON.parse(fs.readFileSync(hallsPath));

// GET all halls
router.get("/", (req, res) => {
  res.json(hallsData.halls);
});

// GET hall by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const hall = hallsData.halls.find(h => h.id === id);

  if (!hall) {
    return res.status(404).json({ message: "Hall not found" });
  }

  res.json(hall);
});

// POST booking for specific hall
router.post("/:id/book", (req, res) => {
  const id = parseInt(req.params.id);
  const hall = hallsData.halls.find(h => h.id === id);

  if (!hall) {
    return res.status(404).json({ message: "Hall not found" });
  }

  const { name, email, phone, event_date, guests } = req.body;

  if (!name || !email || !phone || !event_date || !guests) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Add booking
  if (!hall.bookings) hall.bookings = [];
  hall.bookings.push({ name, email, phone, event_date, guests });

  res.json({ message: "Booking successful", hall });
});

module.exports = router;
