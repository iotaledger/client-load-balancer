import { NodeConfiguration } from "../models/nodeConfiguration";
import { BaseWalkStrategy } from "./baseWalkStrategy";

/**
 * Node choice strategy which just iterates through the list of nodes.
 */
export class LinearWalkStrategy extends BaseWalkStrategy {
    /**
     * The current node to use.
     */
    private _currentIndex: number;

    /**
     * Create a new instance of LinearWalkStrategy.
     * @param nodes The nodes to randomly pick from.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes: NodeConfiguration[], blacklistLimit?: number) {
        super(nodes, blacklistLimit);
        this._currentIndex = 0;
    }

    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    public current(): NodeConfiguration {
        return this.getUsableNodes()[this._currentIndex];
    }

    /**
     * Move to the next node in the strategy.
     * @param retainOrder Retain the ordering if resetting the list.
     */
    public next(retainOrder: boolean): void {
        this._currentIndex = (this._currentIndex + 1) % this.getUsableNodes().length;
    }
}
