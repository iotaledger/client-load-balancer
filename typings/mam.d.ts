import { Transaction } from "@iota/core/typings/types";
import * as MamCore from "@iota/mam";
import { LoadBalancerSettings } from "./models/loadBalancerSettings";
/**
 * Wrapper for Mam with load balancing
 */
export declare class Mam {
    /**
     * The load balancer settings to use.
     */
    private static loadBalancerSettings;
    /**
     * Initialisation function which returns a state object
     * @param settings Settings for the load balancer.
     * @param seed The seed to initialise with.
     * @param security The security level, defaults to 2.
     * @returns The mam state.
     */
    static init(settings: LoadBalancerSettings, seed?: string, security?: number): MamCore.MamState;
    /**
     * Change the mode for the mam state.
     * @param state The current mam state.
     * @param mode [public/private/restricted].
     * @param sidekey, required for restricted mode.
     * @returns Updated state object to be used with future actions.
     */
    static changeMode(state: MamCore.MamState, mode: MamCore.MamMode, sidekey?: string): MamCore.MamState;
    /**
     * Get the root from the mam state.
     * @param state The mam state.
     * @returns The root.
     */
    static getRoot(state: MamCore.MamState): string;
    /**
     * Add a subscription to your state object
     * @param state The state object to add the subscription to.
     * @param channelRoot The root of the channel to subscribe to.
     * @param channelKey Optional, the key of the channel to subscribe to.
     * @returns Updated state object to be used with future actions.
     */
    static subscribe(state: MamCore.MamState, channelRoot: string, channelKey?: string): MamCore.MamState;
    /**
     * Listen for new message on the channel.
     * @param channel The channel to listen on.
     * @param callback The callback to receive any messages,
     */
    static listen(channel: MamCore.MamSubscribedChannel, callback: (messages: string[]) => void): void;
    /**
     * Creates a MAM message payload from a state object.
     * @param state The current mam state.
     * @param message Tryte encoded string.
     * @returns An object containing the payload and updated state.
     */
    static create(state: MamCore.MamState, message: string): MamCore.MamMessage;
    /**
     * Decode a message.
     * @param payload The payload of the message.
     * @param sideKey The sideKey used in the message.
     * @param root The root used for the message.
     * @returns The decoded payload.
     */
    static decode(payload: string, sideKey: string, root: string): string;
    /**
     * Fetch the messages asynchronously.
     * @param root The root key to use.
     * @param mode The mode of the channel.
     * @param sideKey The sideKey used in the messages, only required for restricted.
     * @param callback Optional callback to receive each payload.
     * @param limit Limit the number of messages that are fetched.
     * @returns The nextRoot and the messages if no callback was supplied, or an Error.
     */
    static fetch(root: string, mode: MamCore.MamMode, sideKey?: string, callback?: (payload: string) => void, limit?: number): Promise<{
        /**
         * The root for the next message.
         */
        nextRoot: string;
        /**
         * All the message payloads.
         */
        messages?: string[];
    } | Error>;
    /**
     * Fetch a single message asynchronously.
     * @param root The root key to use.
     * @param mode The mode of the channel.
     * @param sideKey The sideKey used in the messages.
     * @returns The nextRoot and the payload, or an Error.
     */
    static fetchSingle(root: string, mode: MamCore.MamMode, sideKey?: string): Promise<{
        /**
         * The root for the next message.
         */
        nextRoot: string;
        /**
         * The payload for the message.
         */
        payload?: string;
    } | Error>;
    /**
     * Attach the mam trytes to the tangle.
     * @param trytes The trytes to attach.
     * @param root The root to attach them to.
     * @param depth The depth to attach them with, defaults to 3.
     * @param mwm The minimum weight magnitude to attach with, defaults to 9 for devnet, 14 required for mainnet.
     * @param tag Trytes to tag the message with.
     * @returns The transaction objects.
     */
    static attach(trytes: string, root: string, depth?: number, mwm?: number, tag?: string): Promise<ReadonlyArray<Transaction>>;
}
