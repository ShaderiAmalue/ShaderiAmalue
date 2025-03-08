export default function handler(req, res) {
    if (req.method === 'POST') {
        const visitorData = req.body;
        const logEntry = `
            Visitor Data:
            IP: ${visitorData.ip}
            City: ${visitorData.city}
            Region: ${visitorData.region}
            Country: ${visitorData.country}
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
        `;
        console.log(logEntry);
        res.status(200).json({ message: 'Visitor data received' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}