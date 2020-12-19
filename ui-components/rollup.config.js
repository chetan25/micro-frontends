import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { babel } from '@rollup/plugin-babel';
// import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default {
    // Rollup will build up a dependency graph from this entry point and then bundle all the components that are imported/exported.
    input: "src/index.tsx",
    //  We will be outputting two bundles in two different JavaScript module formats:
    output: [
        // {
        //     file: packageJson.main,
        //     format: "cjs",
        //     sourcemap: true
        // },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        babel({
            exclude: "node_modules/**",
            babelHelpers: 'bundled'
        }),
        // prevents Rollup from bundling the peer dependencies
        peerDepsExternal(),
        // A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules
        resolve(),
        // A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        commonjs(),
        // transpiles our TypeScript code into JavaScript. This plugin will use all the settings we have set in tsconfig.json
        typescript({ useTsconfigDeclarationDir: true }),
    ]
};
