> ## [@iota/client-load-balancer](../README.md)

[Mam](mam.md) /

# Class: Mam

Wrapper for Mam with load balancing

## Hierarchy

* **Mam**

### Index

#### Methods

* [attach](mam.md#static-attach)
* [changeMode](mam.md#static-changemode)
* [create](mam.md#static-create)
* [decode](mam.md#static-decode)
* [fetch](mam.md#static-fetch)
* [fetchSingle](mam.md#static-fetchsingle)
* [getRoot](mam.md#static-getroot)
* [init](mam.md#static-init)
* [listen](mam.md#static-listen)
* [subscribe](mam.md#static-subscribe)

## Methods

### `Static` attach

▸ **attach**(`trytes`: string, `root`: string, `depth?`: undefined | number, `mwm?`: undefined | number, `tag?`: undefined | string): *`Promise<ReadonlyArray<Transaction>>`*

Attach the mam trytes to the tangle.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`trytes` | string | The trytes to attach. |
`root` | string | The root to attach them to. |
`depth?` | undefined \| number | The depth to attach them with, defaults to 3. |
`mwm?` | undefined \| number | The minimum weight magnitude to attach with, defaults to 9 for devnet, 14 required for mainnet. |
`tag?` | undefined \| string | Trytes to tag the message with. |

**Returns:** *`Promise<ReadonlyArray<Transaction>>`*

The transaction objects.

___

### `Static` changeMode

▸ **changeMode**(`state`: `MamState`, `mode`: `MamCore.MamMode`, `sidekey?`: undefined | string): *`MamState`*

Change the mode for the mam state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | `MamState` | The current mam state. |
`mode` | `MamCore.MamMode` | . |
`sidekey?` | undefined \| string | - |

**Returns:** *`MamState`*

Updated state object to be used with future actions.

___

### `Static` create

▸ **create**(`state`: `MamState`, `message`: string): *`MamMessage`*

Creates a MAM message payload from a state object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | `MamState` | The current mam state. |
`message` | string | Tryte encoded string. |

**Returns:** *`MamMessage`*

An object containing the payload and updated state.

___

### `Static` decode

▸ **decode**(`payload`: string, `sideKey`: string, `root`: string): *string*

Decode a message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`payload` | string | The payload of the message. |
`sideKey` | string | The sideKey used in the message. |
`root` | string | The root used for the message. |

**Returns:** *string*

The decoded payload.

___

### `Static` fetch

▸ **fetch**(`root`: string, `mode`: `MamCore.MamMode`, `sideKey?`: undefined | string, `callback?`: undefined | function, `limit?`: undefined | number): *`Promise<object | Error>`*

Fetch the messages asynchronously.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`root` | string | The root key to use. |
`mode` | `MamCore.MamMode` | The mode of the channel. |
`sideKey?` | undefined \| string | The sideKey used in the messages, only required for restricted. |
`callback?` | undefined \| function | Optional callback to receive each payload. |
`limit?` | undefined \| number | Limit the number of messages that are fetched. |

**Returns:** *`Promise<object | Error>`*

The nextRoot and the messages if no callback was supplied, or an Error.

___

### `Static` fetchSingle

▸ **fetchSingle**(`root`: string, `mode`: `MamCore.MamMode`, `sideKey?`: undefined | string): *`Promise<object | Error>`*

Fetch a single message asynchronously.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`root` | string | The root key to use. |
`mode` | `MamCore.MamMode` | The mode of the channel. |
`sideKey?` | undefined \| string | The sideKey used in the messages. |

**Returns:** *`Promise<object | Error>`*

The nextRoot and the payload, or an Error.

___

### `Static` getRoot

▸ **getRoot**(`state`: `MamState`): *string*

Get the root from the mam state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | `MamState` | The mam state. |

**Returns:** *string*

The root.

___

### `Static` init

▸ **init**(`settings`: [LoadBalancerSettings](loadbalancersettings.md), `seed?`: undefined | string, `security`: number): *`MamState`*

Initialisation function which returns a state object

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`settings` | [LoadBalancerSettings](loadbalancersettings.md) | - | Settings for the load balancer. |
`seed?` | undefined \| string | - | The seed to initialise with. |
`security` | number | 2 | The security level, defaults to 2. |

**Returns:** *`MamState`*

The mam state.

___

### `Static` listen

▸ **listen**(`channel`: `MamSubscribedChannel`, `callback`: function): *void*

Listen for new message on the channel.

**Parameters:**

■` channel`: *`MamSubscribedChannel`*

The channel to listen on.

■` callback`: *function*

The callback to receive any messages,

▸ (`messages`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`messages` | string[] |

**Returns:** *void*

___

### `Static` subscribe

▸ **subscribe**(`state`: `MamState`, `channelRoot`: string, `channelMode`: `MamCore.MamMode`, `channelKey?`: undefined | string): *`MamState`*

Add a subscription to your state object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | `MamState` | The state object to add the subscription to. |
`channelRoot` | string | The root of the channel to subscribe to. |
`channelMode` | `MamCore.MamMode` | Can be `public`, `private` or `restricted`. |
`channelKey?` | undefined \| string | Optional, the key of the channel to subscribe to. |

**Returns:** *`MamState`*

Updated state object to be used with future actions.

___