import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

const packageJson = require("./package.json");

export default {
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
    {
      file: packageJson.umd,
      format: "umd",
      name: "ChatKitty",
      sourcemap: true,
    },
  ],
  plugins: [
    replace(
      {
        "process.env.NODE_ENV": JSON.stringify("production"),
        __buildDate__: () => JSON.stringify(new Date()),
      },
      { preventAssignment: true }
    ),
    peerDepsExternal(),
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: [".css"],
    }),
    terser(),
  ],
};
