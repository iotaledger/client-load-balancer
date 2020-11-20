"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mam = void 0;
const MamCore = require("@iota/mam");
const Bluebird = require("bluebird");
const composeAPI_1 = require("./composeAPI");
const internals_1 = require("./internals");
const failMode_1 = require("./models/failMode");
const successMode_1 = require("./models/successMode");
/**
 * Wrapper for Mam with load balancing
 */
class Mam {
    /**
     * Initialisation function which returns a state object
     * @param settings Settings for the load balancer.
     * @param seed The seed to initialise with.
     * @param security The security level, defaults to 2.
     * @returns The mam state.
     */
    static init(settings, seed, security = 2) {
        if (!settings) {
            throw new Error("You must provider settings");
        }
        if (!settings.nodeWalkStrategy) {
            throw new Error("The nodeWalkStrategy field must be provided");
        }
        settings.mwm = settings.mwm || 9;
        settings.depth = settings.depth || 3;
        settings.successMode = settings.successMode || successMode_1.SuccessMode.next;
        settings.failMode = settings.failMode || failMode_1.FailMode.all;
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
    static changeMode(state, mode, sidekey) {
        return MamCore.changeMode(state, mode, sidekey);
    }
    /**
     * Get the root from the mam state.
     * @param state The mam state.
     * @returns The root.
     */
    static getRoot(state) {
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
    static subscribe(state, channelRoot, channelMode, channelKey) {
        return MamCore.subscribe(state, channelRoot, channelMode, channelKey);
    }
    /**
     * Listen for new message on the channel.
     * @param channel The channel to listen on.
     * @param callback The callback to receive any messages,
     */
    static listen(channel, callback) {
        return MamCore.listen(channel, callback);
    }
    /**
     * Creates a MAM message payload from a state object.
     * @param state The current mam state.
     * @param message Tryte encoded string.
     * @returns An object containing the payload and updated state.
     */
    static create(state, message) {
        return MamCore.create(state, message);
    }
    /**
     * Decode a message.
     * @param payload The payload of the message.
     * @param sideKey The sideKey used in the message.
     * @param root The root used for the message.
     * @returns The decoded payload.
     */
    static decode(payload, sideKey, root) {
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
    static fetch(root, mode, sideKey, callback, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return internals_1.loadBalancer(Mam.loadBalancerSettings, (node) => {
                MamCore.setIOTA(node.provider);
                MamCore.setAttachToTangle(node.attachToTangle || Mam.loadBalancerSettings.attachToTangle);
            }, () => new Bluebird((resolve, reject) => {
                MamCore.fetch(root, mode, sideKey, callback, limit)
                    .then(resolve)
                    .catch(reject);
            }));
        });
    }
    /**
     * Fetch a single message asynchronously.
     * @param root The root key to use.
     * @param mode The mode of the channel.
     * @param sideKey The sideKey used in the messages.
     * @returns The nextRoot and the payload, or an Error.
     */
    static fetchSingle(root, mode, sideKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield Mam.fetch(root, mode, sideKey, undefined, 1);
            return response instanceof Error ? response : {
                payload: response.messages && response.messages.length === 1 ? response.messages[0] : undefined,
                nextRoot: response.nextRoot
            };
        });
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
    static attach(trytes, root, depth, mwm, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const { prepareTransfers, sendTrytes } = composeAPI_1.composeAPI(Mam.loadBalancerSettings);
            const response = yield prepareTransfers("9".repeat(81), [
                {
                    address: root,
                    value: 0,
                    message: trytes,
                    tag: tag
                }
            ]);
            return sendTrytes(response, depth || 0, mwm || 0);
        });
    }
}
exports.Mam = Mam;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxxQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLDZDQUEwQztBQUMxQywyQ0FBMkM7QUFDM0MsZ0RBQTZDO0FBRTdDLHNEQUFtRDtBQUVuRDs7R0FFRztBQUNILE1BQWEsR0FBRztJQU1aOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBOEIsRUFBRSxJQUFhLEVBQUUsV0FBbUIsQ0FBQztRQUNsRixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDbEU7UUFDRCxRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDckMsUUFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2hFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBUSxDQUFDLEdBQUcsQ0FBQztRQUN0RCxHQUFHLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBdUIsRUFBRSxJQUFxQixFQUFFLE9BQWdCO1FBQ3JGLE9B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