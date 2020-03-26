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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsNkNBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyxnREFBNkM7QUFFN0Msc0RBQW1EO0FBRW5EOztHQUVHO0FBQ0gsTUFBYSxHQUFHO0lBTVo7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUE4QixFQUFFLElBQWEsRUFBRSxXQUFtQixDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNsRTtRQUNELFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNyQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUkseUJBQVcsQ0FBQyxJQUFJLENBQUM7UUFDaEUsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUM7UUFDcEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUF1QixFQUFFLElBQXFCLEVBQUUsT0FBZ0I7UUFDckYsT0FB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