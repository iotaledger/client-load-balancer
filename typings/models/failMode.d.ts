/**
 * Fail modes for the load balancer.
 */
export declare enum FailMode {
    /**
     * Try single node only, failure throws exception.
     */
    single = "single",
    /**
     * Try all nodes until one succeeds, on all failing throws combined exception.
     */
    all = "all"
}
