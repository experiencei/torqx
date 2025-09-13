module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:unused-imports/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off",
    "unused-imports/no-unused-imports": "error",
  },
};
