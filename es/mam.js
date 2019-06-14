"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyw2Q0FBMEM7QUFDMUMsMkNBQTJDO0FBQzNDLGdEQUE2QztBQUU3QyxzREFBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxNQUFhLEdBQUc7SUFNWjs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQThCLEVBQUUsSUFBYSxFQUFFLFdBQW1CLENBQUM7UUFDbEYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQztRQUNoRSxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUM7UUFDdEQsR0FBRyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQztRQUNwQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQXVCLEVBQUUsSUFBcUIsRUFBRSxPQUFnQjtRQUNyRixPQUFP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