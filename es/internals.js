"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
        return loadBalancer(settings, (node) => api.setSettings({ provider: node.provider, attachToTangle: node.attachToTangle || settings.attachToTangle }), (node) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVybmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaURBQTJDO0FBRTNDLGdEQUE2QztBQUc3QyxzREFBbUQ7QUFFbkQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLFFBQThCLEVBQzlCLGNBQWlELEVBQ2pELGFBQXlELEVBQ3pELGNBQXFDOztRQUNyQyxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sU0FBUyxHQUFZLEVBQUUsQ0FBQztRQUU5QixHQUFHO1lBQ0Msc0NBQXNDO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVqRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckIsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUMxQixRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsSUFBSTtnQkFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3JELElBQUksT0FBTyxFQUFFO29CQUNULEdBQUcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsd0JBQXdCLENBQUMsQ0FBQztpQkFDOUY7cUJBQU07b0JBQ0gsR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuQztnQkFFRCxJQUFJLGNBQWMsRUFBRTtvQkFDaEIsTUFBTSxZQUFZ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