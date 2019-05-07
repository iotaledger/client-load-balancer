[@iota/client-load-balancer](../README.md) > [LinearWalkStrategy](../classes/linearwalkstrategy.md)

# Class: LinearWalkStrategy

Node choice strategy which just iterates through the list of nodes.

## Hierarchy

 [BaseWalkStrategy](basewalkstrategy.md)

**↳ LinearWalkStrategy**

## Implements

* [NodeWalkStrategy](../interfaces/nodewalkstrategy.md)

## Index

### Constructors

* [constructor](linearwalkstrategy.md#constructor)

### Methods

* [blacklist](linearwalkstrategy.md#blacklist)
* [current](linearwalkstrategy.md#current)
* [getUsableNodes](linearwalkstrategy.md#getusablenodes)
* [next](linearwalkstrategy.md#next)
* [totalUsable](linearwalkstrategy.md#totalusable)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LinearWalkStrategy**(nodes: *[NodeConfiguration](nodeconfiguration.md)[]*, blacklistLimit?: *`undefined` \| `number`*): [LinearWalkStrategy](linearwalkstrategy.md)

Create a new instance of LinearWalkStrategy.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| nodes | [NodeConfiguration](nodeconfiguration.md)[] |  The nodes to randomly pick from. |
| `Optional` blacklistLimit | `undefined` \| `number` |  The number of failures before a node is blacklisted. |

**Returns:** [LinearWalkStrategy](linearwalkstrategy.md)

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

