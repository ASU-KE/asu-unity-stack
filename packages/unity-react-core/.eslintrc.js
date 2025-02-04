module.exports = {
  extends: ["../../.eslintrc.base.js"],
  rules: {
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^@shared.*"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ]
  },
};
