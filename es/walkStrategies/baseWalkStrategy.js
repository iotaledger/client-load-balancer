"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Common features for the node strategies.
 * @private
 */
class BaseWalkStrategy {
    /**
     * Create a new instance of BaseWalkStrategy.
     * @param nodes The nodes to iterate through.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes, blacklistLimit) {
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
    totalUsable() {
        return this._usableNodes.length;
    }
    /**
     * Blacklist the current node, so it doesn't get used again once limit is reached.
     */
    blacklist() {
        if (this._blacklistLimit) {
            const current = this.current();
            if (current) {
                if (!this._blacklistNodes[current.provider]) {
                    this._blacklistNodes[current.provider] = 1;
                }
                else {
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
    getUsableNodes() {
        return this._usableNodes;
    }
}
exports.BaseWalkStrategy = BaseWalkStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVdhbGtTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93YWxrU3RyYXRlZ2llcy9iYXNlV2Fsa1N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7OztHQUdHO0FBQ0gsTUFBc0IsZ0JBQWdCO0lBcUJsQzs7OztPQUlHO0lBQ0gsWUFBWSxLQUEwQixFQUFFLGNBQXVCO1FBQzNELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFjRDs7T0FFRztJQUNJLFNBQVM7UUFDWixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9CLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUM1QztnQkFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7d0JBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNwQztpQkFDSjtnQkFFRCw4REFBOEQ7Z0JBQzlELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUM5QzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBM0ZELDRDQTJGQyJ9