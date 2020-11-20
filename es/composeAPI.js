"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeAPI = void 0;
const core_1 = require("@iota/core");
const internals_1 = require("./internals");
const failMode_1 = require("./models/failMode");
const successMode_1 = require("./models/successMode");
/**
 * Create a new instance of the API wrapped with load balancing support.
 * @param settings The load balancer settings.
 * @returns The api.
 */
function composeAPI(settings) {
    if (!settings) {
        throw new Error("You must provider settings");
    }
    if (!settings.nodeWalkStrategy) {
        throw new Error("The nodeWalkStrategy field must be provided");
    }
    settings.mwm = settings.mwm || 9;
    settings.depth = settings.depth || 3;
    settings.successMode = settings.successMode || successMode_1.SuccessMode.next;
    settings.failMode = settings.failMode || failMode_1.FailMode.all;
    const api = core_1.composeAPI({ attachToTangle: settings.attachToTangle });
    // Wrap all the web methods with additional handling
    api.addNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.addNeighbors, "addNeighbors");
    api.broadcastTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.broadcastTransactions, "broadcastTransactions");
    api.checkConsistency = internals_1.wrapMethodCallbackOrAsync(settings, api, api.checkConsistency, "checkConsistency");
    api.findTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.findTransactions, "findTransactions");
    api.getBalances = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBalances, "getBalances");
    api.getInclusionStates = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getInclusionStates, "getInclusionStates");
    api.getNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNeighbors, "getNeighbors");
    api.getNodeInfo = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNodeInfo, "getNodeInfo");
    api.getTransactionsToApprove = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove, "getTransactionsToApprove");
    api.getTrytes = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTrytes, "getTrytes");
    api.interruptAttachingToTangle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle, "interruptAttachingToTangle");
    api.removeNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors, "removeNeighbors");
    api.storeTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.storeTransactions, "storeTransactions");
    api.broadcastBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle, "broadcastBundle");
    api.getAccountData = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getAccountData, "getAccountData");
    api.getBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundle, "getBundle");
    api.getBundlesFromAddresses = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses, "getBundlesFromAddresses");
    api.getNewAddress = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNewAddress, "getNewAddress");
    api.getTransactionObjects = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransactionObjects, "getTransactionObjects");
    api.findTransactionObjects = internals_1.wrapMethodCallbackOrAsync(settings, api, api.findTransactionObjects, "findTransactionObjects");
    api.getInputs = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getInputs, "getInputs");
    api.getTransfers = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransfers, "getTransfers");
    api.isPromotable = internals_1.wrapMethodCallbackOrAsync(settings, api, api.isPromotable, "isPromotable");
    api.isReattachable = internals_1.wrapMethodCallbackOrAsync(settings, api, api.isReattachable, "isReattachable");
    api.prepareTransfers = internals_1.wrapMethodCallbackOrAsync(settings, api, api.prepareTransfers, "prepareTransfers");
    api.promoteTransaction = internals_1.wrapMethodCallbackOrAsync(settings, api, api.promoteTransaction, "promoteTransaction");
    api.replayBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.replayBundle, "replayBundle");
    api.sendTrytes = internals_1.wrapMethodCallbackOrAsync(settings, api, api.sendTrytes, "sendTrytes");
    api.storeAndBroadcast = internals_1.wrapMethodCallbackOrAsync(settings, api, api.storeAndBroadcast, "storeAndBroadcast");
    api.traverseBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.traverseBundle, "traverseBundle");
    return api;
}
exports.composeAPI = composeAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZUFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb3NlQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUErRDtBQUMvRCwyQ0FBd0Q7QUFDeEQsZ0RBQTZDO0FBRTdDLHNEQUFtRDtBQUVuRDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLFFBQThCO0lBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDakQ7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztLQUNsRTtJQUNELFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNyQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUkseUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDaEUsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFRLENBQUMsR0FBRyxDQUFDO0lBRXRELE1BQU0sR0FBRyxHQUFHLGlCQUFjLENBQUMsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFFeEUsb0RBQW9EO0lBQ3BELEdBQUcsQ0FBQyxZQUFZLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pILEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFHLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNGLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hILEdBQUcsQ0FBQyxZQUFZLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsQ0FBQyxXQUFXLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNGLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ2xJLEdBQUcsQ0FBQyxTQUFTLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JGLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3hJLEdBQUcsQ0FBQyxlQUFlLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdkcsR0FBRyxDQUFDLGlCQUFpQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDN0csR0FBRyxDQUFDLGVBQWUsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN2RyxHQUFHLENBQUMsY0FBYyxHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BHLEdBQUcsQ0FBQyxTQUFTLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JGLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9ILEdBQUcsQ0FBQyxhQUFhLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2pHLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pILEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVILEdBQUcsQ0FBQyxTQUFTLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JGLEdBQUcsQ0FBQyxZQUFZLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsQ0FBQyxZQUFZLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsQ0FBQyxjQUFjLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDcEcsR0FBRyxDQUFDLGdCQUFnQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDMUcsR0FBRyxDQUFDLGtCQUFrQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDaEgsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLFVBQVUsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDeEYsR0FBRyxDQUFDLGlCQUFpQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDN0csR0FBRyxDQUFDLGNBQWMsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVwRyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUEvQ0QsZ0NBK0NDIn0=