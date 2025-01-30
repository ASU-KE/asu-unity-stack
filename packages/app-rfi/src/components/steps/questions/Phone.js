import React from "react";

import {
  gaEventPropTypes,
  useTryGAEvent,
} from "../../../core/utils/useDataLayer";
import { RfiPhone } from "../../controls";

/**
 * @param {{ gaData: import("../../../../../../shared/services/googleAnalytics").GAEventObject}} props
 */
export const Phone = ({ gaData }) => {
  const label = "Phone";
  const name = "Phone";

  const tryGAEvent = useTryGAEvent();

  return (
    <RfiPhone
      label={label}
      id={name}
      name={name}
      requiredIcon
      required
      onBlur={e =>
        tryGAEvent({
          ...gaData,
          type: label,
          text: e.target.value,
        })
      }
    />
  );
};

Phone.propTypes = { gaData: gaEventPropTypes };
