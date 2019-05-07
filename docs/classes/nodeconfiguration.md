[@iota/client-load-balancer](../README.md) > [NodeConfiguration](../classes/nodeconfiguration.md)

# Class: NodeConfiguration

The configuration for a single node.

## Hierarchy

**NodeConfiguration**

## Index

### Properties

* [attachToTangle](nodeconfiguration.md#attachtotangle)
* [depth](nodeconfiguration.md#depth)
* [mwm](nodeconfiguration.md#mwm)
* [provider](nodeconfiguration.md#provider)
* [timeoutMs](nodeconfiguration.md#timeoutms)

---

## Properties

<a id="attachtotangle"></a>

### `<Optional>` attachToTangle

**● attachToTangle**: *`AttachToTangle`*

The attach to tangle method, defaults to using main load balancer setting.

___
<a id="depth"></a>

### `<Optional>` depth

**● depth**: *`undefined` \| `number`*

The depth used for attaching.

___
<a id="mwm"></a>

### `<Optional>` mwm

**● mwm**: *`undefined` \| `number`*

The minimum weight magnitude used for attaching.

___
<a id="provider"></a>

###  provider

**● provider**: *`string`*

The provider url for the node.

___
<a id="timeoutms"></a>

### `<Optional>` timeoutMs

**● timeoutMs**: *`undefined` \| `number`*

Timeout for this specific node, defaults to using the main load balancer setting.

___

