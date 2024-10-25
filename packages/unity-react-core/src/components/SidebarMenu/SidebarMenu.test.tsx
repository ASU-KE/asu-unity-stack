import { render, cleanup, RenderResult } from "@testing-library/react";
import React from "react";
import { expect, describe, it, afterEach, beforeEach } from 'vitest';

import { CustomPropType, SidebarMenu, SidebarMenuProps } from "./SidebarMenu";

const defaultProps: SidebarMenuProps = {
  title: "Header",
  customProp: CustomPropType.GR,
  children: "Content",
};

const renderComponent = (props:SidebarMenuProps) => {
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
