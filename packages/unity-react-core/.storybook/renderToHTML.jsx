
import { decode } from 'html-entities'
import prettier from 'prettier'
import HTMLParser from 'prettier/parser-html'

import { getBootstrapHTML } from '../src/components/GaEventWrapper/useBaseSpecificFramework.js';

export default (_, storyContext = {}) => {
  // console.log(_, storyContext)
  const { args = {}, component } = storyContext;
  let code = "";
  code = getBootstrapHTML(component(args));
  let result = prettier.format(decode(code,{level:"all"}), {
    parser: 'html',
    plugins: [HTMLParser],
  });
  return result
}
