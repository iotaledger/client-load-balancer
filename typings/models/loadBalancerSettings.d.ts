import { AttachToTangle } from "@iota/core";
import { FailMode } from "./failMode";
import { NodeConfiguration } from "./nodeConfiguration";
import { NodeWalkStrategy } from "./nodeWalkStrategy";
import { SuccessMode } from "./successMode";
/**
 * Settings to use for the load balancer.
 */
export declare class LoadBalancerSettings {
    /**
     * The strategy to use for node selection.
     */
    nodeWalkStrategy: NodeWalkStrategy;
    /**
     * How should we use the nodes on a successful request, defaults to next.
     */
    successMode?: SuccessMode;
    /**
     * How should we use the nodes on a failed request, defaults to all.
     */
    failMode?: FailMode;
    /**
     * Should be look for missing data from snapshots.
     */
    snapshotAware?: boolean;
    /**
     * The minimum weight magnitude used for attaching, defaults to 9.
     */
    mwm?: number;
    /**
     * The depth used for attaching, defaults to 3.
     */
    depth?: number;
    /**
     * A timeout to check if a node is non responsive, if not supplied will use default fetch timout.
     */
    timeoutMs?: number;
    /**
     * The attach to tangle method.
     */
    attachToTangle?: AttachToTangle;
    /**
     * Callback which is triggered when a new node is about to be used.
     * @param node The node configuration that was tried.
     */
    tryNodeCallback?(node: NodeConfiguration): void;
    /**
     * Callback which is triggered when a node fails.
     * @param node The node configuration that failed.
     * @param error The error the node failed with.
     */
    failNodeCallback?(node: NodeConfiguration, error: Error): void;
}
