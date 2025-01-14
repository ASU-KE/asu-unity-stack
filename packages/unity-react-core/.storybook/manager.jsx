import React from 'react';
import { addons } from '@storybook/manager-api';

addons.setConfig({
  sidebar: {
    renderLabel: (item) =>{
      return <div style={{fontSize: "1rem"}}>{item.name}</div>
    }
  },
});
