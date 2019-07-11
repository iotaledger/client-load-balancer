import { NodeConfiguration } from "../models/nodeConfiguration";
import { BaseWalkStrategy } from "./baseWalkStrategy";
/**
 * Node choice strategy which just iterates through the list of nodes.
 */
export declare class LinearWalkStrategy extends BaseWalkStrategy {
    /**
     * The current node to use.
     */
    private _currentIndex;
    /**
     * Create a new instance of LinearWalkStrategy.
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
}
