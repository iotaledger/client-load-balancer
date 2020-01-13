[@iota/client-load-balancer - v1.0.2](../README.md) › [LoadBalancerSettings](loadbalancersettings.md)

# Class: LoadBalancerSettings

Settings to use for the load balancer.

## Hierarchy

* **LoadBalancerSettings**

## Index

### Properties

* [attachToTangle](loadbalancersettings.md#optional-attachtotangle)
* [depth](loadbalancersettings.md#optional-depth)
* [failMode](loadbalancersettings.md#optional-failmode)
* [mwm](loadbalancersettings.md#optional-mwm)
* [nodeWalkStrategy](loadbalancersettings.md#nodewalkstrategy)
* [snapshotAware](loadbalancersettings.md#optional-snapshotaware)
* [successMode](loadbalancersettings.md#optional-successmode)
* [timeoutMs](loadbalancersettings.md#optional-timeoutms)

### Methods

* [failNodeCallback](loadbalancersettings.md#optional-failnodecallback)
* [tryNodeCallback](loadbalancersettings.md#optional-trynodecallback)

## Properties

### `Optional` attachToTangle

• **attachToTangle**? : *AttachToTangle*

The attach to tangle method.

___

### `Optional` depth

• **depth**? : *undefined | number*

The depth used for attaching, defaults to 3.

___

### `Optional` failMode

• **failMode**? : *[FailMode](../enums/failmode.md)*

How should we use the nodes on a failed request, defaults to all.

___

### `Optional` mwm

• **mwm**? : *undefined | number*

The minimum weight magnitude used for attaching, defaults to 9.

___

###  nodeWalkStrategy

• **nodeWalkStrategy**: *[NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

The strategy to use for node selection.

___

### `Optional` snapshotAware

• **snapshotAware**? : *undefined | false | true*

Should be look for missing data from snapshots.

___

### `Optional` successMode

• **successMode**? : *[SuccessMode](../enums/successmode.md)*

How should we use the nodes on a successful request, defaults to next.

___

### `Optional` timeoutMs

• **timeoutMs**? : *undefined | number*

A timeout to check if a node is non responsive, if not supplied will use default fetch timout.

## Methods

### `Optional` failNodeCallback

▸ **failNodeCallback**(`node`: [NodeConfiguration](nodeconfiguration.md), `error`: Error): *void*

Callback which is triggered when a node fails.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`node` | [NodeConfiguration](nodeconfiguration.md) | The node configuration that failed. |
`error` | Error | The error the node failed with.  |

**Returns:** *void*

___

### `Optional` tryNodeCallback

▸ **tryNodeCallback**(`node`: [NodeConfiguration](nodeconfiguration.md)): *void*

Callback which is triggered when a new node is about to be used.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`node` | [NodeConfiguration](nodeconfiguration.md) | The node configuration that was tried.  |

**Returns:** *void*
