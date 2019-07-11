import { NodeConfiguration } from "../models/nodeConfiguration";
import { BaseWalkStrategy } from "./baseWalkStrategy";
/**
 * Node choice strategy which randomly picks from the list of nodes.
 */
export declare class RandomWalkStrategy extends BaseWalkStrategy {
    /**
     * The remaining nodes to randomly pick from.
     * @internal
     */
    private _remainingNodes;
    /**
     * The current random ordering.
     * @internal
     */
    private _randomNodes;
    /**
     * Create a new instance of RandomWalkStategy.
     * @param nodes The nodes to randomly pick from.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes: NodeConfiguration[], blacklistLimit?: number);
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
     * Populate the remaining array by randomizing the nodes.
     * @internal
     * @private
     */
    private populateRemaining;
}
