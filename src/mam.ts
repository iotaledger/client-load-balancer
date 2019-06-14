import { Transaction } from "@iota/core/typings/types";
import * as MamCore from "@iota/mam";
import * as Bluebird from "bluebird";
import { composeAPI } from "./composeAPI";
import { loadBalancer } from "./internals";
import { FailMode } from "./models/failMode";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
import { SuccessMode } from "./models/successMode";

/**
 * Wrapper for Mam with load balancing
 */
export class Mam {
    /**
     * The load balancer settings to use.
     */
    private static loadBalancerSettings: LoadBalancerSettings;

    /**
     * Initialisation function which returns a state object
     * @param settings Settings for the load balancer.
     * @param seed The seed to initialise with.
     * @param security The security level, defaults to 2.
     * @returns The mam state.
     */
    public static init(settings: LoadBalancerSettings, seed?: string, security: number = 2): MamCore.MamState {
        if (!settings) {
            throw new Error("You must provider settings");
        }
        if (!settings.nodeWalkStrategy) {
            throw new Error("The nodeWalkStrategy field must be provided");
        }
        settings.mwm = settings.mwm || 9;
        settings.depth = settings.depth || 3;
        settings.successMode = settings.successMode || SuccessMode.next;
        settings.failMode = settings.failMode || FailMode.all;
        Mam.loadBalancerSettings = settings;
        return MamCore.init({ provider: "" }, seed, security);
    }

    /**
     * Change the mode for the mam state.
     * @param state The current mam state.
     * @param mode [public/private/restricted].
     * @param sidekey, required for restricted mode.
     * @returns Updated state object to be used with future actions.
     */
    public static changeMode(state: MamCore.MamState, mode: MamCore.MamMode, sidekey?: string): MamCore.MamState {
        return MamCore.changeMode(state, mode, sidekey);
    }

    /**
     * Get the root from the mam state.
     * @param state The mam state.
     * @returns The root.
     */
    public static getRoot(state: MamCore.MamState): string {
        return MamCore.getRoot(state);
    }

    /**
     * Add a subscription to your state object
     * @param state The state object to add the subscription to.
     * @param channelRoot The root of the channel to subscribe to.
     * @param channelMode Can be `public`, `private` or `restricted`.
     * @param channelKey Optional, the key of the channel to subscribe to.
     * @returns Updated state object to be used with future actions.
     */
    public static subscribe(state: MamCore.MamState, channelRoot: string, channelMode: MamCore.MamMode, channelKey?: string): MamCore.MamState {
        return MamCore.subscribe(state, channelRoot, channelMode, channelKey);
    }

    /**
     * Listen for new message on the channel.
     * @param channel The channel to listen on.
     * @param callback The callback to receive any messages,
     */
    public static listen(channel: MamCore.MamSubscribedChannel, callback: (messages: string[]) => void): void {
        return MamCore.listen(channel, callback);
    }

    /**
     * Creates a MAM message payload from a state object.
     * @param state The current mam state.
     * @param message Tryte encoded string.
     * @returns An object containing the payload and updated state.
     */
    public static create(state: MamCore.MamState, message: string): MamCore.MamMessage {
        return MamCore.create(state, message);
    }

    /**
     * Decode a message.
     * @param payload The payload of the message.
     * @param sideKey The sideKey used in the message.
     * @param root The root used for the message.
     * @returns The decoded payload.
     */
    public static decode(payload: string, sideKey: string, root: string): string {
        return MamCore.decode(payload, sideKey, root);
    }

    /**
     * Fetch the messages asynchronously.
     * @param root The root key to use.
     * @param mode The mode of the channel.
     * @param sideKey The sideKey used in the messages, only required for restricted.
     * @param callback Optional callback to receive each payload.
     * @param limit Limit the number of messages that are fetched.
     * @returns The nextRoot and the messages if no callback was supplied, or an Error.
     */
    public static async fetch(root: string, mode: MamCore.MamMode, sideKey?: string, callback?: (payload: string) => void, limit?: number): Promise<{
        /**
         * The root for the next message.
         */
        nextRoot: string;
        /**
         * All the message payloads.
         */
        messages?: string[];
    } | Error> {
        return loadBalancer(
            Mam.loadBalancerSettings,
            (node) => {
                MamCore.setIOTA(node.provider);
                MamCore.setAttachToTangle(node.attachToTangle || Mam.loadBalancerSettings.attachToTangle);
            },
            () => new Bluebird<any>((resolve, reject) => {
                MamCore.fetch(root, mode, sideKey, callback, limit)
                    .then(resolve)
                    .catch(reject);
            }));
    }

    /**
     * Fetch a single message asynchronously.
     * @param root The root key to use.
     * @param mode The mode of the channel.
     * @param sideKey The sideKey used in the messages.
     * @returns The nextRoot and the payload, or an Error.
     */
    public static async fetchSingle(root: string, mode: MamCore.MamMode, sideKey?: string): Promise<{
        /**
         * The root for the next message.
         */
        nextRoot: string;
        /**
         * The payload for the message.
         */
        payload?: string;
    } | Error> {
        const response = await Mam.fetch(root, mode, sideKey, undefined, 1);
        return response instanceof Error ? response : {
            payload: response.messages && response.messages.length === 1 ? response.messages[0] : undefined,
            nextRoot: response.nextRoot
        };
    }

    /**
     * Attach the mam trytes to the tangle.
     * @param trytes The trytes to attach.
     * @param root The root to attach them to.
     * @param depth The depth to attach them with, defaults to 3.
     * @param mwm The minimum weight magnitude to attach with, defaults to 9 for devnet, 14 required for mainnet.
     * @param tag Trytes to tag the message with.
     * @returns The transaction objects.
     */
    public static async attach(trytes: string, root: string, depth?: number, mwm?: number, tag?: string): Promise<ReadonlyArray<Transaction>> {
        const { prepareTransfers, sendTrytes } = composeAPI(Mam.loadBalancerSettings);

        const response = await prepareTransfers(
            "9".repeat(81), [
                {
                    address: root,
                    value: 0,
                    message: trytes,
                    tag: tag
                }
            ]);

        return sendTrytes(response, depth || 0, mwm || 0);
    }
}
