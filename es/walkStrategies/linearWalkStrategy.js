"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseWalkStrategy_1 = require("./baseWalkStrategy");
/**
 * Node choice strategy which just iterates through the list of nodes.
 */
class LinearWalkStrategy extends baseWalkStrategy_1.BaseWalkStrategy {
    /**
     * Create a new instance of LinearWalkStrategy.
     * @param nodes The nodes to randomly pick from.
     * @param blacklistLimit The number of failures before a node is blacklisted.
     */
    constructor(nodes, blacklistLimit) {
        super(nodes, blacklistLimit);
        this._currentIndex = 0;
    }
    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    current() {
        return this.getUsableNodes()[this._currentIndex];
    }
    /**
     * Move to the next node in the strategy.
     */
    next() {
        this._currentIndex = (this._currentIndex + 1) % this.getUsableNodes().length;
    }
}
exports.LinearWalkStrategy = LinearWalkStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyV2Fsa1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtTdHJhdGVnaWVzL2xpbmVhcldhbGtTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFzRDtBQUV0RDs7R0FFRztBQUNILE1BQWEsa0JBQW1CLFNBQVEsbUNBQWdCO0lBTXBEOzs7O09BSUc7SUFDSCxZQUFZLEtBQTBCLEVBQUUsY0FBdUI7UUFDM0QsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNqRixDQUFDO0NBQ0o7QUE5QkQsZ0RBOEJDIn0=