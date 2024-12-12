// @ts-check
import styled from "styled-components";

const ProfileCardLayout = styled.div`
  padding: 4px;
  .person-name {
    display: block;
    font-weight: bold;
  }
  .fas {
    display: none;
  }
  &.uds-grid-profile {
  .fas {
    display: inline;
    color: #8C1D40;
    padding-right: 8px;
  }
}
`;

export { ProfileCardLayout };
