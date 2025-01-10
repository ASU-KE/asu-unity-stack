import {
  Canvas,
  Controls,
  Description,
  DocsContainer,
  Heading,
  Subtitle,
  Source,
  Title,
} from '@storybook/blocks';

import { Badge } from '@storybook/components';
import renderToHTML from './renderToHTML.jsx'
import React from 'react';

import * as URC from '../src/index.js';

export const Container = ({ _, context, ...props }) => {
  // __docgenInfo is present when compiled with build-storybook
  // displayName is used with typescript files .tsx
  // name is used with javascript files .jsx
  const componentName = context.attachedCSFFile?.meta?.component?.__docgenInfo?.displayName ||
    context.attachedCSFFile?.meta?.component?.__docgenInfo?.name ||
    context.attachedCSFFile?.meta?.component?.displayName ||
    context.attachedCSFFile?.meta?.component?.name;
  const exportedTrue = typeof URC[componentName] !== "undefined";

  return <DocsContainer context={context} {...props}>
      <Title />
      <div><Badge status="neutral">Bootstrap HTML Example</Badge></div>
      {exportedTrue &&

          <div><Badge status="neutral">Available with Unity React Core</Badge></div>

    }
      <Subtitle />
      <Description />

      <Canvas layout="padded" sourceState="none" withToolbar={true}/>
      <Heading>Props</Heading>
      <Controls sort="requiredFirst" />

      <Heading>HTML</Heading>
      <Description>HTML example code</Description>
      <Source dark={true} transform={renderToHTML} />

      <Heading>Unity React Core</Heading>
      {
        exportedTrue ?
        <Source dark={true} /> :
        <Description>Not exported</Description>
      }
    </DocsContainer>;
};
