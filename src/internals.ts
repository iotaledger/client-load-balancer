import { API } from "@iota/core";
import { isEmpty } from "@iota/validators";
import * as Bluebird from "bluebird";
import { FailMode } from "./models/failMode";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
import { NodeConfiguration } from "./models/nodeConfiguration";
import { SuccessMode } from "./models/successMode";

/**
 * Create a new instance of the API.
 * @param settings The load balancer settings.
 * @param updateProvider Update the provider in the calling context.
 * @param methodPromise The method to call.
 * @param validateResult Let the caller validate the result.
 * @returns The api.
 * @private
 */
export async function loadBalancer(
    settings: LoadBalancerSettings,
    updateProvider: (node: NodeConfiguration) => void,
    methodPromise: (node: NodeConfiguration) => Bluebird<any>,
    validateResult?: (res: any) => string): Promise<any> {
    let res;
    let tryNextNode = false;
    const totalNodes = settings.nodeWalkStrategy.totalUsable();
    let triedCount = 0;
    const errorList: Error[] = [];

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
                res = await methodPromise(node).timeout(timeout, `${node.provider} the request timed out`);
            } else {
                res = await methodPromise(node);
            }

            if (validateResult) {
                const validMessage = validateResult(res);
                if (validMessage) {
                    throw new Error(validMessage);
                }
            }
            tryNextNode = false;
            if (settings.successMode === SuccessMode.next) {
                // Walk to the next node in the strategy
                settings.nodeWalkStrategy.next();
            }
        } catch (err) {
            settings.nodeWalkStrategy.blacklist();

            if (settings.failNodeCallback) {
                settings.failNodeCallback(node, err);
            }

            if (settings.failMode === FailMode.single) {
                // Single fail mode so just throw the error
                throw err;
            } else if (settings.failMode === FailMode.all) {
                // Fail mode is try all until one succeeds
                errorList.push(err);

                // Try to use the next node if the current one errored
                triedCount++;
                // But only if we have not already tried all the nodes
                tryNextNode = triedCount < totalNodes;

                if (!tryNextNode) {
                    // No more nodes to try so throw the combined exceptions
                    throw new Error(`All nodes failed\n   ${errorList.map(e => e.message).join("\n   ")}`);
                }

                // Walk to the next node in the strategy
                settings.nodeWalkStrategy.next();
            }
        }
    } while (tryNextNode);

    return res;
}

/**
 * Wrap a method and handle either callback or async result.
 * @param settings The load balancer settings.
 * @param api The composed api.
 * @param method The method to wrap.
 * @param methodName The name of the method.
 * @returns The wrapped method.
 * @private
 */
export function wrapMethodCallbackOrAsync(settings: LoadBalancerSettings, api: API, method: (...params: any) => Bluebird<any>, methodName: string): () => any {
    return async (...p: any) => {
        const originalCallbackParam = p[method.length - 1];

        // If the caller is using the callback parameter remove it and use the promise
        // method then restore on method completion.
        if (originalCallbackParam) {
            p[method.length - 1] = undefined;
        }

        return loadBalancer(
            settings,
            (node) => api.setSettings({ provider: node.provider, attachToTangle: node.attachToTangle || settings.attachToTangle }),
            (node) => {
                // Apply the default depth and mwm to methods that use them if they have not been supplied
                if (methodName === "promoteTransaction" ||
                    methodName === "replayBundle" ||
                    methodName === "sendTrytes") {
                    p[1] = p[1] || node.depth || settings.depth;
                    p[2] = p[2] || node.mwm || settings.mwm;
                }
                return method(...p);
            },
            (res) => {
                if (settings.snapshotAware && methodName === "getTrytes") {
                    const trytes: ReadonlyArray<string> = <ReadonlyArray<string>>res;
                    if (trytes) {
                        for (let i = 0; i < trytes.length; i++) {
                            if (isEmpty(trytes[i])) {
                                return "Data has been removed by snapshot";
                            }
                        }
                    }
                }
                return "";
            })
            .then((res: any) => {
                if (originalCallbackParam) {
                    originalCallbackParam(null, res);
                    return undefined;
                } else {
                    return res;
                }
            }).catch((err) => {
                if (originalCallbackParam) {
                    originalCallbackParam(err);
                } else {
                    throw err;
                }
            });
    };
}
