module.exports = {
  "parser":  "@typescript-eslint/parser",
  "parserOptions":  {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  "plugins": [
    "no-null",
    "jest",
  ],
  "env": {
    "jest/globals": true
  },
  "rules": {
    "no-null/no-null": 2,
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/camelcase": false,
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": {
          "minProperties": 5,
          "multiline": true,
          "consistent": true
        },
        "ObjectPattern": {
          "minProperties": 5,
          "multiline": true,
          "consistent": true
        },
        "ImportDeclaration": {
          "minProperties": 5,
          "multiline": true,
          "consistent": true
        },
        "ExportDeclaration": {
          "minProperties": 5,
          "multiline": true,
          "consistent": true
        }
      }
    ],
    "max-len": ["error", 150, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
    "no-console": ["error", { "allow": ["log", "debug", "warn", "error"] }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never', // NOTE: ts itself doesn't want .ts extensions with imports, so don't lint here
    }]
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  "overrides": [
    {
      "files": ['*.test.ts'],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
};
