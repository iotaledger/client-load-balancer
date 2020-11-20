"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("@iota/validators");
const failMode_1 = require("./models/failMode");
const successMode_1 = require("./models/successMode");
/**
 * Create a new instance of the API.
 * @param settings The load balancer settings.
 * @param updateProvider Update the provider in the calling context.
 * @param methodPromise The method to call.
 * @param validateResult Let the caller validate the result.
 * @returns The api.
 * @private
 */
function loadBalancer(settings, updateProvider, methodPromise, validateResult) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        let tryNextNode = false;
        const totalNodes = settings.nodeWalkStrategy.totalUsable();
        let triedCount = 0;
        const errorList = [];
        do {
            // Get the next node from the strategy
            const node = settings.nodeWalkStrategy.current();
            updateProvider(node);
            if (settings.tryNodeCallback) {
                settings.tryNodeCallback(node);
            }
            try {
                const timeout = node.timeoutMs || settings.timeoutMs;
                if (timeout) {
                    res = yield methodPromise(node).timeout(timeout, `${node.provider} the request timed out`);
                }
                else {
                    res = yield methodPromise(node);
                }
                if (validateResult) {
                    const validMessage = validateResult(res);
                    if (validMessage) {
                        throw new Error(validMessage);
                    }
                }
                tryNextNode = false;
                if (settings.successMode === successMode_1.SuccessMode.next) {
                    // Walk to the next node in the strategy
                    settings.nodeWalkStrategy.next(false);
                }
            }
            catch (err) {
                settings.nodeWalkStrategy.blacklist();
                if (settings.failNodeCallback) {
                    settings.failNodeCallback(node, err);
                }
                if (settings.failMode === failMode_1.FailMode.single) {
                    // Single fail mode so just throw the error
                    throw err;
                }
                else if (settings.failMode === failMode_1.FailMode.all) {
                    // Fail mode is try all until one succeeds
                    errorList.push(err.message ? err : { message: err });
                    // Try to use the next node if the current one errored
                    triedCount++;
                    // But only if we have not already tried all the nodes
                    tryNextNode = triedCount < totalNodes;
                    if (!tryNextNode) {
                        // No more nodes to try so throw the combined exceptions
                        throw new Error(`All nodes failed\n   ${errorList.map(e => e.message).join("\n   ")}`);
                    }
                    // Walk to the next node in the strategy
                    settings.nodeWalkStrategy.next(true);
                }
            }
        } while (tryNextNode);
        return res;
    });
}
exports.loadBalancer = loadBalancer;
/**
 * Wrap a method and handle either callback or async result.
 * @param settings The load balancer settings.
 * @param api The composed api.
 * @param method The method to wrap.
 * @param methodName The name of the method.
 * @returns The wrapped method.
 * @private
 */
function wrapMethodCallbackOrAsync(settings, api, method, methodName) {
    return (...p) => __awaiter(this, void 0, void 0, function* () {
        const originalCallbackParam = p[method.length - 1];
        // If the caller is using the callback parameter remove it and use the promise
        // method then restore on method completion.
        if (originalCallbackParam) {
            p[method.length - 1] = undefined;
        }
        return loadBalancer(settings, (node) => api.setSettings({
            provider: node.provider,
            attachToTangle: node.attachToTangle || settings.attachToTangle,
            user: node.user || settings.user,
            password: node.password || settings.password
        }), (node) => {
            // Apply the default depth and mwm to methods that use them if they have not been supplied
            if (methodName === "promoteTransaction" ||
                methodName === "replayBundle" ||
                methodName === "sendTrytes") {
                p[1] = p[1] || node.depth || settings.depth;
                p[2] = p[2] || node.mwm || settings.mwm;
            }
            return method(...p);
        }, (res) => {
            if (settings.snapshotAware && methodName === "getTrytes") {
                const trytes = res;
                if (trytes) {
                    for (let i = 0; i < trytes.length; i++) {
                        if (validators_1.isEmpty(trytes[i])) {
                            return "Data has been removed by snapshot";
                        }
                    }
                }
            }
            return "";
        })
            .then((res) => {
            if (originalCallbackParam) {
                originalCallbackParam(null, res);
                return undefined;
            }
            else {
                return res;
            }
        }).catch((err) => {
            if (originalCallbackParam) {
                originalCallbackParam(err);
            }
            else {
                throw err;
            }
        });
    });
}
exports.wrapMethodCallbackOrAsync = wrapMethodCallbackOrAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVybmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLGlEQUEyQztBQUUzQyxnREFBNkM7QUFHN0Msc0RBQW1EO0FBRW5EOzs7Ozs7OztHQVFHO0FBQ0gsU0FBc0IsWUFBWSxDQUM5QixRQUE4QixFQUM5QixjQUFpRCxFQUNqRCxhQUF5RCxFQUN6RCxjQUFxQzs7UUFDckMsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLFNBQVMsR0FBWSxFQUFFLENBQUM7UUFFOUIsR0FBRztZQUNDLHNDQUFzQztZQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFakQsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJCLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDMUIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQztZQUVELElBQUk7Z0JBQ0EsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sRUFBRTtvQkFDVCxHQUFHLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLHdCQUF3QixDQUFDLENBQUM7aUJBQzlGO3FCQUFNO29CQUNILEdBQUcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7Z0JBRUQsSUFBSSxjQUFjLEVBQUU7b0JBQ2hCLE1BQU0sWUFB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