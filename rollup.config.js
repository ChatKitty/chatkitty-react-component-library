import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import analyze from "rollup-plugin-analyzer";

const packageJson = require("./package.json");

const plugins = [
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("production"),
    __buildDate__: () => JSON.stringify(new Date()),
  }),
  peerDepsExternal(),
  resolve({ preferBuiltins: true }),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true }),
  postcss({
    extensions: [".css"],
  }),
  terser(),
  analyze(),
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins,
  },
  {
    input: "src/widget.tsx",
    output: [
      {
        file: packageJson.umd,
        format: "umd",
        name: "ChatKittyWidget",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    ],
    plugins,
  },
];
