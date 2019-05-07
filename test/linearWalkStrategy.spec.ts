import { LinearWalkStrategy } from "../src/walkStrategies/linearWalkStrategy";

test("LinearWalkStrategy() fails with no nodes", () => {
    expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new LinearWalkStrategy([]);
    }).toThrowError(/at least one node/);
});

test("current() and next() iterate through nodes", () => {
    const obj = new LinearWalkStrategy([
        {
            provider: "https://localhost1",
            mwm: 14,
            depth: 3
        },
        {
            provider: "https://localhost2",
            mwm: 14,
            depth: 3
        }
    ]);

    expect(obj.current().provider).toBe("https://localhost1");
    obj.next();
    expect(obj.current().provider).toBe("https://localhost2");
});
