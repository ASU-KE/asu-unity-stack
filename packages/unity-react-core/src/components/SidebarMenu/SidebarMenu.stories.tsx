import React from "react";
import { SidebarMenu } from "./SidebarMenu";

export default {
  title: "SidebarMenu",
  component: SidebarMenu,
};

const defaultProps = {
  title: "Header",
  links: [
    {
      href: "#",
      text: "Link 1",
      isActive: true,
    },
    {
      text: "Link 2 dropdown",
      items: [
        {
          href: "#",
          text: "Link 2.1",
        },
        {
          href: "#",
          text: "Link 2.2",
        },
      ],
    }
  ]
}

const sidebarMenuTemplate = args => <div className="container">
<SidebarMenu {...args} />
</div>;

export const Overview = {
  render: sidebarMenuTemplate.bind({}),
  name: "Story 1",
  args: {
    ...defaultProps,
  }
};

export const Story2 = {
  render: args => {
    return <div className="container">
        <SidebarMenu {...args} />
      </div>
  },
  args: {
    ...defaultProps,
    children: <p>paragraph</p>
  }
};
