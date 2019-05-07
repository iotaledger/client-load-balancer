import { NodeConfiguration } from "../models/nodeConfiguration";
import { BaseWalkStrategy } from "./baseWalkStrategy";

/**
 * Node choice strategy which randomly picks from the list of nodes.
 */
export class RandomWalkStrategy extends BaseWalkStrategy {
    /**
     * The remaining nodes to randomly pick from.
     */
    private _remainingNodes: NodeConfiguration[];

    /**
     * Create a new instance of RandomWalkStategy.
     * @param nodes The nodes to randomly pick from.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes: NodeConfiguration[], blacklistLimit?: number) {
        super(nodes, blacklistLimit);
        this._remainingNodes = [];
        this.populateRemaining();
    }

    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    public current(): NodeConfiguration {
        return this._remainingNodes[0];
    }

    /**
     * Move to the next node in the strategy.
     */
    public next(): void {
        this._remainingNodes.shift();
        if (this._remainingNodes.length === 0) {
            this.populateRemaining();
        }
    }

    /**
     * Populate the remaining array by randomizing the nodes.
     * @private
     */
    private populateRemaining(): void {
        this._remainingNodes = super.getUsableNodes().slice();
        for (let i = this._remainingNodes.length - 1; i > 0; i--) {
            // tslint:disable-next-line:insecure-random
            const j = Math.floor(Math.random() * (i + 1));
            [this._remainingNodes[i], this._remainingNodes[j]] = [this._remainingNodes[j], this._remainingNodes[i]];
        }
    }
}
