# IOTA JavaScript Client Load Balancer

A utility library for use with [iota.js](https://github.com/iotaledger/iota.js) and [mam.js](https://github.com/iotaledger/mam.js) which will perform node operations using a list of nodes instead of just a single provider.

Features include:

* API Compatible with iota.js and mam.js apart from initialization, so your code does not need to change. Supports both async and callback modes.

* Snapshot aware option which tries alternate nodes if getTrytes returns all 9s for result.

* Node list walk strategies:

  * Linear - Walks the list of nodes sequentially

  * Random - Randomly picks a node from the list

  * Custom - Create your own walk strategy

* Success mode for when an operation completes successfully:

  * Keep - Keep using the same node until it fails.

  * Next - Always step to the next node.

* Fail mode for when a node does not respond or returns error:

  * Single - Fails the whole call after a single failure.

  * All - Tries all the nodes until one succeeds.

* Timeout for non-responsive nodes.

* Blacklist limit, nodes failing a number of times are longer used until all nodes exhausted.

* Settings available on a per node or global level:

  * Minimum weight magnitude
  * Depth
  * AttachToTangle
  * TimeoutMs

## Installing

Install this package using the following commands:

```shell
npm install iotaledger/client-load-balancer
```

or

```shell
yarn add iotaledger/client-load-balancer
```

## Example Usage

```js
const { composeAPI, FailMode, RandomWalkStrategy, SuccessMode } = require('@iota/client-load-balancer');

(async function () {
    try {
        const api = composeAPI({
            nodeWalkStrategy: new RandomWalkStrategy(
                [
                    {
                        "provider": "https://altnodes.devnet.iota.org:443",
                        "depth": 3,
                        "mwm": 9
                    },
                    {
                        "provider": "https://nodes.devnet.iota.org:443",
                        "depth": 3,
                        "mwm": 9
                    }
                ]
            ),
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
        console.log("App Name:", res.appName);
        console.log("App Version:", res.appVersion);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();
```

Will output:

```shell
Trying node https://nodes.devnet.iota.org:443
App Name: IRI Testnet
App Version: 1.5.6-RELEASE
```

## API Reference

See the API reference for the library [./docs/](./docs/README.md).

## Examples

More examples of the load balancer usage can be found in the [./examples/](./examples/README.md) folder.

## License

MIT License - Copyright (c) 2019 IOTA Stiftung
