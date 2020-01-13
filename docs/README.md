[@iota/client-load-balancer - v1.0.2](README.md)

# @iota/client-load-balancer - v1.0.2

## Index

### Enumerations

* [FailMode](enums/failmode.md)
* [SuccessMode](enums/successmode.md)

### Classes

* [BaseWalkStrategy](classes/basewalkstrategy.md)
* [LinearWalkStrategy](classes/linearwalkstrategy.md)
* [LoadBalancerSettings](classes/loadbalancersettings.md)
* [NodeConfiguration](classes/nodeconfiguration.md)
* [RandomWalkStrategy](classes/randomwalkstrategy.md)

### Interfaces

* [NodeWalkStrategy](interfaces/nodewalkstrategy.md)

### Functions

* [composeAPI](README.md#composeapi)

## Functions

###  composeAPI

▸ **composeAPI**(`settings`: [LoadBalancerSettings](classes/loadbalancersettings.md)): *API*

Create a new instance of the API wrapped with load balancing support.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`settings` | [LoadBalancerSettings](classes/loadbalancersettings.md) | The load balancer settings. |

**Returns:** *API*

The api.
