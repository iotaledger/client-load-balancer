import { AttachToTangle } from "@iota/core";

/**
 * The configuration for a single node.
 */
export class NodeConfiguration {
    /**
     * The provider url for the node.
     */
    public provider!: string;

    /**
     * The minimum weight magnitude used for attaching.
     */
    public mwm?: number;

    /**
     * The depth used for attaching.
     */
    public depth?: number;

    /**
     * Timeout for this specific node, defaults to using the main load balancer setting.
     */
    public timeoutMs?: number;

    /**
     * The attach to tangle method, defaults to using main load balancer setting.
     */
    public attachToTangle?: AttachToTangle;
}
