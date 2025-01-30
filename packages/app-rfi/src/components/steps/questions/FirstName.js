import React from "react";

import {
  gaEventPropTypes,
  useTryGAEvent,
} from "../../../core/utils/useDataLayer";
import { RfiTextInput } from "../../controls";

/**
 * @param {{ gaData: import("../../../../../../shared/services/googleAnalytics").GAEventObject}} props
 */
export const FirstName = ({ gaData }) => {
  const label = "First name";
  const name = "FirstName";

  const tryGAEvent = useTryGAEvent();

  return (
    <RfiTextInput
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

FirstName.propTypes = { gaData: gaEventPropTypes };
