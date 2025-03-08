module.exports = (req, res) => {
  const data = {
    message: 'Hello from Vercel!',
    info: {
      website: 'endregion.vercel.app',
      owner: 'Shadie',
      features: ['Game Guardian Scripts', 'Downloads', 'Community Support'],
      downloads: [
        {
          name: 'Blockman Mod',
          description: 'Modified SQL Trust part to allow API access in HTTP Canary (For Blockman).',
          url: 'https://www.mediafire.com/file/5xdnhx8kn5zwq2a/Blockman_GO_2.104.1.apk/file'
        },
        {
          name: 'HTTP Capture, Sniffer (Free Premium)',
          description: 'A tool for capturing and analyzing HTTP/HTTPS traffic.',
          url: 'https://www.mediafire.com/file/sf1m8u6rronb57w/T_I__3.3.6.apk/file'
        },
        {
          name: 'Game Guardian Scripts',
          description: 'Scripts for enhancing your Blockman gaming experience.',
          url: 'https://www.mediafire.com/file/phdn555ku2r137q/GGScripts.zip/file'
        }
      ]
    }
  };

  res.status(200).json(data);
};