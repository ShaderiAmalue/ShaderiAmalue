const express = require("express");
const axios = require("axios");
const app = express();

// Token fragments to obscure the full token
const vv = [
  "MTM1", "MDMw", "MDcz", "NjA1", "MDk1", "ODQyOA", // First segment
  "GXBs-A",                                        // Second segment
  "8tUs", "B3mFCWei8dKC", "6ABwhPzpwA",            // Third segment (partial)
  "_gpw1c2BHLv4"                                   // Final part
];

// Reconstruct token from parts
const TOKEN = [
  vv.slice(0, 6).join(""),  // First part
  vv[6],                    // Second part
  vv.slice(7).join("")      // Remaining parts
].join(".");

// Actual Discord user ID
const DISCORD_USER_ID = "1238870905799835718";

// Discord API endpoint
const API_URL = `https://discord.com/api/v10/users/${DISCORD_USER_ID}`;

// Route to fetch Discord profile
app.get("/api/discord-profile", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: TOKEN // Removed "Bot" from the header
      }
    });
    const userData = {
      id: response.data.id,
      username: response.data.username,
      discriminator: response.data.discriminator,
      avatar: response.data.avatar
    };
    res.json({
      status: "success",
      message: "Discord profile fetched successfully",
      data: userData
    });
  } catch (error) {
    console.error("Error fetching Discord profile:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch Discord profile. Please check the token or user ID."
    });
  }
});

// Start the server
app.listen(3000, () => console.log("API is running on http://localhost:3000"));