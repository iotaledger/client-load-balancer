> **[@iota/client-load-balancer](../README.md)**

[RandomWalkStrategy](randomwalkstrategy.md) /

# Class: RandomWalkStrategy

Node choice strategy which randomly picks from the list of nodes.

## Hierarchy

* [BaseWalkStrategy](basewalkstrategy.md)

  * **RandomWalkStrategy**

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

### Index

#### Constructors

* [constructor](randomwalkstrategy.md#constructor)

#### Methods

* [blacklist](randomwalkstrategy.md#blacklist)
* [current](randomwalkstrategy.md#current)
* [getUsableNodes](randomwalkstrategy.md#protected-getusablenodes)
* [next](randomwalkstrategy.md#next)
* [totalUsable](randomwalkstrategy.md#totalusable)

## Constructors

###  constructor

\+ **new RandomWalkStrategy**(`nodes`: [NodeConfiguration](nodeconfiguration.md)[], `blacklistLimit?`: undefined | number): *[RandomWalkStrategy](randomwalkstrategy.md)*

*Overrides [BaseWalkStrategy](basewalkstrategy.md).[constructor](basewalkstrategy.md#constructor)*

Create a new instance of RandomWalkStategy.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`nodes` | [NodeConfiguration](nodeconfiguration.md)[] | The nodes to randomly pick from. |
`blacklistLimit?` | undefined \| number | The number of failures before a node is blacklisted.  |

**Returns:** *[RandomWalkStrategy](randomwalkstrategy.md)*

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

▸ **next**(): *void*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Overrides [BaseWalkStrategy](basewalkstrategy.md).[next](basewalkstrategy.md#abstract-next)*

Move to the next node in the strategy.

**Returns:** *void*

___

###  totalUsable

▸ **totalUsable**(): *number*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

*Inherited from [BaseWalkStrategy](basewalkstrategy.md).[totalUsable](basewalkstrategy.md#totalusable)*

The total number of nodes configured for the strategy.

**Returns:** *number*

The total number of nodes.