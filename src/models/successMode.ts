/**
 * Success modes for the load balancer.
 */
export enum SuccessMode {
    /**
     * Keep the node if it was successful.
     */
    keep = "keep",
    /**
     * Move to the next node even if it was successful.
     */
    next = "next"
}
