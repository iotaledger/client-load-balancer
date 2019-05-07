[@iota/client-load-balancer](../README.md) > [RandomWalkStrategy](../classes/randomwalkstrategy.md)

# Class: RandomWalkStrategy

Node choice strategy which randomly picks from the list of nodes.

## Hierarchy

 [BaseWalkStrategy](basewalkstrategy.md)

**↳ RandomWalkStrategy**

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

## Index

### Constructors

* [constructor](randomwalkstrategy.md#constructor)

### Methods

* [blacklist](randomwalkstrategy.md#blacklist)
* [current](randomwalkstrategy.md#current)
* [getUsableNodes](randomwalkstrategy.md#getusablenodes)
* [next](randomwalkstrategy.md#next)
* [totalUsable](randomwalkstrategy.md#totalusable)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RandomWalkStrategy**(nodes: *[NodeConfiguration](nodeconfiguration.md)[]*, blacklistLimit?: *`undefined` \| `number`*): [RandomWalkStrategy](randomwalkstrategy.md)

Create a new instance of RandomWalkStategy.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| nodes | [NodeConfiguration](nodeconfiguration.md)[] |  The nodes to randomly pick from. |
| `Optional` blacklistLimit | `undefined` \| `number` |  The number of failures before a node is blacklisted. |

**Returns:** [RandomWalkStrategy](randomwalkstrategy.md)

___

## Methods

<a id="blacklist"></a>

###  blacklist

▸ **blacklist**(): `void`

Blacklist the current node, so it doesn't get used again once limit is reached.

**Returns:** `void`

___
<a id="current"></a>

###  current

▸ **current**(): [NodeConfiguration](nodeconfiguration.md)

Get the current node from the strategy.

**Returns:** [NodeConfiguration](nodeconfiguration.md)
A node configuration from the strategy.

___
<a id="getusablenodes"></a>

### `<Protected>` getUsableNodes

▸ **getUsableNodes**(): [NodeConfiguration](nodeconfiguration.md)[]

Get the list of nodes that have not been blacklisted.

**Returns:** [NodeConfiguration](nodeconfiguration.md)[]
The non blacklisted nodes.

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

The total number of nodes configured for the strategy.

**Returns:** `number`
The total number of nodes.

___

