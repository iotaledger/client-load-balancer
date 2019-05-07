[@iota/client-load-balancer](../README.md) > [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

# Interface: NodeWalkStrategy

A strategy for choosing nodes.

## Hierarchy

**NodeWalkStrategy**

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

---

## Methods

<a id="blacklist"></a>

###  blacklist

▸ **blacklist**(): `void`

Blacklist the current node, so it doesn't get used again.

**Returns:** `void`

___
<a id="current"></a>

###  current

▸ **current**(): [NodeConfiguration](../classes/nodeconfiguration.md)

Get the current node from the strategy.

**Returns:** [NodeConfiguration](../classes/nodeconfiguration.md)
A node configuration from the strategy.

___
<a id="next"></a>

###  next

▸ **next**(): `void`

Move to the next node in the strategy.

**Returns:** `void`

___
<a id="totalusable"></a>

###  totalUsable

▸ **totalUsable**(): `number`

The total number of usable nodes for the strategy.

**Returns:** `number`
The total number of usable nodes.

___

