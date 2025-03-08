export default function handler(req, res) {
    const visitorInfo = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        host: req.headers['host'],
        connection: req.headers['connection'],
        referer: req.headers['referer'],
        method: req.method,
        protocol: req.protocol || (req.connection.encrypted ? 'https' : 'http'),
        path: req.url,
        cookies: req.headers['cookie'],
        time: new Date().toISOString(),
        networkIP: req.socket.remoteAddress,
        clientIP: req.connection.remoteAddress,
        clientPort: req.connection.remotePort,
        localAddress: req.connection.localAddress,
        localPort: req.connection.localPort,
        country: req.headers['x-vercel-ip-country'],
        region: req.headers['x-vercel-ip-country-region'],
        city: req.headers['x-vercel-ip-city'],
        latitude: req.headers['x-vercel-ip-latitude'],
        longitude: req.headers['x-vercel-ip-longitude'],
        regionCode: req.headers['x-vercel-ip-country-region-code'],
        countryCode: req.headers['x-vercel-ip-country-code'],
        continent: req.headers['x-vercel-ip-continent'],
        timezone: req.headers['x-vercel-ip-timezone']
    };

    res.status(200).json({
        message: "Hello from Vercel!",
        visitorInfo: visitorInfo
    });
}