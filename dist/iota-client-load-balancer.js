(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@iota/core'), require('@iota/validators')) :
    typeof define === 'function' && define.amd ? define(['exports', '@iota/core', '@iota/validators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IotaClientLoadBalancer = {}, global.core, global.validators));
}(this, (function (exports, core, validators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * Fail modes for the load balancer.
     */
    (function (FailMode) {
        /**
         * Try single node only, failure throws exception.
         */
        FailMode["single"] = "single";
        /**
         * Try all nodes until one succeeds, on all failing throws combined exception.
         */
        FailMode["all"] = "all";
    })(exports.FailMode || (exports.FailMode = {}));

    /**
     * Success modes for the load balancer.
     */
    (function (SuccessMode) {
        /**
         * Keep the node if it was successful.
         */
        SuccessMode["keep"] = "keep";
        /**
         * Move to the next node even if it was successful.
         */
        SuccessMode["next"] = "next";
    })(exports.SuccessMode || (exports.SuccessMode = {}));

    /**
     * Create a new instance of the API.
     * @param settings The load balancer settings.
     * @param updateProvider Update the provider in the calling context.
     * @param methodPromise The method to call.
     * @param validateResult Let the caller validate the result.
     * @returns The api.
     * @private
     */
    function loadBalancer(settings, updateProvider, methodPromise, validateResult) {
        return __awaiter(this, void 0, Promise, function () {
            var res, tryNextNode, totalNodes, triedCount, errorList, node, timeout, validMessage, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tryNextNode = false;
                        totalNodes = settings.nodeWalkStrategy.totalUsable();
                        triedCount = 0;
                        errorList = [];
                        _a.label = 1;
                    case 1:
                        node = settings.nodeWalkStrategy.current();
                        updateProvider(node);
                        if (settings.tryNodeCallback) {
                            settings.tryNodeCallback(node);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        timeout = node.timeoutMs || settings.timeoutMs;
                        if (!timeout) return [3 /*break*/, 4];
                        return [4 /*yield*/, methodPromise(node).timeout(timeout, node.provider + " the request timed out")];
                    case 3:
                        res = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, methodPromise(node)];
                    case 5:
                        res = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (validateResult) {
                            validMessage = validateResult(res);
                            if (validMessage) {
                                throw new Error(validMessage);
                            }
                        }
                        tryNextNode = false;
                        if (settings.successMode === exports.SuccessMode.next) {
                            // Walk to the next node in the strategy
                            settings.nodeWalkStrategy.next(false);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        settings.nodeWalkStrategy.blacklist();
                        if (settings.failNodeCallback) {
                            settings.failNodeCallback(node, err_1);
                        }
                        if (settings.failMode === exports.FailMode.single) {
                            // Single fail mode so just throw the error
                            throw err_1;
                        }
                        else if (settings.failMode === exports.FailMode.all) {
                            // Fail mode is try all until one succeeds
                            errorList.push(err_1.message ? err_1 : { message: err_1 });
                            // Try to use the next node if the current one errored
                            triedCount++;
                            // But only if we have not already tried all the nodes
                            tryNextNode = triedCount < totalNodes;
                            if (!tryNextNode) {
                                // No more nodes to try so throw the combined exceptions
                                throw new Error("All nodes failed\n   " + errorList.map(function (e) { return e.message; }).join("\n   "));
                            }
                            // Walk to the next node in the strategy
                            settings.nodeWalkStrategy.next(true);
                        }
                        return [3 /*break*/, 8];
                    case 8:
                        if (tryNextNode) return [3 /*break*/, 1];
                        _a.label = 9;
                    case 9: return [2 /*return*/, res];
                }
            });
        });
    }
    /**
     * Wrap a method and handle either callback or async result.
     * @param settings The load balancer settings.
     * @param api The composed api.
     * @param method The method to wrap.
     * @param methodName The name of the method.
     * @returns The wrapped method.
     * @private
     */
    function wrapMethodCallbackOrAsync(settings, api, method, methodName) {
        var _this = this;
        return function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var originalCallbackParam;
                return __generator(this, function (_a) {
                    originalCallbackParam = p[method.length - 1];
                    // If the caller is using the callback parameter remove it and use the promise
                    // method then restore on method completion.
                    if (originalCallbackParam) {
                        p[method.length - 1] = undefined;
                    }
                    return [2 /*return*/, loadBalancer(settings, function (node) { return api.setSettings({
                            provider: node.provider,
                            attachToTangle: node.attachToTangle || settings.attachToTangle,
                            user: node.user || settings.user,
                            password: node.password || settings.password
                        }); }, function (node) {
                            // Apply the default depth and mwm to methods that use them if they have not been supplied
                            if (methodName === "promoteTransaction" ||
                                methodName === "replayBundle" ||
                                methodName === "sendTrytes") {
                                p[1] = p[1] || node.depth || settings.depth;
                                p[2] = p[2] || node.mwm || settings.mwm;
                            }
                            return method.apply(void 0, p);
                        }, function (res) {
                            if (settings.snapshotAware && methodName === "getTrytes") {
                                var trytes = res;
                                if (trytes) {
                                    for (var i = 0; i < trytes.length; i++) {
                                        if (validators.isEmpty(trytes[i])) {
                                            return "Data has been removed by snapshot";
                                        }
                                    }
                                }
                            }
                            return "";
                        })
                            .then(function (res) {
                            if (originalCallbackParam) {
                                originalCallbackParam(null, res);
                                return undefined;
                            }
                            else {
                                return res;
                            }
                        }).catch(function (err) {
                            if (originalCallbackParam) {
                                originalCallbackParam(err);
                            }
                            else {
                                throw err;
                            }
                        })];
                });
            });
        };
    }

    /**
     * Create a new instance of the API wrapped with load balancing support.
     * @param settings The load balancer settings.
     * @returns The api.
     */
    function composeAPI(settings) {
        if (!settings) {
            throw new Error("You must provider settings");
        }
        if (!settings.nodeWalkStrategy) {
            throw new Error("The nodeWalkStrategy field must be provided");
        }
        settings.mwm = settings.mwm || 9;
        settings.depth = settings.depth || 3;
        settings.successMode = settings.successMode || exports.SuccessMode.next;
        settings.failMode = settings.failMode || exports.FailMode.all;
        var api = core.composeAPI({ attachToTangle: settings.attachToTangle });
        // Wrap all the web methods with additional handling
        api.addNeighbors = wrapMethodCallbackOrAsync(settings, api, api.addNeighbors, "addNeighbors");
        api.broadcastTransactions = wrapMethodCallbackOrAsync(settings, api, api.broadcastTransactions, "broadcastTransactions");
        api.checkConsistency = wrapMethodCallbackOrAsync(settings, api, api.checkConsistency, "checkConsistency");
        api.findTransactions = wrapMethodCallbackOrAsync(settings, api, api.findTransactions, "findTransactions");
        api.getBalances = wrapMethodCallbackOrAsync(settings, api, api.getBalances, "getBalances");
        api.getInclusionStates = wrapMethodCallbackOrAsync(settings, api, api.getInclusionStates, "getInclusionStates");
        api.getNeighbors = wrapMethodCallbackOrAsync(settings, api, api.getNeighbors, "getNeighbors");
        api.getNodeInfo = wrapMethodCallbackOrAsync(settings, api, api.getNodeInfo, "getNodeInfo");
        api.getTransactionsToApprove = wrapMethodCallbackOrAsync(settings, api, api.getTransactionsToApprove, "getTransactionsToApprove");
        api.getTrytes = wrapMethodCallbackOrAsync(settings, api, api.getTrytes, "getTrytes");
        api.interruptAttachingToTangle = wrapMethodCallbackOrAsync(settings, api, api.interruptAttachingToTangle, "interruptAttachingToTangle");
        api.removeNeighbors = wrapMethodCallbackOrAsync(settings, api, api.removeNeighbors, "removeNeighbors");
        api.storeTransactions = wrapMethodCallbackOrAsync(settings, api, api.storeTransactions, "storeTransactions");
        api.broadcastBundle = wrapMethodCallbackOrAsync(settings, api, api.broadcastBundle, "broadcastBundle");
        api.getAccountData = wrapMethodCallbackOrAsync(settings, api, api.getAccountData, "getAccountData");
        api.getBundle = wrapMethodCallbackOrAsync(settings, api, api.getBundle, "getBundle");
        api.getBundlesFromAddresses = wrapMethodCallbackOrAsync(settings, api, api.getBundlesFromAddresses, "getBundlesFromAddresses");
        api.getNewAddress = wrapMethodCallbackOrAsync(settings, api, api.getNewAddress, "getNewAddress");
        api.getTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.getTransactionObjects, "getTransactionObjects");
        api.findTransactionObjects = wrapMethodCallbackOrAsync(settings, api, api.findTransactionObjects, "findTransactionObjects");
        api.getInputs = wrapMethodCallbackOrAsync(settings, api, api.getInputs, "getInputs");
        api.getTransfers = wrapMethodCallbackOrAsync(settings, api, api.getTransfers, "getTransfers");
        api.isPromotable = wrapMethodCallbackOrAsync(settings, api, api.isPromotable, "isPromotable");
        api.isReattachable = wrapMethodCallbackOrAsync(settings, api, api.isReattachable, "isReattachable");
        api.prepareTransfers = wrapMethodCallbackOrAsync(settings, api, api.prepareTransfers, "prepareTransfers");
        api.promoteTransaction = wrapMethodCallbackOrAsync(settings, api, api.promoteTransaction, "promoteTransaction");
        api.replayBundle = wrapMethodCallbackOrAsync(settings, api, api.replayBundle, "replayBundle");
        api.sendTrytes = wrapMethodCallbackOrAsync(settings, api, api.sendTrytes, "sendTrytes");
        api.storeAndBroadcast = wrapMethodCallbackOrAsync(settings, api, api.storeAndBroadcast, "storeAndBroadcast");
        api.traverseBundle = wrapMethodCallbackOrAsync(settings, api, api.traverseBundle, "traverseBundle");
        return api;
    }

    /**
     * Settings to use for the load balancer.
     */
    var LoadBalancerSettings = /** @class */ (function () {
        function LoadBalancerSettings() {
        }
        return LoadBalancerSettings;
    }());

    /**
     * The configuration for a single node.
     */
    var NodeConfiguration = /** @class */ (function () {
        function NodeConfiguration() {
        }
        return NodeConfiguration;
    }());

    /**
     * Common features for the node strategies.
     * @private
     */
    var BaseWalkStrategy = /** @class */ (function () {
        /**
         * Create a new instance of BaseWalkStrategy.
         * @param nodes The nodes to iterate through.
         * @param blacklistLimit The number of failures before a node is blacklisted.
         */
        function BaseWalkStrategy(nodes, blacklistLimit) {
            if (!nodes || nodes.length === 0) {
                throw new Error("You must supply at least one node to the strategy");
            }
            this._allNodes = nodes;
            this._usableNodes = nodes.slice();
            this._blacklistLimit = blacklistLimit;
            this._blacklistNodes = {};
        }
        /**
         * The total number of nodes configured for the strategy.
         * @returns The total number of nodes.
         */
        BaseWalkStrategy.prototype.totalUsable = function () {
            return this._usableNodes.length;
        };
        /**
         * Blacklist the current node, so it doesn't get used again once limit is reached.
         */
        BaseWalkStrategy.prototype.blacklist = function () {
            if (this._blacklistLimit) {
                var current = this.current();
                if (current) {
                    if (!this._blacklistNodes[current.provider]) {
                        this._blacklistNodes[current.provider] = 1;
                    }
                    else {
                        this._blacklistNodes[current.provider]++;
                    }
                    if (this._blacklistNodes[current.provider] >= this._blacklistLimit) {
                        var idx = this._usableNodes.indexOf(current);
                        if (idx >= 0) {
                            this._usableNodes.splice(idx, 1);
                        }
                    }
                    // If there are no usable nodes left then reset the blacklists
                    if (this._usableNodes.length === 0) {
                        this._blacklistNodes = {};
                        this._usableNodes = this._allNodes.slice();
                    }
                }
            }
        };
        /**
         * Get the list of nodes that have not been blacklisted.
         * @returns The non blacklisted nodes.
         */
        BaseWalkStrategy.prototype.getUsableNodes = function () {
            return this._usableNodes;
        };
        return BaseWalkStrategy;
    }());

    /**
     * Node choice strategy which just iterates through the list of nodes.
     */
    var LinearWalkStrategy = /** @class */ (function (_super) {
        __extends(LinearWalkStrategy, _super);
        /**
         * Create a new instance of LinearWalkStrategy.
         * @param nodes The nodes to randomly pick from.
         * @param blacklistLimit The number of failures before a node is blacklisted.
         */
        function LinearWalkStrategy(nodes, blacklistLimit) {
            var _this = _super.call(this, nodes, blacklistLimit) || this;
            _this._currentIndex = 0;
            return _this;
        }
        /**
         * Get the current node from the strategy.
         * @returns A node configuration from the strategy.
         */
        LinearWalkStrategy.prototype.current = function () {
            return this.getUsableNodes()[this._currentIndex];
        };
        /**
         * Move to the next node in the strategy.
         * @param retainOrder Retain the ordering if resetting the list.
         */
        LinearWalkStrategy.prototype.next = function (retainOrder) {
            this._currentIndex = (this._currentIndex + 1) % this.getUsableNodes().length;
        };
        return LinearWalkStrategy;
    }(BaseWalkStrategy));

    /**
     * Node choice strategy which randomly picks from the list of nodes.
     */
    var RandomWalkStrategy = /** @class */ (function (_super) {
        __extends(RandomWalkStrategy, _super);
        /**
         * Create a new instance of RandomWalkStategy.
         * @param nodes The nodes to randomly pick from.
         * @param blacklistLimit The number of failures before a node is blacklisted.
         */
        function RandomWalkStrategy(nodes, blacklistLimit) {
            var _this = _super.call(this, nodes, blacklistLimit) || this;
            _this._remainingNodes = [];
            _this._randomNodes = [];
            _this.populateRemaining();
            return _this;
        }
        /**
         * Get the current node from the strategy.
         * @returns A node configuration from the strategy.
         */
        RandomWalkStrategy.prototype.current = function () {
            return this._remainingNodes[0];
        };
        /**
         * Move to the next node in the strategy.
         * @param retainOrder Retain the ordering if resetting the list.
         */
        RandomWalkStrategy.prototype.next = function (retainOrder) {
            this._remainingNodes.shift();
            if (this._remainingNodes.length === 0) {
                if (retainOrder) {
                    this._remainingNodes = this._randomNodes.slice();
                }
                else {
                    this.populateRemaining();
                }
            }
        };
        /**
         * Populate the remaining array by randomizing the nodes.
         * @internal
         * @private
         */
        RandomWalkStrategy.prototype.populateRemaining = function () {
            var _a;
            this._remainingNodes = _super.prototype.getUsableNodes.call(this).slice();
            for (var i = this._remainingNodes.length - 1; i > 0; i--) {
                // tslint:disable-next-line:insecure-random
                var j = Math.floor(Math.random() * (i + 1));
                _a = [this._remainingNodes[j], this._remainingNodes[i]], this._remainingNodes[i] = _a[0], this._remainingNodes[j] = _a[1];
            }
            this._randomNodes = this._remainingNodes.slice();
        };
        return RandomWalkStrategy;
    }(BaseWalkStrategy));

    exports.LinearWalkStrategy = LinearWalkStrategy;
    exports.LoadBalancerSettings = LoadBalancerSettings;
    exports.NodeConfiguration = NodeConfiguration;
    exports.RandomWalkStrategy = RandomWalkStrategy;
    exports.composeAPI = composeAPI;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
