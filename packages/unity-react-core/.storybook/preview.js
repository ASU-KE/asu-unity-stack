import "@asu/unity-bootstrap-theme/src/scss/unity-bootstrap-theme.bundle.scss";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { globalDecorators } from "./decorators.tsx";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    values: [
      {
        name: "Gray 2",
        value: "#e8e8e8",
      },
      {
        name: "Gray 3",
        value: "#d0d0d0",
      },
    ],
  },
  html: {
    prettier: {
      tabWidth: 4,
      htmlWhitespaceSensitivity: "ignore",
    },
    root: "#html-root",
  },
};


/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters,
  decorators: globalDecorators,
  globalTypes: {
    framework: {
      name: 'Framework',
      description: 'Framework to use',
      defaultValue: 'bootstrap',
      toolbar: {
        title: 'Framework',
        icon: 'cog',
        items: [
          { value: 'react', icon: 'beaker', title: 'React Framework' },
          { value: 'bootstrap', icon: 'markup', title: 'Bootstrap Framework' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
