import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import { Toggle } from '../../../../.storybook-config/Toggle'

addons.register('local-addon', (api) => {
  addons.add('local-addon/panel', {
    title: 'Javascript',
    //👇 Sets the type of UI element in Storybook
    type: types.PANEL,
    paramKey: 'initFunc',
    render: ({active, key}) => {

      return(
        <AddonPanel key={key} active={!!active}>
          <div style={{ padding: '20px', fontSize: '1rem'}}>

          This component requires Javascript. <br/><br/>

          <a href="./index.html?path=/docs/get-started-get-started--docs#-including-unity-in-your-project">View the documentation</a>{" "}on how to use the component in your project.

          </div>
        </AddonPanel>
    )},
  });

  addons.add('local-addon/tools', {
    title: 'tools',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (
      <>
        <Toggle global="header">Header</Toggle>
        <Toggle global="footer">Footer</Toggle>
      </>
    )
  });
});

