import { NodeConfiguration } from "../src/models/nodeConfiguration";
import { BaseWalkStrategy } from "../src/walkStrategies/baseWalkStrategy";

/**
 * Dummy walk strategy to test abstract base.
 */
class DummyWalkStrategy extends BaseWalkStrategy {
    /**
     * Get the current node from the strategy.
     * @returns A node configuration from the strategy.
     */
    public current(): NodeConfiguration {
        return this.getUsableNodes()[0];
    }

    /**
     * Move to the next node in the strategy.
     * @param retainOrder Retain the ordering if resetting the list.
     */
    public next(retainOrder: boolean): void {
    }
}

test("BaseWalkStrategy() fails with no nodes", () => {
    expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DummyWalkStrategy([]);
    }).toThrowError(/at least one node/);
});

test("totalUsable() returns node count", () => {
    const obj = new DummyWalkStrategy([
        {
            provider: "https://localhost",
            mwm: 14,
            depth: 3
        },
        {
            provider: "https://localhost",
            mwm: 14,
            depth: 3
        }
    ]);

    expect(obj.totalUsable()).toBe(2);
});

test("blacklist() can be ignored", () => {
    const obj = new DummyWalkStrategy(
        [
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            },
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            }
        ]);

    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    expect(obj.totalUsable()).toBe(2);
});

test("blacklist() can continue using nodes", () => {
    const obj = new DummyWalkStrategy(
        [
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            },
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            }
        ],
        5);

    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    expect(obj.totalUsable()).toBe(2);
});

test("blacklist() can stop using single nodes", () => {
    const obj = new DummyWalkStrategy(
        [
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            },
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            }
        ],
        5);

    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    expect(obj.totalUsable()).toBe(1);
});

test("blacklist() can reset", () => {
    const obj = new DummyWalkStrategy(
        [
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            },
            {
                provider: "https://localhost",
                mwm: 14,
                depth: 3
            }
        ],
        3);

    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    obj.blacklist();
    expect(obj.totalUsable()).toBe(2);
});
