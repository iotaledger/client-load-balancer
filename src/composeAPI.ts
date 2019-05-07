import { API, composeAPI as composeAPICore } from "@iota/core";
import { wrapMethodCallbackOrAsync } from "./internals";
import { FailMode } from "./models/failMode";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
import { SuccessMode } from "./models/successMode";

/**
 * Create a new instance of the API wrapped with load balancing support.
 * @param settings The load balancer settings.
 * @returns The api.
 */
export function composeAPI(settings: LoadBalancerSettings): API {
    if (!settings) {
        throw new Error("You must provider settings");
    }
    if (!settings.nodeWalkStrategy) {
        throw new Error("The nodeWalkStrategy field must be provided");
    }
    settings.mwm = settings.mwm || 9;
    settings.depth = settings.depth || 3;
    settings.successMode = settings.successMode || SuccessMode.next;
    settings.failMode = settings.failMode || FailMode.all;

    const api = composeAPICore({});

    // Wrap all the web methods with additional handling
    api.addNeighbors = wrapMethodCallbackOrAsync(settings, api, api.addNeighbors);
    api.broadcastTransactions = wrapMethodCallbackOrAsync(settings, api, api.broadcastTransactions);
    api.checkConsistency = wrapMethodCallbackOrAsync(settings, api, api.checkConsistency);
    api.findTransactions = wrapMethodCallbackOrAsync(settings, api, api.findTransactions);
    api.getBalances = wrapMethodCallbackOrAsync(settings, api, api.getBalances);
    api.getInclusionStates = wrapMethodCallbackOrAsync(settings, api, api.getInclusionStates);
    api.getNeighbors = wrapMethodCallbackOrAsync(settings, api, api.getNeighbors);
    api.getNodeInfo = wrapMethodCallbackOrAsync(settings, api, api.getNodeInfo);
    api.getTips = wrapMethodCallbackOrAsync(settings, api, api.getTips);
    api.getTransactionsToApprove = wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove);
    api.getTrytes = wrapMethodCallbackOrAsync(settings, api, api.getTrytes);
    api.interruptAttachingToTangle = wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle);
    api.removeNeighbors = wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors);
    api.storeTransactions = wrapMethodCallbackOrAsync(settings, api, api.storeTransactions);
    api.broadcastBundle = wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle);
    api.getAccountData = wrapMethodCallbackOrAsync(settings, api, api.getAccountData);
    api.getBundle = wrapMethodCallbackOrAsync(settings, api, api.getBundle);
    api.getBundlesFromAddresses = wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses);
    api.getLatestInclusion = wrapMethodCallbackOrAsync(settings, api, api.getLatestInclusion);
    api.getNewAddress = wrapMethodCallbackOrAsync(settings, api, api.getNewAddress);
    api.getTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.getTransactionObjects);
    api.findTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.findTransactionObjects);
    api.getInputs = wrapMethodCallbackOrAsync(settings, api, api.getInputs);
    api.getTransfers = wrapMethodCallbackOrAsync(settings, api, api.getTransfers);
    api.isPromotable = wrapMethodCallbackOrAsync(settings, api, api.isPromotable);
    api.isReattachable = wrapMethodCallbackOrAsync(settings, api, api.isReattachable);
    api.prepareTransfers = wrapMethodCallbackOrAsync(settings, api, api.prepareTransfers);
    api.promoteTransaction = wrapMethodCallbackOrAsync(settings, api, api.promoteTransaction);
    api.replayBundle = wrapMethodCallbackOrAsync(settings, api, api.replayBundle);
    api.sendTrytes = wrapMethodCallbackOrAsync(settings, api, api.sendTrytes);
    api.storeAndBroadcast = wrapMethodCallbackOrAsync(settings, api, api.storeAndBroadcast);
    api.traverseBundle = wrapMethodCallbackOrAsync(settings, api, api.traverseBundle);

    return api;
}
