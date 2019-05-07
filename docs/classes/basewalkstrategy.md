[@iota/client-load-balancer](../README.md) > [BaseWalkStrategy](../classes/basewalkstrategy.md)

# Class: BaseWalkStrategy

Common features for the node strategies.

## Hierarchy

**BaseWalkStrategy**

↳  [LinearWalkStrategy](linearwalkstrategy.md)

↳  [RandomWalkStrategy](randomwalkstrategy.md)

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

## Index

### Constructors

* [constructor](basewalkstrategy.md#constructor)

### Methods

* [blacklist](basewalkstrategy.md#blacklist)
* [current](basewalkstrategy.md#current)
* [getUsableNodes](basewalkstrategy.md#getusablenodes)
* [next](basewalkstrategy.md#next)
* [totalUsable](basewalkstrategy.md#totalusable)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BaseWalkStrategy**(nodes: *[NodeConfiguration](nodeconfiguration.md)[]*, blacklistLimit?: *`undefined` \| `number`*): [BaseWalkStrategy](basewalkstrategy.md)

Create a new instance of BaseWalkStrategy.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| nodes | [NodeConfiguration](nodeconfiguration.md)[] |  The nodes to iterate through. |
| `Optional` blacklistLimit | `undefined` \| `number` |  The number of failures before a node is blacklisted. |

**Returns:** [BaseWalkStrategy](basewalkstrategy.md)

___

## Methods

<a id="blacklist"></a>

###  blacklist

▸ **blacklist**(): `void`

Blacklist the current node, so it doesn't get used again once limit is reached.

**Returns:** `void`

___
<a id="current"></a>

### `<Abstract>` current

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

### `<Abstract>` next

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

