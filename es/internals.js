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
exports.wrapMethodCallbackOrAsync = exports.loadBalancer = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVybmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxpREFBMkM7QUFFM0MsZ0RBQTZDO0FBRzdDLHNEQUFtRDtBQUVuRDs7Ozs7Ozs7R0FRRztBQUNILFNBQXNCLFlBQVksQ0FDOUIsUUFBOEIsRUFDOUIsY0FBaUQsRUFDakQsYUFBeUQsRUFDekQsY0FBcUM7O1FBQ3JDLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsTUFBTSxTQUFTLEdBQVksRUFBRSxDQUFDO1FBRTlCLEdBQUc7WUFDQyxzQ0FBc0M7WUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWpELGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyQixJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQzFCLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7WUFFRCxJQUFJO2dCQUNBLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDckQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSx3QkFBd0IsQ0FBQyxDQUFDO2lCQUM5RjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25DO2dCQUVELElBQUksY0FBYyxFQUFFO29CQUNoQixNQUFNLFlB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