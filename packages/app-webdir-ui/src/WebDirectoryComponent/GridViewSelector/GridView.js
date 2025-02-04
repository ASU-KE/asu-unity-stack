import PropTypes from "prop-types";
import React from "react";

import { GridViewSelectorContainer } from "./GridView.styles";

const ViewSelector = ({ view, setView, label }) => {
  return (
    <GridViewSelectorContainer
      className="view-toggle"
      role="group"
      aria-label="View options"
    >
      <span className="view-label" id="view-label">
        {label}
      </span>
      <div className="view-buttons" role="toolbar" aria-labelledby="view-label">
        <button
          className={`view-button ${view ? "active" : ""}`}
          aria-label="Grid view"
          type="button"
          onClick={() => setView(true)}
          aria-pressed={view}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <rect x="1" y="1" width="6" height="6" rx="2" />
            <rect x="9" y="1" width="6" height="6" rx="2" />
            <rect x="17" y="1" width="6" height="6" rx="2" />

            <rect x="1" y="9" width="6" height="6" rx="2" />
            <rect x="9" y="9" width="6" height="6" rx="2" />
            <rect x="17" y="9" width="6" height="6" rx="2" />

            <rect x="1" y="17" width="6" height="6" rx="2" />
            <rect x="9" y="17" width="6" height="6" rx="2" />
            <rect x="17" y="17" width="6" height="6" rx="2" />
          </svg>
        </button>
        <button
          className={`view-button ${!view ? "active" : ""}`}
          aria-label="List view"
          type="button"
          onClick={() => setView(false)}
          aria-pressed={!view}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <rect x="2" y="1" width="6" height="6" rx="2" />
            <rect x="11" y="2" width="14" height="4.5" rx="3" />

            <rect x="2" y="9" width="6" height="6" rx="2" />
            <rect x="11" y="10" width="14" height="4.5" rx="3" />

            <rect x="2" y="17" width="6" height="6" rx="2" />
            <rect x="11" y="18" width="14" height="4.5" rx="3" />
          </svg>
        </button>
      </div>
    </GridViewSelectorContainer>
  );
};

ViewSelector.propTypes = {
  view: PropTypes.bool,
  setView: PropTypes.func,
  label: PropTypes.string,
};

export { ViewSelector };
