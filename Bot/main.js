(function () {
    const e0 = require("express");
    const e1 = require("axios");
    const app = e0();

    // Obfuscated token parts
    const vv = [
        "MTM1", "MDMw", "MDcz", "NjA1", "MDk1", "ODQyOA",
        "GXBs-A", "8tUs", "B3mFCWei8dKC", "6ABwhPzpwA",
        "_gpw1c2BHLv4"
    ];

    const part1 = vv.slice(0, 6).join(""); // First part of the token
    const part2 = vv[6];                  // Second part of the token
    const part3 = vv.slice(7).join("");   // Third part of the token
    const BOT_TOKEN = [part1, part2, part3].join("."); // Reconstructed token

    const DISCORD_USER_ID = "1238870905799835718";

    // API Endpoint
    const API_URL = `https://discord.com/api/v10/users/${DISCORD_USER_ID}`;

    app.get("/api/discord-profile", async (req, res) => {
        try {
            const response = await e1.get(API_URL, {
                headers: {
                    Authorization: `Bot ${BOT_TOKEN}`
                }
            });
            res.json(response.data); // Send retrieved profile data
        } catch (error) {
            console.error("Error fetching Discord profile:", error.message);
            res.status(500).send("Failed to fetch Discord profile");
        }
    });

    app.listen(3000, () =>
        console.log("API is running on http://localhost:3000")
    );
})();