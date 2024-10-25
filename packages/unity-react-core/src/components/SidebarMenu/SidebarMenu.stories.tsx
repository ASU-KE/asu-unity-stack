import React from "react";
import { SidebarMenu } from "./SidebarMenu";

export default {
  title: "SidebarMenu",
  component: SidebarMenu,
};

const defaultProps = {
  title: "Header",
  children: "Content",
}

const sidebarMenuTemplate = args => <SidebarMenu {...args} />;

export const Overview = {
  render: sidebarMenuTemplate.bind({}),
  name: "Story 1",
  args: {
    ...defaultProps,
  }
};

export const Story2 = {
  render: args => {
    return <div>
        <SidebarMenu {...args} />
      </div>
  },
  args: {
    ...defaultProps,
    children: <p>paragraph</p>
  }
};
