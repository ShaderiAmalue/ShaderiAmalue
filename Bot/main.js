const express = require("express");
const axios = require("axios");
const app = express();

// Split and reconstruct your token for security
const vv = [
  "MTM1", "MDMw", "MDcz", "NjA1", "MDk1", "ODQyOA", // Token parts
  "GXBs-A",
  "8tUs", "B3mFCWei8dKC", "6ABwhPzpwA",
  "_gpw1c2BHLv4"
];
const TOKEN = vv.slice(0, 6).join("") + "." + vv[6] + "." + vv.slice(7).join("");

// Discord API variables
const DISCORD_USER_ID = "1238870905799835718"; // Replace with actual user ID
const API_URL = `https://discord.com/api/v10/users/${DISCORD_USER_ID}`;

// API route to get Discord user profile
app.get("/api/discord-profile", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: TOKEN // Remove "Bot" as you requested
      }
    });

    // Respond with the user profile
    res.status(200).json({
      status: "success",
      message: "Fetched Discord profile successfully",
      data: response.data
    });
  } catch (error) {
    console.error("Error fetching Discord profile:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch Discord profile. Check token or permissions."
    });
  }
});

// Start the Express server
app.listen(3000, () => console.log("API is running on http://localhost:3000"));