export default function handler(req, res) {
    const visitorInfo = {
        IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "User Agent": req.headers['user-agent'] || 'N/A',
        Language: req.headers['accept-language'] || 'N/A',
        Host: req.headers['host'] || 'N/A',
        Referer: req.headers['referer'] || 'N/A',
        Method: req.method || 'N/A',
        Protocol: req.connection.encrypted ? 'https' : 'http',
        Path: req.url || 'N/A',
        Country: req.headers['x-vercel-ip-country'] || 'N/A',
        Region: req.headers['x-vercel-ip-country-region'] || 'N/A',
        City: req.headers['x-vercel-ip-city'] || 'N/A',
        Latitude: req.headers['x-vercel-ip-latitude'] || 'N/A',
        Longitude: req.headers['x-vercel-ip-longitude'] || 'N/A',
        Continent: req.headers['x-vercel-ip-continent'] || 'N/A',
        Timezone: req.headers['x-vercel-ip-timezone'] || 'N/A',
        ISP: req.headers['x-vercel-ip-isp'] || 'N/A',
        Organization: req.headers['x-vercel-ip-org'] || 'N/A',
        ASN: req.headers['x-vercel-ip-asn'] || 'N/A'
    };

    let visitorInfoHtml = `<h1>Hi hi noob! Is this yo info? Hahaha Lelelelellele 🤪</h1>`;
    visitorInfoHtml += `<ul>`;
    for (const [key, value] of Object.entries(visitorInfo)) {
        visitorInfoHtml += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    visitorInfoHtml += `</ul>`;

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Visitor Info</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 20px; }
                h1 { color: #333; text-align: center; }
                ul { list-style-type: none; padding: 0; max-width: 600px; margin: 20px auto; }
                li { background-color: #fff; margin: 5px 0; padding: 10px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
                strong { color: #007BFF; }
            </style>
        </head>
        <body>
            ${visitorInfoHtml}
            <script>
                const clientInfo = {
                    screenResolution: \`\${window.screen.width}x\${window.screen.height}\`,
                    colorDepth: window.screen.colorDepth || 'N/A',
                    javaEnabled: navigator.javaEnabled(),
                    online: navigator.onLine,
                    connectionType: navigator.connection ? navigator.connection.effectiveType : 'N/A',
                    deviceMemory: navigator.deviceMemory || 'N/A',
                    hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
                    platform: navigator.platform || 'N/A',
                    devicePixelRatio: window.devicePixelRatio || 'N/A',
                    vendor: navigator.vendor || 'N/A',
                    language: navigator.language || 'N/A',
                    userAgent: navigator.userAgent || 'N/A'
                };
                
                const list = document.querySelector('ul');
                for (const [key, value] of Object.entries(clientInfo)) {
                    const li = document.createElement('li');
                    li.innerHTML = \`<strong>\${key}:</strong> \${value}\`;
                    list.appendChild(li);
                }
            </script>
        </body>
        </html>
    `);
}