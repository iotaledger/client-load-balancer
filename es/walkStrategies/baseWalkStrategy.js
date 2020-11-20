"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWalkStrategy = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVdhbGtTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93YWxrU3RyYXRlZ2llcy9iYXNlV2Fsa1N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBOzs7R0FHRztBQUNILE1BQXNCLGdCQUFnQjtJQXFCbEM7Ozs7T0FJRztJQUNILFlBQVksS0FBMEIsRUFBRSxjQUF1QjtRQUMzRCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBY0Q7O09BRUc7SUFDSSxTQUFTO1FBQ1osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMvQixJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztpQkFDNUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO3dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7Z0JBRUQsOERBQThEO2dCQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7b0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDOUM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQTNGRCw0Q0EyRkMifQ==