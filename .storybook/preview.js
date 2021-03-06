import "./index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  options: {
    storySort: {
      order: ["Introduction", "Hooks", "Components", "Demos", "Styling"],
    },
  },
};
