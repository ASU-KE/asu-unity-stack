import React from "react";
import { Table } from "./Tables";

export default {
  title: "Components/Table",
  decorators: [
    Story => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    columns: {
      control: { type: "range", min: 4, max: 14, step: 1 },
    },
  },
  args: {
    columns: 5,
  },
};

const Template = ({ columns }) => {
  return (
    <div className="uds-table" tabIndex={0}>
      <Table columns={columns} />
    </div>
  );
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  columns: 3,
};
