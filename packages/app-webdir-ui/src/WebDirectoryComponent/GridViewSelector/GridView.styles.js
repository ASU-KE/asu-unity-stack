import styled from "styled-components";

export const GridViewSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;

  .view-label {
    font-size: 1rem;
    color: #333;
    padding-right: 0.5rem;
  }

  .view-buttons {
    display: flex;
  }

  .view-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    svg rect {
      fill: #bfbfbf;
    }
  }

  .view-button:hover {
    color: #333;
  }

  .view-button:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .view-button.active {
    svg rect {
      fill: #191919;
    }
  }

  .view-button svg {
    width: 22px;
    height: 22px;
  }

  @media (forced-colors: active) {
    .view-button {
      border: 1px solid currentColor;
    }
    .view-button.active {
      color: HighlightText;
    }
  }
`;
