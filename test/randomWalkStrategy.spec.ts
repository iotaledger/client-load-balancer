import { NodeConfiguration } from "../src/models/nodeConfiguration";
import { RandomWalkStrategy } from "../src/walkStrategies/randomWalkStrategy";

test("RandomWalkStrategy() fails with no nodes", () => {
    expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new RandomWalkStrategy([]);
    }).toThrowError(/at least one node/);
});

test("current() and next() randomly pick nodes", () => {
    const nodes: NodeConfiguration[] = [];
    for (let i = 0; i < 10; i++) {
        nodes.push({
            provider: `${i}`,
            mwm: 14,
            depth: 3
        });
    }
    const obj = new RandomWalkStrategy(nodes);

    const visited: { [id: string]: boolean } = {};

    for (let i = 0; i < 200; i++) {
        visited[obj.current().provider] = true;
        obj.next(true);
    }

    for (let i = 0; i < nodes.length; i++) {
        expect(visited[nodes[i].provider]).toBe(true);
    }
});
