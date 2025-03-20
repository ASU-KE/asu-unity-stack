/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import { trackGAEvent } from "../../../../../../../shared";
// @ts-check
import asuVertLogo from "../../../../../public/assets/img/arizona-state-university-logo-vertical.png";
import asuHorizLogo from "../../../../../public/assets/img/arizona-state-university-logo.png";
import starbucksLogo from "../../../../../public/assets/img/asu-starbucks.png";
import { useAppContext } from "../../../core/context/app-context";
import { PartnerLogosWrapper } from "./index.styles";

const Partner = () => {
  const { partnerLogo, logo: asuLogo, breakpoint } = useAppContext();

  return (
    // @ts-ignore
    <PartnerLogosWrapper breakpoint={breakpoint} data-testid="partner">
      <a
        href={partnerLogo?.brandLink ?? "https://starbucks.asu.edu/"}
        onClick={() =>
          trackGAEvent({
            event: "link",
            action: "click",
            name: "onclick",
            region: "navbar",
            type: "internal link",
            section: "main navbar",
            text: "partner logo",
          })
        }
      >
        <img
          src={partnerLogo?.src ?? starbucksLogo}
          alt={partnerLogo?.alt ?? "ASU Starbucks logo"}
          width="232"
          height="81"
          decoding="async"
          // @ts-ignore
          // eslint-disable-next-line
          fetchpriority="high"
        />
      </a>
      <a
        href={asuLogo?.brandLink ?? "https://asu.edu"}
        onClick={() => trackGAEvent({ text: "asu logo" })}
      >
        <img
          className="vert"
          src={asuLogo?.src ?? asuVertLogo}
          alt={asuLogo?.alt ?? "Arizona State University"}
          width="303"
          height="234"
          decoding="async"
          // @ts-ignore
          // eslint-disable-next-line
          fetchpriority="high"
        />
        <img
          className="horiz"
          src={asuLogo?.mobileSrc ?? asuHorizLogo}
          alt={asuLogo?.alt ?? "Arizona State University"}
          width="400"
          height="72"
          decoding="async"
          // @ts-ignore
          // eslint-disable-next-line
          fetchpriority="high"
        />
      </a>
    </PartnerLogosWrapper>
  );
};

export { Partner };
