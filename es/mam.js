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
     * @param channelKey Optional, the key of the channel to subscribe to.
     * @returns Updated state object to be used with future actions.
     */
    static subscribe(state, channelRoot, channelKey) {
        return MamCore.subscribe(state, channelRoot, channelKey);
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
            }, (node) => new Bluebird((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield MamCore.fetch(root, mode, sideKey, callback, limit);
                    if (res instanceof Error) {
                        reject(res);
                    }
                    else {
                        resolve(res);
                    }
                }
                catch (err) {
                    reject(err);
                }
            })));
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