import { NodeConfiguration } from "../models/nodeConfiguration";
import { NodeWalkStrategy } from "../models/nodeWalkStrategy";

/**
 * Common features for the node strategies.
 * @private
 */
export abstract class BaseWalkStrategy implements NodeWalkStrategy {
    /**
     * The list of all configured nodes.
     */
    private readonly _allNodes: NodeConfiguration[];

    /**
     * The number of failures before a node is blacklisted.
     */
    private readonly _blacklistLimit?: number;

    /**
     * The list of usable nodes to iterate through.
     */
    private _usableNodes: NodeConfiguration[];

    /**
     * The nodes that have been blacklisted.
     */
    private _blacklistNodes: { [id: string]: number };

    /**
     * Create a new instance of BaseWalkStrategy.
     * @param nodes The nodes to iterate through.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes: NodeConfiguration[], blacklistLimit?: number) {
        if (!nodes || nodes.length === 0) {
            throw new Error("You must supply at least one node to the strategy");
        }
        this._allNodes = nodes;
        this._usableNodes = nodes.slice();
        this._blacklistLimit = blacklistLimit;
        this._blacklistNodes = {};
    }

    /**
     * The total number of nodes configured for the strategy.
     * @returns The total number of nodes.
     */
    public totalUsable(): number {
        return this._usableNodes.length;
    }

    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    public abstract current(): NodeConfiguration;

    /**
     * Move to the next node in the strategy.
     * @param retainOrder Retain the ordering if resetting the list.
     */
    public abstract next(retainOrder: boolean): void;

    /**
     * Blacklist the current node, so it doesn't get used again once limit is reached.
     */
    public blacklist(): void {
        if (this._blacklistLimit) {
            const current = this.current();
            if (current) {
                if (!this._blacklistNodes[current.provider]) {
                    this._blacklistNodes[current.provider] = 1;
                } else {
                    this._blacklistNodes[current.provider]++;
                }
                if (this._blacklistNodes[current.provider] >= this._blacklistLimit) {
                    const idx = this._usableNodes.indexOf(current);
                    if (idx >= 0) {
                        this._usableNodes.splice(idx, 1);
                    }
                }

                // If there are no usable nodes left then reset the blacklists
                if (this._usableNodes.length === 0) {
                    this._blacklistNodes = {};
                    this._usableNodes = this._allNodes.slice();
                }
            }
        }
    }

    /**
     * Get the list of nodes that have not been blacklisted.
     * @returns The non blacklisted nodes.
     */
    protected getUsableNodes(): NodeConfiguration[] {
        return this._usableNodes;
    }
}
