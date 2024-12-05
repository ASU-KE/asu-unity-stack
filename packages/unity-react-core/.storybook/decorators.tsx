/**
 * This file houses all non-addon related decorators
 */
import { Decorator } from '@storybook/react';
import React, { useEffect, forwardRef, useLayoutEffect, StrictMode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { identifierPrefix } from '../../../shared/hooks/useBaseSpecificFramework';

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

    rootRef.current.innerHTML = renderToStaticMarkup(children, { identifierPrefix: identifierPrefix });
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
