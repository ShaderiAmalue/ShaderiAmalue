export default function handler(req, res) {
    const visitorInfo = {
        IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        IPv4: req.headers['x-vercel-ip-v4'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        IPv6: req.headers['x-vercel-ip-v6'] || req.connection.remoteAddress,
        "User Agent": req.headers['user-agent'],
        Language: req.headers['accept-language'],
        Host: req.headers['host'],
        Connection: req.headers['connection'],
        Referer: req.headers['referer'],
        Method: req.method,
        Protocol: req.connection.encrypted ? 'https' : 'http',
        Path: req.url,
        Cookies: req.headers['cookie'],
        Time: new Date().toISOString(),
        "Network IP": req.socket.remoteAddress,
        "Client IP": req.connection.remoteAddress,
        "Client Port": req.connection.remotePort,
        "Local Address": req.connection.localAddress,
        "Local Port": req.connection.localPort,
        Country: req.headers['x-vercel-ip-country'],
        Region: req.headers['x-vercel-ip-country-region'],
        City: req.headers['x-vercel-ip-city'],
        Latitude: req.headers['x-vercel-ip-latitude'],
        Longitude: req.headers['x-vercel-ip-longitude'],
        "Region Code": req.headers['x-vercel-ip-country-region-code'],
        "Country Code": req.headers['x-vercel-ip-country-code'],
        Continent: req.headers['x-vercel-ip-continent'],
        Timezone: req.headers['x-vercel-ip-timezone'],
        ISP: req.headers['x-vercel-ip-isp'],
        Organization: req.headers['x-vercel-ip-org'],
        ASN: req.headers['x-vercel-ip-asn'],
        "Postal Code": req.headers['x-vercel-ip-postal-code'],
        "Geoname ID": req.headers['x-vercel-ip-geoname-id'],
        Headers: req.headers // Including all headers for completeness
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
                h1 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { background-color: #fff; margin: 5px 0; padding: 10px; border-radius: 5px; }
                strong { color: #333; }
            </style>
        </head>
        <body>
            ${visitorInfoHtml}
        </body>
        </html>
    `);
}