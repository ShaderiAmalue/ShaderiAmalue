import os from 'os';

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

    // Server Information
    const serverInfo = {
        ServerTime: new Date().toISOString(),
        Uptime: os.uptime() + ' seconds',
        CPU: os.cpus()[0].model,
        CPUUsage: (os.loadavg()[0] * 100).toFixed(2) + '%',
        TotalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB',
        FreeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB',
        OS: os.type() + ' ' + os.release(),
        Hostname: os.hostname()
    };

    // Combine Visitor and Server Information
    const combinedInfo = { ...visitorInfo, ...serverInfo };

    // Remove undefined values
    Object.keys(combinedInfo).forEach(key => {
        if (combinedInfo[key] === 'N/A') {
            delete combinedInfo[key];
        }
    });

    // Return JSON response
    res.status(200).json(combinedInfo);
}