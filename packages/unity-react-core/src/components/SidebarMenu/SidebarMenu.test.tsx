import { render, cleanup, RenderResult } from "@testing-library/react";
import React from "react";
import { expect, describe, it, afterEach, beforeEach } from 'vitest';

import { SidebarMenu, SidebarProps } from "./SidebarMenu";

const defaultProps: SidebarProps = {
  title: "Header",
  links: [
    {
      href: "#",
      text: "Link 1",
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
};

const renderComponent = (props:SidebarProps) => {
  return render(<SidebarMenu {...props} />);
};

describe("SidebarMenu tests", () => {
  let component:RenderResult;

  beforeEach(() => {
    component = renderComponent(defaultProps);
  });

  afterEach(cleanup);

  it("should define component", () => {
    expect(component).toBeDefined();
  });
});
