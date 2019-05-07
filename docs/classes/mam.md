[@iota/client-load-balancer](../README.md) > [Mam](../classes/mam.md)

# Class: Mam

Wrapper for Mam with load balancing

## Hierarchy

**Mam**

## Index

### Methods

* [attach](mam.md#attach)
* [changeMode](mam.md#changemode)
* [create](mam.md#create)
* [decode](mam.md#decode)
* [fetch](mam.md#fetch)
* [fetchSingle](mam.md#fetchsingle)
* [getRoot](mam.md#getroot)
* [init](mam.md#init)
* [listen](mam.md#listen)
* [subscribe](mam.md#subscribe)

---

## Methods

<a id="attach"></a>

### `<Static>` attach

▸ **attach**(trytes: *`string`*, root: *`string`*, depth?: *`undefined` \| `number`*, mwm?: *`undefined` \| `number`*, tag?: *`undefined` \| `string`*): `Promise`<`ReadonlyArray`<`Transaction`>>

Attach the mam trytes to the tangle.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| trytes | `string` |  The trytes to attach. |
| root | `string` |  The root to attach them to. |
| `Optional` depth | `undefined` \| `number` |  The depth to attach them with, defaults to 3. |
| `Optional` mwm | `undefined` \| `number` |  The minimum weight magnitude to attach with, defaults to 9 for devnet, 14 required for mainnet. |
| `Optional` tag | `undefined` \| `string` |  Trytes to tag the message with. |

**Returns:** `Promise`<`ReadonlyArray`<`Transaction`>>
The transaction objects.

___
<a id="changemode"></a>

### `<Static>` changeMode

▸ **changeMode**(state: *`MamState`*, mode: *`MamCore.MamMode`*, sidekey?: *`undefined` \| `string`*): `MamState`

Change the mode for the mam state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `MamState` |  The current mam state. |
| mode | `MamCore.MamMode` |  . |
| `Optional` sidekey | `undefined` \| `string` |

**Returns:** `MamState`
Updated state object to be used with future actions.

___
<a id="create"></a>

### `<Static>` create

▸ **create**(state: *`MamState`*, message: *`string`*): `MamMessage`

Creates a MAM message payload from a state object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `MamState` |  The current mam state. |
| message | `string` |  Tryte encoded string. |

**Returns:** `MamMessage`
An object containing the payload and updated state.

___
<a id="decode"></a>

### `<Static>` decode

▸ **decode**(payload: *`string`*, sideKey: *`string`*, root: *`string`*): `string`

Decode a message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| payload | `string` |  The payload of the message. |
| sideKey | `string` |  The sideKey used in the message. |
| root | `string` |  The root used for the message. |

**Returns:** `string`
The decoded payload.

___
<a id="fetch"></a>

### `<Static>` fetch

▸ **fetch**(root: *`string`*, mode: *`MamCore.MamMode`*, sideKey?: *`undefined` \| `string`*, callback?: *`undefined` \| `function`*, limit?: *`undefined` \| `number`*): `Promise`<`object` \| `Error`>

Fetch the messages asynchronously.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| root | `string` |  The root key to use. |
| mode | `MamCore.MamMode` |  The mode of the channel. |
| `Optional` sideKey | `undefined` \| `string` |  The sideKey used in the messages, only required for restricted. |
| `Optional` callback | `undefined` \| `function` |  Optional callback to receive each payload. |
| `Optional` limit | `undefined` \| `number` |  Limit the number of messages that are fetched. |

**Returns:** `Promise`<`object` \| `Error`>
The nextRoot and the messages if no callback was supplied, or an Error.

___
<a id="fetchsingle"></a>

### `<Static>` fetchSingle

▸ **fetchSingle**(root: *`string`*, mode: *`MamCore.MamMode`*, sideKey?: *`undefined` \| `string`*): `Promise`<`object` \| `Error`>

Fetch a single message asynchronously.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| root | `string` |  The root key to use. |
| mode | `MamCore.MamMode` |  The mode of the channel. |
| `Optional` sideKey | `undefined` \| `string` |  The sideKey used in the messages. |

**Returns:** `Promise`<`object` \| `Error`>
The nextRoot and the payload, or an Error.

___
<a id="getroot"></a>

### `<Static>` getRoot

▸ **getRoot**(state: *`MamState`*): `string`

Get the root from the mam state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `MamState` |  The mam state. |

**Returns:** `string`
The root.

___
<a id="init"></a>

### `<Static>` init

▸ **init**(settings: *[LoadBalancerSettings](loadbalancersettings.md)*, seed?: *`undefined` \| `string`*, security?: *`number`*): `MamState`

Initialisation function which returns a state object

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| settings | [LoadBalancerSettings](loadbalancersettings.md) | - |  Settings for the load balancer. |
| `Optional` seed | `undefined` \| `string` | - |  The seed to initialise with. |
| `Default value` security | `number` | 2 |  The security level, defaults to 2. |

**Returns:** `MamState`
The mam state.

___
<a id="listen"></a>

### `<Static>` listen

▸ **listen**(channel: *`MamSubscribedChannel`*, callback: *`function`*): `void`

Listen for new message on the channel.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| channel | `MamSubscribedChannel` |  The channel to listen on. |
| callback | `function` |  The callback to receive any messages, |

**Returns:** `void`

___
<a id="subscribe"></a>

### `<Static>` subscribe

▸ **subscribe**(state: *`MamState`*, channelRoot: *`string`*, channelKey?: *`undefined` \| `string`*): `MamState`

Add a subscription to your state object

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `MamState` |  The state object to add the subscription to. |
| channelRoot | `string` |  The root of the channel to subscribe to. |
| `Optional` channelKey | `undefined` \| `string` |  Optional, the key of the channel to subscribe to. |

**Returns:** `MamState`
Updated state object to be used with future actions.

___

