export default function handler(req, res) {
    const visitorInfo = {
        IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "User Agent": req.headers['user-agent'],
        Language: req.headers['accept-language'],
        Host: req.headers['host'],
        Referer: req.headers['referer'],
        Method: req.method,
        Protocol: req.connection.encrypted ? 'https' : 'http',
        Path: req.url,
        Country: req.headers['x-vercel-ip-country'],
        Region: req.headers['x-vercel-ip-country-region'],
        City: req.headers['x-vercel-ip-city'],
        Latitude: req.headers['x-vercel-ip-latitude'],
        Longitude: req.headers['x-vercel-ip-longitude'],
        Continent: req.headers['x-vercel-ip-continent'],
        Timezone: req.headers['x-vercel-ip-timezone'],
        ISP: req.headers['x-vercel-ip-isp'],
        Organization: req.headers['x-vercel-ip-org'],
        ASN: req.headers['x-vercel-ip-asn']
    };

    // Remove undefined values
    Object.keys(visitorInfo).forEach(key => {
        if (visitorInfo[key] === undefined) {
            delete visitorInfo[key];
        }
    });

    let visitorInfoHtml = `<h1>🤪</h1>`;
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
                function getNetworkInformation() {
                    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                    return connection ? {
                        effectiveType: connection.effectiveType || 'N/A',
                        type: connection.type || 'N/A',
                        downlinkMax: connection.downlinkMax || 'N/A',
                        rtt: connection.rtt || 'N/A',
                        downlink: connection.downlink || 'N/A',
                        saveData: connection.saveData || false,
                        wifi: connection.type === 'wifi',
                        network: connection.type === 'cellular'
                    } : {
                        effectiveType: 'N/A',
                        type: 'N/A',
                        downlinkMax: 'N/A',
                        rtt: 'N/A',
                        downlink: 'N/A',
                        saveData: false,
                        wifi: false,
                        network: false
                    };
                }

                const clientInfo = {
                    screenResolution: \`\${window.screen.width}x\${window.screen.height}\`,
                    colorDepth: window.screen.colorDepth,
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
                    ...getNetworkInformation()
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