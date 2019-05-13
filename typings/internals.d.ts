import { API } from "@iota/core";
import * as Bluebird from "bluebird";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
import { NodeConfiguration } from "./models/nodeConfiguration";
/**
 * Create a new instance of the API.
 * @param settings The load balancer settings.
 * @param updateProvider Update the provider in the calling context.
 * @param methodPromise The method to call.
 * @param validateResult Let the caller validate the result.
 * @returns The api.
 * @private
 */
export declare function loadBalancer(settings: LoadBalancerSettings, updateProvider: (node: NodeConfiguration) => void, methodPromise: (node: NodeConfiguration) => Bluebird<any>, validateResult?: (res: any) => string): Promise<any>;
/**
 * Wrap a method and handle either callback or async result.
 * @param settings The load balancer settings.
 * @param api The composed api.
 * @param method The method to wrap.
 * @param methodName The name of the method.
 * @returns The wrapped method.
 * @private
 */
export declare function wrapMethodCallbackOrAsync(settings: LoadBalancerSettings, api: API, method: (...params: any) => Bluebird<any>, methodName: string): () => any;
