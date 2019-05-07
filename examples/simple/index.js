const { composeAPI, FailMode, RandomWalkStrategy, SuccessMode } = require('@iota/client-load-balancer');

(async function () {
    try {
        const nodeWalkStrategy = new RandomWalkStrategy(
            [
                {
                    'provider': 'https://altnodes.devnet.iota.org:443',
                    'depth': 3,
                    'mwm': 9
                },
                {
                    'provider': 'https://nodes.devnet.iota.org:443',
                    'depth': 3,
                    'mwm': 9
                }
            ]
        );

        const api = composeAPI({
            nodeWalkStrategy,
            successMode: SuccessMode.next,
            failMode: FailMode.all,
            timeoutMs: 5000,
            tryNodeCallback: (node) => {
                console.log(`Trying node ${node.provider}`);
            },
            failNodeCallback: (node, err) => {
                console.log(`Failed node ${node.provider}, ${err.message}`);
            }
        });

        const res = await api.getNodeInfo();
        console.log('App Name:', res.appName);
        console.log('App Version:', res.appVersion);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();