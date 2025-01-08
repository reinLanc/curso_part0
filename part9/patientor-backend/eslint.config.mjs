import parser from "@typescript-eslint/parser";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      "@/semi": ["error"],
      "@/explicit-function-return-type": "off",
      "@/explicit-module-boundary-types": "off",
      "@/restrict-template-expressions": "off",
      "@/restrict-plus-operands": "off",
      "@/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-case-declarations": "off",
    },
    settings: {
      env: {
        node: true,
        es6: true,
      },
    },
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      "*.min.js",
      "coverage/**",
    ],
  },
];
