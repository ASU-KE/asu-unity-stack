// @ts-check
import React from "react";
import { createRoot } from "react-dom/client";

import { ASUFooter } from "../../footer";

/**
 * @typedef {Object} ComponentProps
 * @property {string} targetSelector - The CSS selector (#id or .class)
 * which identify the <div> element where the footer should be either hydrated or rendered.
 * @property {object} props - Properties to initialize the footer with.
 * Should only be set to true if the footer has been completely rendered server-side.
 */
const RenderReact = (component, props, target) => {
  const root = createRoot(target);
  root.render(React.createElement(component, props));
};

/**
 * @param {ComponentProps} props
 */
const initASUFooter = ({ targetSelector, props }) => {
  RenderReact(ASUFooter, props, document.querySelector(targetSelector));
};

export { initASUFooter };
