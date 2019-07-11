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
        this._randomNodes = [];
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
     * @param retainOrder Retain the ordering if resetting the list.
     */
    next(retainOrder) {
        this._remainingNodes.shift();
        if (this._remainingNodes.length === 0) {
            if (retainOrder) {
                this._remainingNodes = this._randomNodes.slice();
            }
            else {
                this.populateRemaining();
            }
        }
    }
    /**
     * Populate the remaining array by randomizing the nodes.
     * @internal
     * @private
     */
    populateRemaining() {
        this._remainingNodes = super.getUsableNodes().slice();
        for (let i = this._remainingNodes.length - 1; i > 0; i--) {
            // tslint:disable-next-line:insecure-random
            const j = Math.floor(Math.random() * (i + 1));
            [this._remainingNodes[i], this._remainingNodes[j]] = [this._remainingNodes[j], this._remainingNodes[i]];
        }
        this._randomNodes = this._remainingNodes.slice();
    }
}
exports.RandomWalkStrategy = RandomWalkStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tV2Fsa1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtTdHJhdGVnaWVzL3JhbmRvbVdhbGtTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFzRDtBQUV0RDs7R0FFRztBQUNILE1BQWEsa0JBQW1CLFNBQVEsbUNBQWdCO0lBYXBEOzs7O09BSUc7SUFDSCxZQUFZLEtBQTBCLEVBQUUsY0FBdUI7UUFDM0QsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksSUFBSSxDQUFDLFdBQW9CO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0RCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RELDJDQUEyQztZQUMzQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUE5REQsZ0RBOERDIn0=