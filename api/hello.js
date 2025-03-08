export default function handler(req, res) {
    const info = {
        website: "endregion.vercel.app",
        owner: "Shadie",
        features: ["Game Guardian Scripts", "Downloads", "Owo"],
        downloads: [
            {
                name: "Blockman Mod",
                description: "Modified SQL Trust part to allow API access in HTTP Canary (For Blockman).",
                url: "https://www.mediafire.com/file/5xdnhx8kn5zwq2a/Blockman_GO_2.104.1.apk/file"
            },
            {
                name: "HTTP Capture, Sniffer (Free Premium)",
                description: "A tool for capturing and analyzing HTTP/HTTPS traffic.",
                url: "https://www.mediafire.com/file/sf1m8u6rronb57w/T_I__3.3.6.apk/file"
            },
            {
                name: "Game Guardian Scripts",
                description: "Scripts for enhancing your Blockman gaming experience.",
                url: "https://www.mediafire.com/file/phdn555ku2r137q/GGScripts.zip/file"
            }
        ]
    };

    const visitor = {
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
        time: new Date().toISOString()
    };

    res.status(200).json({
        message: "Hello from Vercel!",
        info: info,
        visitor: visitor
    });
}