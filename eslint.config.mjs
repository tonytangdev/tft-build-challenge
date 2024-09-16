// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
  ),
  {
    ignores: [
      "packages/scripts/cdk.out",
      "packages/scripts/bin/scripts.js",
      "packages/scripts/jest.config.js",
      "packages/scripts/lib/scripts-stack.js",
    ],
  },
];
