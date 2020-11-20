import { AttachToTangle } from "@iota/core";
/**
 * The configuration for a single node.
 */
export declare class NodeConfiguration {
    /**
     * The provider url for the node.
     */
    provider: string;
    /**
     * The minimum weight magnitude used for attaching.
     */
    mwm?: number;
    /**
     * The depth used for attaching.
     */
    depth?: number;
    /**
     * Timeout for this specific node, defaults to using the main load balancer setting.
     */
    timeoutMs?: number;
    /**
     * The attach to tangle method, defaults to using main load balancer setting.
     */
    attachToTangle?: AttachToTangle;
    /**
     * The username for the provider.
     */
    user?: string;
    /**
     * The password for the provider.
     */
    password?: string;
}
