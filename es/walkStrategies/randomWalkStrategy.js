"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomWalkStrategy = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tV2Fsa1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtTdHJhdGVnaWVzL3JhbmRvbVdhbGtTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFBc0Q7QUFFdEQ7O0dBRUc7QUFDSCxNQUFhLGtCQUFtQixTQUFRLG1DQUFnQjtJQWFwRDs7OztPQUlHO0lBQ0gsWUFBWSxLQUEwQixFQUFFLGNBQXVCO1FBQzNELEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLElBQUksQ0FBQyxXQUFvQjtRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCwyQ0FBMkM7WUFDM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0c7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckQsQ0FBQztDQUNKO0FBOURELGdEQThEQyJ9