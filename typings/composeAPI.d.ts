import { API } from "@iota/core";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
/**
 * Create a new instance of the API wrapped with load balancing support.
 * @param settings The load balancer settings.
 * @returns The api.
 */
export declare function composeAPI(settings: LoadBalancerSettings): API;
