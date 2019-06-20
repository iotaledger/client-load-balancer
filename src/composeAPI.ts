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

    const api = composeAPICore({ attachToTangle: settings.attachToTangle });

    // Wrap all the web methods with additional handling
    api.addNeighbors = wrapMethodCallbackOrAsync(settings, api, api.addNeighbors, "addNeighbors");
    api.broadcastTransactions = wrapMethodCallbackOrAsync(settings, api, api.broadcastTransactions, "broadcastTransactions");
    api.checkConsistency = wrapMethodCallbackOrAsync(settings, api, api.checkConsistency, "checkConsistency");
    api.findTransactions = wrapMethodCallbackOrAsync(settings, api, api.findTransactions, "findTransactions");
    api.getBalances = wrapMethodCallbackOrAsync(settings, api, api.getBalances, "getBalances");
    api.getInclusionStates = wrapMethodCallbackOrAsync(settings, api, api.getInclusionStates, "getInclusionStates");
    api.getNeighbors = wrapMethodCallbackOrAsync(settings, api, api.getNeighbors, "getNeighbors");
    api.getNodeInfo = wrapMethodCallbackOrAsync(settings, api, api.getNodeInfo, "getNodeInfo");
    api.getTips = wrapMethodCallbackOrAsync(settings, api, api.getTips, "getTips");
    api.getTransactionsToApprove = wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove, "getTransactionsToApprove");
    api.getTrytes = wrapMethodCallbackOrAsync(settings, api, api.getTrytes, "getTrytes");
    api.interruptAttachingToTangle = wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle, "interruptAttachingToTangle");
    api.removeNeighbors = wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors, "removeNeighbors");
    api.storeTransactions = wrapMethodCallbackOrAsync(settings, api, api.storeTransactions, "storeTransactions");
    api.broadcastBundle = wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle, "broadcastBundle");
    api.getAccountData = wrapMethodCallbackOrAsync(settings, api, api.getAccountData, "getAccountData");
    api.getBundle = wrapMethodCallbackOrAsync(settings, api, api.getBundle, "getBundle");
    api.getBundlesFromAddresses = wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses, "getBundlesFromAddresses");
    api.getLatestInclusion = wrapMethodCallbackOrAsync(settings, api, api.getLatestInclusion, "getLatestInclusion");
    api.getNewAddress = wrapMethodCallbackOrAsync(settings, api, api.getNewAddress, "getNewAddress");
    api.getTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.getTransactionObjects, "getTransactionObjects");
    api.findTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.findTransactionObjects, "findTransactionObjects");
    api.getInputs = wrapMethodCallbackOrAsync(settings, api, api.getInputs, "getInputs");
    api.getTransfers = wrapMethodCallbackOrAsync(settings, api, api.getTransfers, "getTransfers");
    api.isPromotable = wrapMethodCallbackOrAsync(settings, api, api.isPromotable, "isPromotable");
    api.isReattachable = wrapMethodCallbackOrAsync(settings, api, api.isReattachable, "isReattachable");
    api.prepareTransfers = wrapMethodCallbackOrAsync(settings, api, api.prepareTransfers, "prepareTransfers");
    api.promoteTransaction = wrapMethodCallbackOrAsync(settings, api, api.promoteTransaction, "promoteTransaction");
    api.replayBundle = wrapMethodCallbackOrAsync(settings, api, api.replayBundle, "replayBundle");
    api.sendTrytes = wrapMethodCallbackOrAsync(settings, api, api.sendTrytes, "sendTrytes");
    api.storeAndBroadcast = wrapMethodCallbackOrAsync(settings, api, api.storeAndBroadcast, "storeAndBroadcast");
    api.traverseBundle = wrapMethodCallbackOrAsync(settings, api, api.traverseBundle, "traverseBundle");

    return api;
}
