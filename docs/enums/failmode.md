> **[@iota/client-load-balancer](../README.md)**

[FailMode](failmode.md) /

# Enumeration: FailMode

Fail modes for the load balancer.

### Index

#### Enumeration members

* [all](failmode.md#all)
* [single](failmode.md#single)

## Enumeration members

###  all

• **all**: = "all"

Try all nodes until one succeeds, on all failing throws combined exception.

___

###  single

• **single**: = "single"

Try single node only, failure throws exception.