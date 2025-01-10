/**
 * This file houses all non-addon related decorators
 */
import { Decorator } from '@storybook/react';
import React, { useLayoutEffect, StrictMode } from 'react';

import { getBootstrapHTML } from '../src/components/GaEventWrapper/useBaseSpecificFramework';

declare global {
  interface Window {
    initDataLayer: () => void;
  }
}

const Full = ({ children, rootRef }) => (
  <div ref={rootRef} id="html-root" className="col uds-full-width">
    {children}
  </div>
);

const UdsContainer = ({ children, rootRef }) => (
  <div className="container">
    <div className="row">
      <div ref={rootRef} id="html-root" className="uds-container">
        {children}
      </div>
    </div>
  </div>
);

const StaticStory = ({args, Container, children, rootRef}) => {
  useLayoutEffect(() => {
    /**
     * Storybook only useId() will prefix the id with this identifier allowing
     * us to identify when the output is meant for bootstrap (non react)
    */
    rootRef.current.innerHTML = getBootstrapHTML(children);

    window.initDataLayer()
  }, [args]);
  return <Container rootRef={rootRef}></Container>;
}

export const withContainer: Decorator = (StoryFn, { args, globals:{ framework = "react" }, parameters: { layout = "fullscreen" } }) => {
  const root = React.useRef(null);

  let Container = Full;
  if (layout === "container") {
    Container = UdsContainer;
  }

  if (framework === 'bootstrap') {
    return <StrictMode>
        <StaticStory args={args} Container={Container} rootRef={root}><StoryFn/></StaticStory>
      </StrictMode>
  }

      return (
        <StrictMode>
          <Container rootRef={root}>
            <StoryFn />
          </Container>
        </StrictMode>
      );
}

// ordered from innermost to outermost, be careful with the order!
export const globalDecorators = [withContainer]
