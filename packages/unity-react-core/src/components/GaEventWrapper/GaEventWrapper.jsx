/**
 * GaEventType represents the structure of Google Analytics event data.
 *
 * @typedef {Object} GaEventType
 * @property {string} text - The text associated with the event.
 * @property {string} name - The name of the event.
 * @property {string} event - The event type.
 * @property {string} action - The action taken.
 * @property {string} type - The type of event.
 * @property {string} region - The region where the event occurred.
 * @property {string} section - The section of the application.
 * @property {string} [component] - The component associated with the event.
 */

/**
 * GaEventWrapper props.
 *
 * @typedef {Object} GaEventWrapper
 * @property {GaEventType} gaData - Google Analytics data.
 * @property {import("react").ReactElement} children - Expects a single child element.
 */

/**
 * GaEventWrapper component wraps a child element and tracks Google Analytics events.
 *
 * @param {GaEventWrapper} props - The props for the component.
 * @returns {import("react").ReactElement} The wrapped child element with GA tracking.
 */
import React from "react";

import { trackGAEvent } from "../../../../../shared";
import { useBaseSpecificFramework } from "./useBaseSpecificFramework";

// TODO: Add environment variable passed in by storybook to remove the possibilty of adding code meant for bootstrap in react
/**
 *
 * @param GaEventWrapper
 * @returns
 */
export const GaEventWrapper = ({ gaData, children: child }) => {
  const { isReact } = useBaseSpecificFramework();
  const { onClick: initialOnClick, ...props } = child.props;

  if (isReact) {
    return React.cloneElement(child, {
      ...props,
      onClick: e => {
        trackGAEvent(gaData);
        if (initialOnClick) {
          return initialOnClick(e);
        }
        return true;
      },
    });
  }
  return React.cloneElement(child, {
    ...props,
    "onClick": initialOnClick,
    "data-ga": gaData.text,
    "data-ga-name": gaData.name,
    "data-ga-event": gaData.event,
    "data-ga-action": gaData.action,
    "data-ga-type": gaData.type,
    "data-ga-region": gaData.region,
    "data-ga-section": gaData.section,
    "data-ga-component": gaData.component,
  });
};
