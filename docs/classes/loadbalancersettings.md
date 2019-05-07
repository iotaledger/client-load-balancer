[@iota/client-load-balancer](../README.md) > [LoadBalancerSettings](../classes/loadbalancersettings.md)

# Class: LoadBalancerSettings

Settings to use for the load balancer.

## Hierarchy

**LoadBalancerSettings**

## Index

### Properties

* [attachToTangle](loadbalancersettings.md#attachtotangle)
* [depth](loadbalancersettings.md#depth)
* [failMode](loadbalancersettings.md#failmode)
* [mwm](loadbalancersettings.md#mwm)
* [nodeWalkStrategy](loadbalancersettings.md#nodewalkstrategy)
* [snapshotAware](loadbalancersettings.md#snapshotaware)
* [successMode](loadbalancersettings.md#successmode)
* [timeoutMs](loadbalancersettings.md#timeoutms)

### Methods

* [failNodeCallback](loadbalancersettings.md#failnodecallback)
* [tryNodeCallback](loadbalancersettings.md#trynodecallback)

---

## Properties

<a id="attachtotangle"></a>

### `<Optional>` attachToTangle

**● attachToTangle**: *`AttachToTangle`*

The attach to tangle method.

___
<a id="depth"></a>

### `<Optional>` depth

**● depth**: *`undefined` \| `number`*

The depth used for attaching, defaults to 3.

___
<a id="failmode"></a>

### `<Optional>` failMode

**● failMode**: *[FailMode](../enums/failmode.md)*

How should we use the nodes on a failed request, defaults to all.

___
<a id="mwm"></a>

### `<Optional>` mwm

**● mwm**: *`undefined` \| `number`*

The minimum weight magnitude used for attaching, defaults to 9.

___
<a id="nodewalkstrategy"></a>

###  nodeWalkStrategy

**● nodeWalkStrategy**: *[NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

The strategy to use for node selection.

___
<a id="snapshotaware"></a>

### `<Optional>` snapshotAware

**● snapshotAware**: *`undefined` \| `false` \| `true`*

Should be look for missing data from snapshots.

___
<a id="successmode"></a>

### `<Optional>` successMode

**● successMode**: *[SuccessMode](../enums/successmode.md)*

How should we use the nodes on a successful request, defaults to next.

___
<a id="timeoutms"></a>

### `<Optional>` timeoutMs

**● timeoutMs**: *`undefined` \| `number`*

A timeout to check if a node is non responsive, if not supplied will use default fetch timout.

___

## Methods

<a id="failnodecallback"></a>

### `<Optional>` failNodeCallback

▸ **failNodeCallback**(node: *[NodeConfiguration](nodeconfiguration.md)*, error: *`Error`*): `void`

Callback which is triggered when a node fails.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| node | [NodeConfiguration](nodeconfiguration.md) |  The node configuration that failed. |
| error | `Error` |  The error the node failed with. |

**Returns:** `void`

___
<a id="trynodecallback"></a>

### `<Optional>` tryNodeCallback

▸ **tryNodeCallback**(node: *[NodeConfiguration](nodeconfiguration.md)*): `void`

Callback which is triggered when a new node is about to be used.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| node | [NodeConfiguration](nodeconfiguration.md) |  The node configuration that was tried. |

**Returns:** `void`

___

