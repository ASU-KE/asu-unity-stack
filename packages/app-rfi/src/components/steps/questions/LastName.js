import React, { useEffect, useState } from "react";

import { trackGAEvent } from "../../../../../../shared";
import {
  CAMPUS_OPTIONS_DEFAULT,
  GA_EVENT_DEFAULT,
  KEY,
} from "../../../core/utils/constants";
import { useRfiContext } from "../../../core/utils/rfiContext";
import { RfiTextInput } from "../../controls";

export const LastName = () => {
  const {
    programOfInterest,
    formik: { values },
  } = useRfiContext();

  return (
    <RfiTextInput
      label="Last name"
      id="LastName"
      name="LastName"
      requiredIcon
      required
      onBlur={e =>
        trackGAEvent({
          section: "about me ^ last name​",
          text: e.target.value,
        })
      }
    />
  );
};
