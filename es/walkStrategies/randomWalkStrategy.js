"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseWalkStrategy_1 = require("./baseWalkStrategy");
/**
 * Node choice strategy which randomly picks from the list of nodes.
 */
class RandomWalkStrategy extends baseWalkStrategy_1.BaseWalkStrategy {
    /**
     * Create a new instance of RandomWalkStategy.
     * @param nodes The nodes to randomly pick from.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes, blacklistLimit) {
        super(nodes, blacklistLimit);
        this._remainingNodes = [];
        this.populateRemaining();
    }
    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    current() {
        return this._remainingNodes[0];
    }
    /**
     * Move to the next node in the strategy.
     */
    next() {
        this._remainingNodes.shift();
        if (this._remainingNodes.length === 0) {
            this.populateRemaining();
        }
    }
    /**
     * Populate the remaining array by randomizing the nodes.
     * @private
     */
    populateRemaining() {
        this._remainingNodes = super.getUsableNodes().slice();
        for (let i = this._remainingNodes.length - 1; i > 0; i--) {
            // tslint:disable-next-line:insecure-random
            const j = Math.floor(Math.random() * (i + 1));
            [this._remainingNodes[i], this._remainingNodes[j]] = [this._remainingNodes[j], this._remainingNodes[i]];
        }
    }
}
exports.RandomWalkStrategy = RandomWalkStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tV2Fsa1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtTdHJhdGVnaWVzL3JhbmRvbVdhbGtTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFzRDtBQUV0RDs7R0FFRztBQUNILE1BQWEsa0JBQW1CLFNBQVEsbUNBQWdCO0lBTXBEOzs7O09BSUc7SUFDSCxZQUFZLEtBQTBCLEVBQUUsY0FBdUI7UUFDM0QsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCwyQ0FBMkM7WUFDM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0c7SUFDTCxDQUFDO0NBQ0o7QUEvQ0QsZ0RBK0NDIn0=