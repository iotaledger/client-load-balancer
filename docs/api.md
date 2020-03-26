## Classes

<dl>
<dt><a href="#LoadBalancerSettings">LoadBalancerSettings</a></dt>
<dd><p>Settings to use for the load balancer.</p>
</dd>
<dt><a href="#NodeConfiguration">NodeConfiguration</a></dt>
<dd><p>The configuration for a single node.</p>
</dd>
<dt><a href="#LinearWalkStrategy">LinearWalkStrategy</a></dt>
<dd><p>Node choice strategy which just iterates through the list of nodes.</p>
</dd>
<dt><a href="#RandomWalkStrategy">RandomWalkStrategy</a></dt>
<dd><p>Node choice strategy which randomly picks from the list of nodes.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#FailMode">FailMode</a></dt>
<dd><p>Fail modes for the load balancer.</p>
</dd>
<dt><a href="#SuccessMode">SuccessMode</a></dt>
<dd><p>Success modes for the load balancer.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#composeAPI">composeAPI(settings)</a> ⇒</dt>
<dd><p>Create a new instance of the API wrapped with load balancing support.</p>
</dd>
</dl>

<a name="LoadBalancerSettings"></a>

## LoadBalancerSettings
Settings to use for the load balancer.

**Kind**: global class  
<a name="NodeConfiguration"></a>

## NodeConfiguration
The configuration for a single node.

**Kind**: global class  
<a name="LinearWalkStrategy"></a>

## LinearWalkStrategy
Node choice strategy which just iterates through the list of nodes.

**Kind**: global class  

* [LinearWalkStrategy](#LinearWalkStrategy)
    * [new LinearWalkStrategy(nodes, blacklistLimit)](#new_LinearWalkStrategy_new)
    * [.current()](#LinearWalkStrategy+current) ⇒
    * [.next(retainOrder)](#LinearWalkStrategy+next)

<a name="new_LinearWalkStrategy_new"></a>

### new LinearWalkStrategy(nodes, blacklistLimit)
Create a new instance of LinearWalkStrategy.


| Param | Description |
| --- | --- |
| nodes | The nodes to randomly pick from. |
| blacklistLimit | The number of failures before a node is blacklisted. |

<a name="LinearWalkStrategy+current"></a>

### linearWalkStrategy.current() ⇒
Get the current node from the strategy.

**Kind**: instance method of [<code>LinearWalkStrategy</code>](#LinearWalkStrategy)  
**Returns**: A node configuration from the strategy.  
<a name="LinearWalkStrategy+next"></a>

### linearWalkStrategy.next(retainOrder)
Move to the next node in the strategy.

**Kind**: instance method of [<code>LinearWalkStrategy</code>](#LinearWalkStrategy)  

| Param | Description |
| --- | --- |
| retainOrder | Retain the ordering if resetting the list. |

<a name="RandomWalkStrategy"></a>

## RandomWalkStrategy
Node choice strategy which randomly picks from the list of nodes.

**Kind**: global class  

* [RandomWalkStrategy](#RandomWalkStrategy)
    * [new RandomWalkStrategy(nodes, blacklistLimit)](#new_RandomWalkStrategy_new)
    * [.current()](#RandomWalkStrategy+current) ⇒
    * [.next(retainOrder)](#RandomWalkStrategy+next)

<a name="new_RandomWalkStrategy_new"></a>

### new RandomWalkStrategy(nodes, blacklistLimit)
Create a new instance of RandomWalkStategy.


| Param | Description |
| --- | --- |
| nodes | The nodes to randomly pick from. |
| blacklistLimit | The number of failures before a node is blacklisted. |

<a name="RandomWalkStrategy+current"></a>

### randomWalkStrategy.current() ⇒
Get the current node from the strategy.

**Kind**: instance method of [<code>RandomWalkStrategy</code>](#RandomWalkStrategy)  
**Returns**: A node configuration from the strategy.  
<a name="RandomWalkStrategy+next"></a>

### randomWalkStrategy.next(retainOrder)
Move to the next node in the strategy.

**Kind**: instance method of [<code>RandomWalkStrategy</code>](#RandomWalkStrategy)  

| Param | Description |
| --- | --- |
| retainOrder | Retain the ordering if resetting the list. |

<a name="FailMode"></a>

## FailMode
Fail modes for the load balancer.

**Kind**: global variable  

* [FailMode](#FailMode)
    * [.single](#FailMode.single)
    * [.all](#FailMode.all)

<a name="FailMode.single"></a>

### FailMode.single
Try single node only, failure throws exception.

**Kind**: static property of [<code>FailMode</code>](#FailMode)  
<a name="FailMode.all"></a>

### FailMode.all
Try all nodes until one succeeds, on all failing throws combined exception.

**Kind**: static property of [<code>FailMode</code>](#FailMode)  
<a name="SuccessMode"></a>

## SuccessMode
Success modes for the load balancer.

**Kind**: global variable  

* [SuccessMode](#SuccessMode)
    * [.keep](#SuccessMode.keep)
    * [.next](#SuccessMode.next)

<a name="SuccessMode.keep"></a>

### SuccessMode.keep
Keep the node if it was successful.

**Kind**: static property of [<code>SuccessMode</code>](#SuccessMode)  
<a name="SuccessMode.next"></a>

### SuccessMode.next
Move to the next node even if it was successful.

**Kind**: static property of [<code>SuccessMode</code>](#SuccessMode)  
<a name="composeAPI"></a>

## composeAPI(settings) ⇒
Create a new instance of the API wrapped with load balancing support.

**Kind**: global function  
**Returns**: The api.  

| Param | Description |
| --- | --- |
| settings | The load balancer settings. |

