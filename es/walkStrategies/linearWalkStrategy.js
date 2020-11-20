"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearWalkStrategy = void 0;
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
     * @param retainOrder Retain the ordering if resetting the list.
     */
    next(retainOrder) {
        this._currentIndex = (this._currentIndex + 1) % this.getUsableNodes().length;
    }
}
exports.LinearWalkStrategy = LinearWalkStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyV2Fsa1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dhbGtTdHJhdGVnaWVzL2xpbmVhcldhbGtTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFBc0Q7QUFFdEQ7O0dBRUc7QUFDSCxNQUFhLGtCQUFtQixTQUFRLG1DQUFnQjtJQU1wRDs7OztPQUlHO0lBQ0gsWUFBWSxLQUEwQixFQUFFLGNBQXVCO1FBQzNELEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLElBQUksQ0FBQyxXQUFvQjtRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2pGLENBQUM7Q0FDSjtBQS9CRCxnREErQkMifQ==