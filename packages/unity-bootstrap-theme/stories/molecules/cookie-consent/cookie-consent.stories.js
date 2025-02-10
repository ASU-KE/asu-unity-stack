import React, { useEffect } from "react";
import { allCookieConsentJS } from "../../../src/js/cookie-consent";
import { forceReloadOfStory } from "../../../.storybook/decorators";
import "../../../src/css/cookie-consent.css";

export default {
  title: "Molecules/Cookie Consent",
  decorators: [forceReloadOfStory],
  parameters: { controls: { disable: true } },
};
export const MaxWidthCookieConsent = () => {
  useEffect(() => {
    allCookieConsentJS();
  }, []);

  return (
    <div></div>
  );
}
