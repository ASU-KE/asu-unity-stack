import React from "react";

import { defaultDecorator } from "../../../../../shared/components/Layout";

export default {
  title: "Molecules/Calendar/Templates",
  decorators: [ defaultDecorator ],
  parameters: {
    controls: { disable: true }
  },
};

export const CalendarComponent = () => <div id="calendar"></div>;

