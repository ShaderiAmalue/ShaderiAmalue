export default function handler(req, res) {
    if (req.method === 'POST') {
        const visitorData = req.body;
        let additionalMessage = "";

        // Example logic to add messages based on visitor information
        if (visitorData.country === "US") {
            additionalMessage += "Welcome, visitor from the United States!\n";
        } else if (visitorData.city === "Tokyo") {
            additionalMessage += "Konnichiwa! Greetings from Tokyo!\n";
        }

        if (visitorData.connectionType === "4g") {
            additionalMessage += "You are using a 4G connection.\n";
        } else if (visitorData.connectionType === "wifi") {
            additionalMessage += "You are connected via Wi-Fi.\n";
        }

        const logEntry = `
            Visitor Data:
            User-Agent: ${visitorData.userAgent}
            Language: ${visitorData.language}
            Platform: ${visitorData.platform}
            Screen Resolution: ${visitorData.screenResolution}
            Color Depth: ${visitorData.colorDepth}
            Timezone: ${visitorData.timezone}
            Referrer: ${visitorData.referrer}
            Cookies Enabled: ${visitorData.cookiesEnabled}
            Java Enabled: ${visitorData.javaEnabled}
            Online: ${visitorData.online}
            Connection Type: ${visitorData.connectionType}
            Time: ${visitorData.time}
            Additional Message: ${additionalMessage}
        `;
        
        console.log(logEntry);
        res.status(200).json({ message: 'Visitor data received', additionalMessage: additionalMessage });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}