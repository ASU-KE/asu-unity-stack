import React, { ReactElement } from "react";

3

export interface SidebarMenuProps {
  /**
   * Title or heading.
   */
  title?: string;
  /**
   * Custom prop.
   */
  customProp?: CustomPropType;
  /**
   * The element where we will position the dialog beside.
   */
  children: ReactElement | ReactElement[] | string;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  title = "Default Heading",
  customProp = CustomPropType.GR,
  children,
}) => {

  return (
    <div>
      {title}
      {customProp}
      {children}
    </div>
  );
};
