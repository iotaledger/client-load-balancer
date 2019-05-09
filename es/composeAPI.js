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
    const api = core_1.composeAPI({});
    // Wrap all the web methods with additional handling
    api.addNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.addNeighbors);
    api.broadcastTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.broadcastTransactions);
    api.checkConsistency = internals_1.wrapMethodCallbackOrAsync(settings, api, api.checkConsistency);
    api.findTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.findTransactions);
    api.getBalances = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBalances);
    api.getInclusionStates = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getInclusionStates);
    api.getNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNeighbors);
    api.getNodeInfo = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNodeInfo);
    api.getTips = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTips);
    api.getTransactionsToApprove = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove);
    api.getTrytes = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTrytes);
    api.interruptAttachingToTangle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle);
    api.removeNeighbors = internals_1.wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors);
    api.storeTransactions = internals_1.wrapMethodCallbackOrAsync(settings, api, api.storeTransactions);
    api.broadcastBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle);
    api.getAccountData = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getAccountData);
    api.getBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundle);
    api.getBundlesFromAddresses = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses);
    api.getLatestInclusion = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getLatestInclusion);
    api.getNewAddress = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getNewAddress);
    api.getTransactionObjects = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransactionObjects);
    api.findTransactionObjects = internals_1.wrapMethodCallbackOrAsync(settings, api, api.findTransactionObjects);
    api.getInputs = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getInputs);
    api.getTransfers = internals_1.wrapMethodCallbackOrAsync(settings, api, api.getTransfers);
    api.isPromotable = internals_1.wrapMethodCallbackOrAsync(settings, api, api.isPromotable);
    api.isReattachable = internals_1.wrapMethodCallbackOrAsync(settings, api, api.isReattachable);
    api.prepareTransfers = internals_1.wrapMethodCallbackOrAsync(settings, api, api.prepareTransfers);
    api.promoteTransaction = internals_1.wrapMethodCallbackOrAsync(settings, api, api.promoteTransaction, true);
    api.replayBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.replayBundle, true);
    api.sendTrytes = internals_1.wrapMethodCallbackOrAsync(settings, api, api.sendTrytes, true);
    api.storeAndBroadcast = internals_1.wrapMethodCallbackOrAsync(settings, api, api.storeAndBroadcast);
    api.traverseBundle = internals_1.wrapMethodCallbackOrAsync(settings, api, api.traverseBundle);
    return api;
}
exports.composeAPI = composeAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZUFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb3NlQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQStEO0FBQy9ELDJDQUF3RDtBQUN4RCxnREFBNkM7QUFFN0Msc0RBQW1EO0FBRW5EOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsUUFBOEI7SUFDckQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUNqRDtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ2xFO0lBQ0QsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3JDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQztJQUNoRSxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUM7SUFFdEQsTUFBTSxHQUFHLEdBQUcsaUJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUvQixvREFBb0Q7SUFDcEQsR0FBRyxDQUFDLFlBQVksR0FBRyxxQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RSxHQUFHLENBQUMscUJBQXFCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNoRyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcscUNBQXlCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxH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