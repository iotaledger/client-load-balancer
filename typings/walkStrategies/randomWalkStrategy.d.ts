import { NodeConfiguration } from "../models/nodeConfiguration";
import { BaseWalkStrategy } from "./baseWalkStrategy";
/**
 * Node choice strategy which randomly picks from the list of nodes.
 */
export declare class RandomWalkStrategy extends BaseWalkStrategy {
    /**
     * The remaining nodes to randomly pick from.
     */
    private _remainingNodes;
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
     */
    next(): void;
    /**
     * Populate the remaining array by randomizing the nodes.
     * @private
     */
    private populateRemaining;
}
