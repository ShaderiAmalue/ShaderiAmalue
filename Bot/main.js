(function () {
    const _f1 = require(Buffer.from("ZXhwcmVzcw==", "base64").toString("utf8"));
    const _f2 = require(Buffer.from("YXhpb3M=", "base64").toString("utf8"));
    const _f3 = _f1();

    const x1 = [
        Buffer.from("TVRNMQ==", "base64").toString("utf8"),
        Buffer.from("TURNdw==", "base64").toString("utf8"),
        Buffer.from("TURjejY=", "base64").toString("utf8"),
        Buffer.from("TkpBNQ==", "base64").toString("utf8"),
        Buffer.from("TURrMQ==", "base64").toString("utf8"),
        Buffer.from("T0RReU8=", "base64").toString("utf8"),
        Buffer.from("R1hCc0EtQQ==", "base64").toString("utf8"),
        Buffer.from("OHVVczIzMw==", "base64").toString("utf8"),
        Buffer.from("QjNtRkNXX2k=", "base64").toString("utf8"),
        Buffer.from("VpM2RC1VQjc=", "base64").toString("utf8"),
        Buffer.from("NkFCd2g0PQ==", "base64").toString("utf8"),
        Buffer.from("X2dwLjB3MQ==", "base64").toString("utf8"),
        Buffer.from("MkJITHZQMA==", "base64").toString("utf8")
    ];

    const p1 = x1.slice(0, 6).join("");
    const p2 = x1[6];
    const p3 = x1.slice(7).join("");
    const _key = [p1, p2, p3].join(".");

    const y0 = Buffer.from("MTIzODg3MDkwNTc5OTgzNTcxOA==", "base64").toString("utf8");

    const gen = function (val) {
        return Buffer.from(val).toString("base64");
    };

    _f3.get(
        Buffer.from("/YXBpL2Rpc2NvcmQtcHJvZmlsZQ==", "base64").toString("utf8"),
        async function (_i1, _i2) {
            try {
                const z0 = await _f2.get(
                    Buffer.from("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvdjEwLw==", "base64").toString("utf8") + y0,
                    {
                        headers: {
                            Authorization: Buffer.from("Qm90IA==", "base64").toString("utf8") + _key
                        }
                    }
                );
                _i2.json(z0.data);
            } catch (_err) {
                _i2.status(500).send(Buffer.from("RmFpbGVkIHRvIGZldGNoIERpc2NvcmQgcHJvZmlsZQ==", "base64").toString("utf8"));
            }
        }
    );

    _f3.listen(3000, function () {
        console.log(Buffer.from("QVBJIGlzIHJ1bm5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDozMDAw", "base64").toString("utf8"));
    });
})();