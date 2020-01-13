import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript';

const plugins = [
    commonjs(),
    resolve(),
    typescript({
        target: "es5",
        module: "es2015"
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: './src/index.ts',
    external: [
        "@iota/core",
        "@iota/validators",
        "bluebird"
    ],
    output: {
        file: `dist/iota-client-load-balancer${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'IotaClientLoadBalancer',
        compact: process.env.MINIFY,
        globals: {
            "@iota/core": 'core',
            "@iota/validators": 'validators',
            "bluebird": 'Bluebird'
        }
    },
    plugins
}