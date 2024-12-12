import React, { useEffect } from "react";
import { allCookieConsentJS } from "../../../src/js/cookie-consent";
import "../../../src/css/cookie-consent.css";

import { fullLayoutDecorator } from "../../../../../shared/components/Layout";

export default {
  title: "Molecules/Cookie Consent",
  decorators: [ fullLayoutDecorator ],
  parameters: { controls: { disable: true } },
};
export const CookieConsent = () => {
  useEffect(() => {
    allCookieConsentJS();
  }, []);

  return (
    <div></div>
  );
}
