const express = require("express");
const router = express.Router();
// const pool = require("../db/db");

// Get all users
router.get("/", async (req, res) => {
  //   try {
  //     const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  //     res.json(result.rows);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send("Server error");
  //   }
  console.log("in here");
  res.json([
    {
      id: 1,
      name: "Alice Johnson",
      group_size: 2,
      phone: "123-456-7890",
      status: "Waiting",
      timeIn: "00:00",
      session_length: 0,
    },
    {
      id: 2,
      name: "Bob Smith",
      group_size: 4,
      phone: "123-555-7890",
      status: "Expired",
      timeIn: "02:05",
      session_length: 90,
    },
    {
      id: 3,
      name: "Charlie Brown",
      group_size: 1,
      phone: "234-567-8901",
      status: "Inside",
      timeIn: "01:00",
      session_length: 150,
    },
  ]);
});

// Add a new user
router.post("/add", async (req, res) => {
  const { name, group_size, phone, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, group_size, phone, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, group_size, phone, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Update user status
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status, timeIn, session_length } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET status = $1, timeIn = $2, session_length = $3 WHERE id = $4 RETURNING *",
      [status, timeIn, session_length, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Delete a user
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
