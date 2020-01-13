[@iota/client-load-balancer - v1.0.2](../README.md) › [NodeWalkStrategy](nodewalkstrategy.md)

# Interface: NodeWalkStrategy

A strategy for choosing nodes.

## Hierarchy

* **NodeWalkStrategy**

## Implemented by

* [BaseWalkStrategy](../classes/basewalkstrategy.md)
* [LinearWalkStrategy](../classes/linearwalkstrategy.md)
* [RandomWalkStrategy](../classes/randomwalkstrategy.md)

## Index

### Methods

* [blacklist](nodewalkstrategy.md#blacklist)
* [current](nodewalkstrategy.md#current)
* [next](nodewalkstrategy.md#next)
* [totalUsable](nodewalkstrategy.md#totalusable)

## Methods

###  blacklist

▸ **blacklist**(): *void*

Blacklist the current node, so it doesn't get used again.

**Returns:** *void*

___

###  current

▸ **current**(): *[NodeConfiguration](../classes/nodeconfiguration.md)*

Get the current node from the strategy.

**Returns:** *[NodeConfiguration](../classes/nodeconfiguration.md)*

A node configuration from the strategy.

___

###  next

▸ **next**(`retainOrder`: boolean): *void*

Move to the next node in the strategy.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`retainOrder` | boolean | Retain the ordering if resetting the list.  |

**Returns:** *void*

___

###  totalUsable

▸ **totalUsable**(): *number*

The total number of usable nodes for the strategy.

**Returns:** *number*

The total number of usable nodes.
