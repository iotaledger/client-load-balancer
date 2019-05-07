import { NodeConfiguration } from "../models/nodeConfiguration";
import { NodeWalkStrategy } from "../models/nodeWalkStrategy";
/**
 * Common features for the node strategies.
 * @private
 */
export declare abstract class BaseWalkStrategy implements NodeWalkStrategy {
    /**
     * The list of all configured nodes.
     */
    private readonly _allNodes;
    /**
     * The number of failures before a node is blacklisted.
     */
    private readonly _blacklistLimit?;
    /**
     * The list of usable nodes to iterate through.
     */
    private _usableNodes;
    /**
     * The nodes that have been blacklisted.
     */
    private _blacklistNodes;
    /**
     * Create a new instance of BaseWalkStrategy.
     * @param nodes The nodes to iterate through.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes: NodeConfiguration[], blacklistLimit?: number);
    /**
     * The total number of nodes configured for the strategy.
     * @returns The total number of nodes.
     */
    totalUsable(): number;
    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    abstract current(): NodeConfiguration;
    /**
     * Move to the next node in the strategy.
     */
    abstract next(): void;
    /**
     * Blacklist the current node, so it doesn't get used again once limit is reached.
     */
    blacklist(): void;
    /**
     * Get the list of nodes that have not been blacklisted.
     * @returns The non blacklisted nodes.
     */
    protected getUsableNodes(): NodeConfiguration[];
}
