import { NodeConfiguration } from "./nodeConfiguration";
/**
 * A strategy for choosing nodes.
 */
export interface NodeWalkStrategy {
    /**
     * The total number of usable nodes for the strategy.
     * @returns The total number of usable nodes.
     */
    totalUsable(): number;
    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    current(): NodeConfiguration;
    /**
     * Move to the next node in the strategy.
     * @param retainOrder Retain the ordering if resetting the list.
     */
    next(retainOrder: boolean): void;
    /**
     * Blacklist the current node, so it doesn't get used again.
     */
    blacklist(): void;
}
