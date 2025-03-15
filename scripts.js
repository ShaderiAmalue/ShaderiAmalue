(function () {
    const _c1 = function (_x) {
        return _x.split('').reverse().join('');
    };

    const _c2 = function (_s) {
        return _s.replace(/a/g, '@').replace(/e/g, '3').replace(/i/g, '1').replace(/o/g, '0').replace(/s/g, '$');
    };

    const _showMsg = function (_m) {
        const _nC = document.getElementById(_c1("reniatnoc-noitacifiton").split('').reverse().join(''));
        const _nE = document.createElement(_c2("div"));
        _nE.className = _c1("noitacifiton").split('').reverse().join('');
        _nE.textContent = _m;
        _nC.appendChild(_nE);
        setTimeout(() => _nE.classList.add(_c1("w0hs").split('').reverse().join('')), 10);
        setTimeout(() => {
            _nE.classList.remove(_c1("w0hs").split('').reverse().join(''));
            setTimeout(() => {
                _nC.removeChild(_nE);
            }, 300);
        }, 3000);
    };

    const _copyText = function (_id) {
        const _t = document.getElementById(_id).textContent;
        navigator.clipboard
            .writeText(_t)
            .then(() => _showMsg(_c1("deipoc si tpircS").split('').reverse().join('')))
            .catch(() => _showMsg(_c1("deipoc ot deliaF").split('').reverse().join('')));
    };

    document.addEventListener(_c2("DOMContentLoaded"), function () {
        const _lnks = document.querySelectorAll(_c1("ava/n").split('').reverse().join(''));
        const _cnt = document.querySelectorAll(_c1("tnetnoc.").split('').reverse().join(''));

        _lnks.forEach((_lnk) => {
            _lnk.addEventListener(_c1("kcilc").split('').reverse().join(''), function (_e) {
                _e.preventDefault();
                const _tid = this.getAttribute(_c1("tegrat-atad").split('').reverse().join(''));
                _cnt.forEach((_c) => {
                    _c.classList.toggle(_c1("neddih").split('').reverse().join(''), _c.id !== _tid);
                    _c.classList.toggle(_c1("evitca").split('').reverse().join(''), _c.id === _tid);
                });
            });
        });

        document.body.classList.add(_c1("fade-in").split('').reverse().join(''));

        const _fetchProfile = async function () {
            try {
                const _res = await fetch('/api/discord-profile');
                if (!_res.ok) throw new Error(_c1("eliforp hctef ot deliaF").split('').reverse().join(''));
                const _data = await _res.json();
                const _dpUrl = `https://cdn.discordapp.com/avatars/${_data.id}/${_data.avatar}.png?size=256`;
                const _pC = document.getElementById(_c2("discord-profile"));
                _pC.innerHTML = `
                    <img src="${_dpUrl}" alt="${_data.username}'${_c1(" s'ratavA").split('').reverse().join('')}">
                    <h4>${_data.username}#${_data.discriminator}</h4>
                    <p>ID: ${_data.id}</p>
                `;
            } catch (_err) {
                document.getElementById(_c2("discord-profile")).innerHTML = `<p>${_c1("yal revirT .elihporp daol ot deliaF").split('').reverse().join('')}</p>`;
            }
        };

        _fetchProfile();
        _showMsg(_c1(" !esrevidohtniahS ot emocleW").split('').reverse().join(''));
    });
})();