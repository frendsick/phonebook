module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "indent": [
            "error",
            4,
            {
                FunctionExpression: { body: 1, parameters: "first" },
                SwitchCase: 1, // Cases should be indented from the `switch` keyword
            },
        ],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": ["error", "always"],
        "arrow-spacing": ["error", { before: true, after: true }],
    },
};
