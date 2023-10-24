/* eslint-disable no-console */
/**
* babel process react JSX syntax
* 2023-09-30 19:38:49
*/

const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');

const jsxCode = fs.readFileSync(path.resolve(__dirname, './test/jsx-component.jsx'), { encoding: 'utf-8' });

const result = babel.transformSync(jsxCode, {
  plugins: ['@babel/plugin-transform-react-jsx'],
});

console.log('transform result : ', result);
fs.writeFileSync(path.resolve(__dirname, './test/jsx-component.js'), result.code);
