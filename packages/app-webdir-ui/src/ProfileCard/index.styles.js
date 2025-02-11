// @ts-check
import styled from "styled-components";

const ProfileCardLayout = styled.div`
  padding: 4px;
  .person-name {
    display: block;
    font-weight: bold;
  }
  ul.person-contact-info [class*="fa-"] {
    display: none;
  }
  &.uds-grid-profile {
    ul.person-contact-info [class*="fa-"] {
      display: inline;
      color: #8c1d40;
      padding-right: 8px;
    }
  }
`;

export { ProfileCardLayout };
