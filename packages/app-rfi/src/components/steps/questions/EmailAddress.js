import React from "react";

import {
  gaEventPropTypes,
  useTryGAEvent,
} from "../../../core/utils/useDataLayer";
import { RfiEmailInput } from "../../controls";

/**
 * @param {{ gaData: import("../../../../../../shared/services/googleAnalytics").GAEventObject}} props
 */
export const EmailAddress = ({ gaData }) => {
  const label = "Email Address";
  const name = "EmailAddress";

  const tryGAEvent = useTryGAEvent();

  return (
    <RfiEmailInput
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

EmailAddress.propTypes = { gaData: gaEventPropTypes };
