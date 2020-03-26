## Classes

<dl>
<dt><a href="#Mam">Mam</a></dt>
<dd><p>Wrapper for Mam with load balancing</p>
</dd>
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

<a name="Mam"></a>

## Mam
Wrapper for Mam with load balancing

**Kind**: global class  

* [Mam](#Mam)
    * [.init(settings, seed, security)](#Mam.init) ⇒
    * [.changeMode(state, mode, sidekey,)](#Mam.changeMode) ⇒
    * [.getRoot(state)](#Mam.getRoot) ⇒
    * [.subscribe(state, channelRoot, channelMode, channelKey)](#Mam.subscribe) ⇒
    * [.listen(channel, callback)](#Mam.listen)
    * [.create(state, message)](#Mam.create) ⇒
    * [.decode(payload, sideKey, root)](#Mam.decode) ⇒
    * [.fetch(root, mode, sideKey, callback, limit)](#Mam.fetch) ⇒
    * [.fetchSingle(root, mode, sideKey)](#Mam.fetchSingle) ⇒
    * [.attach(trytes, root, depth, mwm, tag)](#Mam.attach) ⇒

<a name="Mam.init"></a>

### Mam.init(settings, seed, security) ⇒
Initialisation function which returns a state object

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The mam state.  

| Param | Default | Description |
| --- | --- | --- |
| settings |  | Settings for the load balancer. |
| seed |  | The seed to initialise with. |
| security | <code>2</code> | The security level, defaults to 2. |

<a name="Mam.changeMode"></a>

### Mam.changeMode(state, mode, sidekey,) ⇒
Change the mode for the mam state.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: Updated state object to be used with future actions.  

| Param | Description |
| --- | --- |
| state | The current mam state. |
| mode | [public/private/restricted]. |
| sidekey, | required for restricted mode. |

<a name="Mam.getRoot"></a>

### Mam.getRoot(state) ⇒
Get the root from the mam state.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The root.  

| Param | Description |
| --- | --- |
| state | The mam state. |

<a name="Mam.subscribe"></a>

### Mam.subscribe(state, channelRoot, channelMode, channelKey) ⇒
Add a subscription to your state object

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: Updated state object to be used with future actions.  

| Param | Description |
| --- | --- |
| state | The state object to add the subscription to. |
| channelRoot | The root of the channel to subscribe to. |
| channelMode | Can be `public`, `private` or `restricted`. |
| channelKey | Optional, the key of the channel to subscribe to. |

<a name="Mam.listen"></a>

### Mam.listen(channel, callback)
Listen for new message on the channel.

**Kind**: static method of [<code>Mam</code>](#Mam)  

| Param | Description |
| --- | --- |
| channel | The channel to listen on. |
| callback | The callback to receive any messages, |

<a name="Mam.create"></a>

### Mam.create(state, message) ⇒
Creates a MAM message payload from a state object.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: An object containing the payload and updated state.  

| Param | Description |
| --- | --- |
| state | The current mam state. |
| message | Tryte encoded string. |

<a name="Mam.decode"></a>

### Mam.decode(payload, sideKey, root) ⇒
Decode a message.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The decoded payload.  

| Param | Description |
| --- | --- |
| payload | The payload of the message. |
| sideKey | The sideKey used in the message. |
| root | The root used for the message. |

<a name="Mam.fetch"></a>

### Mam.fetch(root, mode, sideKey, callback, limit) ⇒
Fetch the messages asynchronously.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The nextRoot and the messages if no callback was supplied, or an Error.  

| Param | Description |
| --- | --- |
| root | The root key to use. |
| mode | The mode of the channel. |
| sideKey | The sideKey used in the messages, only required for restricted. |
| callback | Optional callback to receive each payload. |
| limit | Limit the number of messages that are fetched. |

<a name="Mam.fetchSingle"></a>

### Mam.fetchSingle(root, mode, sideKey) ⇒
Fetch a single message asynchronously.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The nextRoot and the payload, or an Error.  

| Param | Description |
| --- | --- |
| root | The root key to use. |
| mode | The mode of the channel. |
| sideKey | The sideKey used in the messages. |

<a name="Mam.attach"></a>

### Mam.attach(trytes, root, depth, mwm, tag) ⇒
Attach the mam trytes to the tangle.

**Kind**: static method of [<code>Mam</code>](#Mam)  
**Returns**: The transaction objects.  

| Param | Description |
| --- | --- |
| trytes | The trytes to attach. |
| root | The root to attach them to. |
| depth | The depth to attach them with, defaults to 3. |
| mwm | The minimum weight magnitude to attach with, defaults to 9 for devnet, 14 required for mainnet. |
| tag | Trytes to tag the message with. |

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

