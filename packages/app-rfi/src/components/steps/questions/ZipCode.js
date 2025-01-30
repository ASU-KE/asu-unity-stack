import React, { useEffect } from "react";

import { KEY } from "../../../core/utils/constants";
import { useRfiContext } from "../../../core/utils/rfiContext";
import {
  gaEventPropTypes,
  useTryGAEvent,
} from "../../../core/utils/useDataLayer";
import { RfiTextInput } from "../../controls";

/**
 * @param {{ gaData: import("../../../../../../shared/services/googleAnalytics").GAEventObject}} props
 */
export const ZipCode = ({ gaData }) => {
  const label = "Postal code";
  const name = "ZipCode";

  const {
    formik: { values, setFieldValue },
  } = useRfiContext();

  const isNotUS = values.Country && values.Country !== "US";
  const isOnline = values.Campus === KEY.ONLINE;

  useEffect(() => {
    if (isNotUS || isOnline) {
      setFieldValue(name, KEY.FALSE_EMPTY);
    } else if (values[name] === KEY.FALSE_EMPTY) {
      setFieldValue(name, "");
    }
  }, [values.Campus, values.Country]);

  if (isNotUS || isOnline) {
    return <></>;
  }

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

ZipCode.propTypes = { gaData: gaEventPropTypes };
