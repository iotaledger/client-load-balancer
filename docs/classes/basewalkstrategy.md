> ## [@iota/client-load-balancer](../README.md)

[BaseWalkStrategy](basewalkstrategy.md) /

# Class: BaseWalkStrategy

Common features for the node strategies.

## Hierarchy

* **BaseWalkStrategy**

  * [LinearWalkStrategy](linearwalkstrategy.md)

  * [RandomWalkStrategy](randomwalkstrategy.md)

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

### Index

#### Constructors

* [constructor](basewalkstrategy.md#constructor)

#### Methods

* [blacklist](basewalkstrategy.md#blacklist)
* [current](basewalkstrategy.md#abstract-current)
* [getUsableNodes](basewalkstrategy.md#protected-getusablenodes)
* [next](basewalkstrategy.md#abstract-next)
* [totalUsable](basewalkstrategy.md#totalusable)

## Constructors

###  constructor

\+ **new BaseWalkStrategy**(`nodes`: [NodeConfiguration](nodeconfiguration.md)[], `blacklistLimit?`: undefined | number): *[BaseWalkStrategy](basewalkstrategy.md)*

Create a new instance of BaseWalkStrategy.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`nodes` | [NodeConfiguration](nodeconfiguration.md)[] | The nodes to iterate through. |
`blacklistLimit?` | undefined \| number | The number of failures before a node is blacklisted.  |

**Returns:** *[BaseWalkStrategy](basewalkstrategy.md)*

___

## Methods

###  blacklist

▸ **blacklist**(): *void*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

Blacklist the current node, so it doesn't get used again once limit is reached.

**Returns:** *void*

___

### `Abstract` current

▸ **current**(): *[NodeConfiguration](nodeconfiguration.md)*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

Get the current node from the strategy.

**Returns:** *[NodeConfiguration](nodeconfiguration.md)*

A node configuration from the strategy.

___

### `Protected` getUsableNodes

▸ **getUsableNodes**(): *[NodeConfiguration](nodeconfiguration.md)[]*

Get the list of nodes that have not been blacklisted.

**Returns:** *[NodeConfiguration](nodeconfiguration.md)[]*

The non blacklisted nodes.

___

### `Abstract` next

▸ **next**(`retainOrder`: boolean): *void*

*Implementation of [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)*

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

The total number of nodes configured for the strategy.

**Returns:** *number*

The total number of nodes.

___