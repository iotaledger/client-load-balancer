"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    api.getTips = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTips, "getTips");
    api.getTransactionsToApprove = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove, "getTransactionsToApprove");
    api.getTrytes = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTrytes, "getTrytes");
    api.interruptAttachingToTangle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle, "interruptAttachingToTangle");
    api.removeNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors, "removeNeighbors");
    api.storeTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.storeTransactions, "storeTransactions");
    api.broadcastBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle, "broadcastBundle");
    api.getAccountData = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getAccountData, "getAccountData");
    api.getBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundle, "getBundle");
    api.getBundlesFromAddresses = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses, "getBundlesFromAddresses");
    api.getLatestInclusion = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getLatestInclusion, "getLatestInclusion");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZUFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb3NlQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQStEO0FBQy9ELDJDQUF3RDtBQUN4RCxnREFBNkM7QUFFN0Msc0RBQW1EO0FBRW5EOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsUUFBOEI7SUFDckQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUNqRDtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ2xFO0lBQ0QsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3JDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQztJQUNoRSxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUM7SUFFdEQsTUFBTSxHQUFHLEdBQUcsaUJBQWMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUV4RSxvREFBb0Q7SUFDcEQsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLHFCQUFxQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDekgsR0FBRyxDQUFDLGdCQUFnQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDMUcsR0FBRyxDQUFDLGdCQUFnQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDMUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0YsR0FBRyxDQUFDLGtCQUFrQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDaEgsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLFdBQVcsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0YsR0FBRyxDQUFDLE9BQU8sR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0UsR0FBRyxDQUFDLHdCQUF3QixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLHdCQUF3QixFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDbEksR0FBRyxDQUFDLFNBQVMsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckYsR0FBRyxDQUFDLDBCQUEwQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLDBCQUEwQixFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDeEksR0FBRyxDQUFDLGVBQWUsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN2RyxHQUFHLENBQUMsaUJBQWlCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM3RyxHQUFHLENBQUMsZUFBZSxHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZHLEdBQUcsQ0FBQyxjQUFjLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDcEcsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckYsR0FBRyxDQUFDLHVCQUF1QixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDL0gsR0FBRyxDQUFDLGtCQUFrQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDaEgsR0FBRyxDQUFDLGFBQWEsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDakcsR0FBRyxDQUFDLHFCQUFxQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDekgsR0FBRyxDQUFDLHNCQUFzQixHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDNUgsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckYsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLGNBQWMsR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUMxRyxHQUFHLENBQUMsa0JBQWtCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNoSCxHQUFHLENBQUMsWUFBWSxHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM5RixHQUFHLENBQUMsVUFBVSxHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN4RixHQUFHLENBQUMsaUJBQWlCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM3RyxHQUFHLENBQUMsY0FBYyxHQUFHLHFDQUF5QixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXBHLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQWpERCxnQ0FpREMifQ==