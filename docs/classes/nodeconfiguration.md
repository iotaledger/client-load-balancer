> ## [@iota/client-load-balancer](../README.md)

[NodeConfiguration](nodeconfiguration.md) /

# Class: NodeConfiguration

The configuration for a single node.

## Hierarchy

* **NodeConfiguration**

### Index

#### Properties

* [attachToTangle](nodeconfiguration.md#optional-attachtotangle)
* [depth](nodeconfiguration.md#optional-depth)
* [mwm](nodeconfiguration.md#optional-mwm)
* [provider](nodeconfiguration.md#provider)
* [timeoutMs](nodeconfiguration.md#optional-timeoutms)

## Properties

### `Optional` attachToTangle

● **attachToTangle**? : *`AttachToTangle`*

The attach to tangle method, defaults to using main load balancer setting.

___

### `Optional` depth

● **depth**? : *undefined | number*

The depth used for attaching.

___

### `Optional` mwm

● **mwm**? : *undefined | number*

The minimum weight magnitude used for attaching.

___

###  provider

● **provider**: *string*

The provider url for the node.

___

### `Optional` timeoutMs

● **timeoutMs**? : *undefined | number*

Timeout for this specific node, defaults to using the main load balancer setting.

___