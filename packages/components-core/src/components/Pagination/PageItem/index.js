// @ts-check
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

/**
 * @typedef {import('../../../core/types/shared-types').PageItemProps} PageItemProps
 */

/**
 * Generic page item component to render each pagination item
 * @param {PageItemProps} props
 * @ignore
 */
export const PageItem = ({
  dataId,
  isClickeable,
  disabled,
  pageLinkIcon,
  selectedPage,
  onClick,
  ellipses,
  children,
}) => {
  return (
    <li
      className={classNames("page-item", {
        [`disabled`]: disabled,
        [`active`]: selectedPage,
        [`elipses`]: ellipses,
      })}
    >
      {isClickeable ? (
        <button
          className={classNames("page-link", {
            [`page-link-icon`]: pageLinkIcon,
          })}
          type="button"
          onClick={onClick}
          data-testid="page-link"
          data-id={dataId}
        >
          {children}
          {selectedPage && <span className="sr-only">(current)</span>}
        </button>
      ) : (
        <span className="page-link" data-testid="page-link">
          {children}
        </span>
      )}
    </li>
  );
};

PageItem.propTypes = {
  isClickeable: PropTypes.bool,
  disabled: PropTypes.bool,
  pageLinkIcon: PropTypes.bool,
  selectedPage: PropTypes.bool,
  dataId: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  ellipses: PropTypes.bool,
};

PageItem.defaultProps = {
  isClickeable: false,
  disabled: false,
  pageLinkIcon: false,
  selectedPage: false,
  onClick: () => {},
};
