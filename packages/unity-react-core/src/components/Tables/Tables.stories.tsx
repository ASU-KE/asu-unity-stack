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

const Template = ({ fixed, columns }) => {
  if (!fixed) {
  return (
    <div className="uds-table" tabIndex={0}>
      <Table columns={columns} />
    </div>
  );
}
 return (
  <div className="uds-table-fixed-wrapper">
    <div className="scroll-control previous">
      <button type="button" className="btn btn-circle btn-circle-alt-gray">
        <i className="fas fa-chevron-left"></i>
        <span className="visually-hidden">Previous</span>
      </button>
    </div>

    <div className="scroll-control next">
      <button type="button" className="btn btn-circle btn-circle-alt-gray">
        <i className="fas fa-chevron-right"></i>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <div className="uds-table uds-table-fixed" tabIndex={0}>
      <Table columns={columns}/>
    </div>
  </div>
 )
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  columns: 3,
};

export const FixedTable = Template.bind({});
FixedTable.args = {
  fixed: true,
  columns: 11
};
