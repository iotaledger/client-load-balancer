<h2 align="center">A load balancer for connecting to IOTA nodes</h2>

<p align="center">
  <a href="https://discord.iota.org/" style="text-decoration:none;"><img src="https://img.shields.io/badge/Discord-9cf.svg?logo=discord" alt="Discord"></a>
    <a href="https://iota.stackexchange.com/" style="text-decoration:none;"><img src="https://img.shields.io/badge/StackExchange-9cf.svg?logo=stackexchange" alt="StackExchange"></a>
    <a href="https://github.com/iotaledger/client-load-balancer/blob/master/LICENSE" style="text-decoration:none;"><img src="https://img.shields.io/github/license/iotaledger/client-load-balancer.svg" alt="MIT license"></a>
</p>
      
<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Prerequisites</a> ◈
  <a href="#installation">Installation</a> ◈
  <a href="#getting-started">Getting started</a> ◈
  <a href="#api-reference">API reference</a> ◈
  <a href="#supporting-the-project">Supporting the project</a> ◈
  <a href="#joining-the-discussion">Joining the discussion</a> 
</p>

---

## About

The Client Load Balancer is a utility package for sending commands to a list of nodes instead of just a single provider.

This package is compatible with the [IOTA JavaScript client library](https://github.com/iotaledger/iota.js) and [mam.client.js](https://github.com/iotaledger/mam.client.js). 

There is a separate branch [https://github.com/iotaledger/client-load-balancer/tree/no-mam](https://github.com/iotaledger/client-load-balancer/tree/no-mam) which contains a version of this library for use with [mam.js](https://github.com/iotaledger/mam.js). This branch removes all the MAM specific methods and references as `mam.js` utilises the regular `composeAPI` for its communications.

Features include:

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

This is beta software, so there may be performance and stability issues.
Please report any issues in our [issue tracker](https://github.com/iotaledger/client-load-balancer/issues/new).

## Prerequisites

To use the Client Load Balancer in your own applications, you need [Node.js](https://nodejs.org/en/download/) installed on your device.

To check if you have Node.js installed, run the following command:

```bash
node -v
```

If Node.js is installed, you should see the version that's installed.

## Installation

To install this package, use one of the following commands:


- `npm install iotaledger/client-load-balancer`


- `yarn add iotaledger/client-load-balancer`

## Getting started

To jump in now, see the following code sample:

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

## MWM and Depth

The `mwm` and `depth` parameters can be set at multiple levels within the configuration. You can specify them at a node level, but they are optional.

```js
{
    provider: "https://altnodes.devnet.iota.org:443",
    depth?: 3,
    mwm?: 9
}
```
If you don't specify them for each node you can set them at the top level load balancer settings.

```js
const api = composeAPI({
    nodeWalkStrategy: ...,
    depth?: 3,
    mwm?: 9
});
```

Or you can just provide them when calling the regular methods that require them.

```js
const iota = composeAPI(loadBalancerSettings);
const trytes = await iota.prepareTransfers(seed, transfers, options);
await iota.sendTrytes(trytes, 3, 9);
```

If you want methods like `sendTrytes` to use the values from the configuration just pass `undefined` instead, in `JavaScript` you can skip the parameters altogether but `TypeScript` will require some values, hence `undefined`.

 In this case of `undefined` parameters the code will first look at the configuration for the node that it is currently using, if that does not provide values it uses the load balancer settings. If they are not provided the defaults are `depth=3` and `mwm=9`

```js
await iota.sendTrytes(trytes, undefined, undefined);
```

## API Reference

See the [JavaScript API reference](./docs/README.md).

## Supporting the project

If you want to contribute, consider submitting a [bug report](https://github.com/iotaledger/client-load-balancer/issues/new), [feature request](https://github.com/iotaledger/client-load-balancer/issues/new) or a [pull request](https://github.com/iotaledger/client-load-balancer/pulls/).

See our [contributing guidelines](.github/CONTRIBUTING.md) for more information.

## Joining the discussion

If you want to get involved in the community, need help with getting set up, have any issues or just want to discuss IOTA, Distributed Registry Technology (DRT), and IoT with other people, feel free to join our [Discord](https://discord.iota.org/).
