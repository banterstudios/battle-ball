const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  "extends": "standard",
  "plugins": [
    "standard",
    "promise",
    "react",
    "jsx-a11y"
  ],
  "env": {
    "es6": true,
    "browser": true,
    "commonjs": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "rules": {
    "strict": OFF,
    "react/jsx-uses-react": ERROR,
    "react/jsx-uses-vars": ERROR,
    "no-useless-constructor": OFF,
    "no-unused-vars": WARN,
    "no-trailing-spaces": WARN,
    "indent": WARN,
    "semi": WARN,
    "eol-last": ERROR,
    "padded-blocks": WARN,
    "spaced-comment": WARN,
    "no-multiple-empty-lines": WARN,
    "no-multi-spaces": WARN,
    "standard/object-curly-even-spacing": WARN,
    "one-var": WARN,
    "no-constant-condition": WARN,
    "no-unused-expressions": OFF,
    "comma-dangle": WARN
  },
  "globals": {
    "require": true
  }
}
