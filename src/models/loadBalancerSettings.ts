import { AttachToTangle } from "@iota/core";
import { FailMode } from "./failMode";
import { NodeConfiguration } from "./nodeConfiguration";
import { NodeWalkStrategy } from "./nodeWalkStrategy";
import { SuccessMode } from "./successMode";

/**
 * Settings to use for the load balancer.
 */
export class LoadBalancerSettings {
    /**
     * The strategy to use for node selection.
     */
    public nodeWalkStrategy!: NodeWalkStrategy;

    /**
     * How should we use the nodes on a successful request, defaults to next.
     */
    public successMode?: SuccessMode;

    /**
     * How should we use the nodes on a failed request, defaults to all.
     */
    public failMode?: FailMode;

    /**
     * Should be look for missing data from snapshots.
     */
    public snapshotAware?: boolean;

    /**
     * The minimum weight magnitude used for attaching, defaults to 9.
     */
    public mwm?: number;

    /**
     * The depth used for attaching, defaults to 3.
     */
    public depth?: number;

    /**
     * The username for the provider.
     */
    public user?: string;

    /**
     * The password for the provider.
     */
    public password?: string;

    /**
     * A timeout to check if a node is non responsive, if not supplied will use default fetch timout.
     */
    public timeoutMs?: number;

    /**
     * The attach to tangle method.
     */
    public attachToTangle?: AttachToTangle;

    /**
     * Callback which is triggered when a new node is about to be used.
     * @param node The node configuration that was tried.
     */
    public tryNodeCallback?(node: NodeConfiguration): void;

    /**
     * Callback which is triggered when a node fails.
     * @param node The node configuration that failed.
     * @param error The error the node failed with.
     */
    public failNodeCallback?(node: NodeConfiguration, error: Error): void;
}
