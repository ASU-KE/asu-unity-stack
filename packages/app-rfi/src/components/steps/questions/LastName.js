import React from "react";

import {
  gaEventPropTypes,
  useTryGAEvent,
} from "../../../core/utils/useDataLayer";
import { RfiTextInput } from "../../controls";

/**
 * @param {{ gaData: import("../../../../../../shared/services/googleAnalytics").GAEventObject}} props
 */
export const LastName = ({ gaData }) => {
  const label = "Last name";
  const name = "LastName";

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

LastName.propTypes = { gaData: gaEventPropTypes };
