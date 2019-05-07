
#  @iota/client-load-balancer

## Index

### Enumerations

* [FailMode](enums/failmode.md)
* [SuccessMode](enums/successmode.md)

### Classes

* [LinearWalkStrategy](classes/linearwalkstrategy.md)
* [LoadBalancerSettings](classes/loadbalancersettings.md)
* [Mam](classes/mam.md)
* [NodeConfiguration](classes/nodeconfiguration.md)
* [RandomWalkStrategy](classes/randomwalkstrategy.md)

### Interfaces

* [NodeWalkStrategy](interfaces/nodewalkstrategy.md)

### Functions

* [composeAPI](#composeapi)

---

## Functions

<a id="composeapi"></a>

###  composeAPI

▸ **composeAPI**(settings: *[LoadBalancerSettings](classes/loadbalancersettings.md)*): `API`

Create a new instance of the API wrapped with load balancing support.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| settings | [LoadBalancerSettings](classes/loadbalancersettings.md) |  The load balancer settings. |

**Returns:** `API`
The api.

___

