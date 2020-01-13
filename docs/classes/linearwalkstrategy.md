[@iota/client-load-balancer - v1.0.2](../README.md) › [LinearWalkStrategy](linearwalkstrategy.md)

# Class: LinearWalkStrategy

Node choice strategy which just iterates through the list of nodes.

## Hierarchy

* [BaseWalkStrategy](basewalkstrategy.md)

  ↳ **LinearWalkStrategy**

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

## Index

### Constructors

* [constructor](linearwalkstrategy.md#constructor)

### Methods

* [blacklist](linearwalkstrategy.md#blacklist)
* [current](linearwalkstrategy.md#current)
* [getUsableNodes](linearwalkstrategy.md#protected-getusablenodes)
* [next](linearwalkstrategy.md#next)
* [totalUsable](linearwalkstrategy.md#totalusable)

## Constructors

###  constructor

\+ **new LinearWalkStrategy**(`nodes`: [NodeConfiguration](nodeconfiguration.md)[], `blacklistLimit?`: undefined | number): *[LinearWalkStrategy](linearwalkstrategy.md)*

*Overrides [BaseWalkStrategy](basewalkstrategy.md).[constructor](basewalkstrategy.md#constructor)*

Create a new instance of LinearWalkStrategy.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`nodes` | [NodeConfiguration](nodeconfiguration.md)[] | The nodes to randomly pick from. |
`blacklistLimit?` | undefined &#124; number | The number of failures before a node is blacklisted.  |

**Returns:** *[LinearWalkStrategy](linearwalkstrategy.md)*

## Methods

###  blacklist

▸ **blacklist**(): *void*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Inherited from [BaseWalkStrategy](basewalkstrategy.md).[blacklist](basewalkstrategy.md#blacklist)*

Blacklist the current node, so it doesn't get used again once limit is reached.

**Returns:** *void*

___

###  current

▸ **current**(): *[NodeConfiguration](nodeconfiguration.md)*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Overrides [BaseWalkStrategy](basewalkstrategy.md).[current](basewalkstrategy.md#abstract-current)*

Get the current node from the strategy.

**Returns:** *[NodeConfiguration](nodeconfiguration.md)*

A node configuration from the strategy.

___

### `Protected` getUsableNodes

▸ **getUsableNodes**(): *[NodeConfiguration](nodeconfiguration.md)[]*

*Inherited from [BaseWalkStrategy](basewalkstrategy.md).[getUsableNodes](basewalkstrategy.md#protected-getusablenodes)*

Get the list of nodes that have not been blacklisted.

**Returns:** *[NodeConfiguration](nodeconfiguration.md)[]*

The non blacklisted nodes.

___

###  next

▸ **next**(`retainOrder`: boolean): *void*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Overrides [BaseWalkStrategy](basewalkstrategy.md).[next](basewalkstrategy.md#abstract-next)*

Move to the next node in the strategy.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`retainOrder` | boolean | Retain the ordering if resetting the list.  |

**Returns:** *void*

___

###  totalUsable

▸ **totalUsable**(): *number*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Inherited from [BaseWalkStrategy](basewalkstrategy.md).[totalUsable](basewalkstrategy.md#totalusable)*

The total number of nodes configured for the strategy.

**Returns:** *number*

The total number of nodes.
