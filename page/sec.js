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

    let visitorInfoHtml = `<h1>Hi hi noob! Is this yo info? Hahaha Lelelelellele 🤪</h1>`;
    visitorInfoHtml += `<ul>`;
    for (const [key, value] of Object.entries(combinedInfo)) {
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
                async function fetchVisitorInfo() {
                    const clientInfo = {
                        screenResolution: \`\${window.screen.width}x\${window.screen.height}\`,
                        colorDepth: window.screen.colorDepth || 'N/A',
                        javaEnabled: navigator.javaEnabled(),
                        online: navigator.onLine,
                        deviceMemory: navigator.deviceMemory || 'N/A',
                        hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
                        platform: navigator.platform || 'N/A',
                        devicePixelRatio: window.devicePixelRatio || 'N/A',
                        vendor: navigator.vendor || 'N/A',
                        language: navigator.language || 'N/A',
                        userAgent: navigator.userAgent || 'N/A',
                        appCodeName: navigator.appCodeName || 'N/A',
                        appName: navigator.appName || 'N/A',
                        appVersion: navigator.appVersion || 'N/A',
                        product: navigator.product || 'N/A',
                        productSub: navigator.productSub || 'N/A',
                        vendorSub: navigator.vendorSub || 'N/A',
                        mimeTypes: Array.from(navigator.mimeTypes).map(mime => mime.type).join(', ') || 'N/A',
                        plugins: Array.from(navigator.plugins).map(plugin => plugin.name).join(', ') || 'N/A',
                        networkType: navigator.connection ? navigator.connection.type || 'N/A' : 'N/A',
                        effectiveNetworkType: navigator.connection ? navigator.connection.effectiveType || 'N/A' : 'N/A',
                        downlink: navigator.connection ? navigator.connection.downlink || 'N/A' : 'N/A',
                        rtt: navigator.connection ? navigator.connection.rtt || 'N/A' : 'N/A',
                        saveData: navigator.connection ? navigator.connection.saveData || 'N/A' : 'N/A'
                    };

                    const ul = document.querySelector('ul');
                    for (const [key, value] of Object.entries(clientInfo)) {
                        if (value !== 'N/A') {
                            const li = document.createElement('li');
                            li.innerHTML = \`<strong>\${key}:</strong> \${value}\`;
                            ul.appendChild(li);
                        }
                    }
                }

                fetchVisitorInfo();
            </script>
        </body>
        </html>
    `);
}