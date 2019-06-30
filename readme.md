```
npm i -S git+https://github.com/MikeRohsoft/blight-node-adapter.git
npm i -S git+https://github.com/MikeRohsoft/jass.git
```
```
const Sequencer = require('jass');
const Blight = require('blight');
const client = new Blight();
client.on('error', e => console.log(e));
client.on('ready', () => CoinBot());
client.login('Username', 'Password');

function CoinBot() {
    let i = 0;
    console.log(`new Round`);
    client.createTutorialGame('first').then(([, gameObject]) => {
        const sequence = [];
        const params = [];
        [
            ['trainMilitia', [45]],
            ['trainMilitia', [46]],
            ['trainMilitia', [51]],
            ['trainMilitia', [59]],
            ['nextTurn'],
            ['trainMilitia', [45]],
            ['moveHero', [114, [51]]],
            ['nextTurn'],
            ['doPower', [120, 112]],
            ['trainMilitia', [45]],
            ['nextTurn'],
            ['nextTurn'],
            ['trainMilitia', [45]],
            ['nextTurn'],
            ['buyGold'],
            ['buyGold'],
            ['trainMilitia', [45]],
            ['trainMilitia', [46]],
            ['trainMilitia', [51]],
            ['nextTurn'],
            ['nextTurn'],
        ].forEach(value => {
            sequence.push(value[0]);
            const param = [gameObject.number];
            if (!!value[1]) {
                param.push(...value[1]);
            }
            params.push(param);
        });
        let beNiceIn = 0;
        const seq = new Sequencer(client, sequence, params);
        const nextHandler = e => {
            if (!!e.report) {
                e.report = client.fixBlightObjects(e.report);
            }
            console.log(`client.${sequence[i]}(${params[i++]}) => `, JSON.stringify(e, null, 2));
            let timeout = 1000;
            if (++beNiceIn === 3) {
                beNiceIn = 0;
                timeout = 20000;
            }
            console.log(`wait ${timeout}`);
            setTimeout(() => { 
                const ret = seq.next();
                if (!ret) {
                    setTimeout(() => CoinBot(), 10000);
                    return;
                }
                ret.then(nextHandler).catch((e) => console.error(e));
            }, timeout);
        };
        seq.next().then(nextHandler).catch((e) => console.error(e));
    });
}
```
