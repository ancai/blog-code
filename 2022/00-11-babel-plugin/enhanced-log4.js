/* eslint-disable max-len */
/* eslint-disable no-console */
/**
* enhanced log statement
* 2023-10-23 20:41:23
*/

// 然后通过 @babel/core 的 transformSync 方法来调用 【enhanced-log4-plugin.js】

const { transformFileSync } = require('@babel/core');
const path = require('path');
const insertParametersPlugin = require('./enhanced-log4-plugin');

const { code } = transformFileSync(path.join(__dirname, './test/source-code.js'), {
  plugins: [insertParametersPlugin],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  },
});

console.log(code);

// output:

// console.log("/Users/ancai/code/study/snippets/packages/framework/babel/test/source-code.js: (6, 0)")
// /**
// * source-code for babel test
// * 2023-10-24 07:27:37
// */

// console.log(1);
// function func() {
//   console.log("/Users/ancai/code/study/snippets/packages/framework/babel/test/source-code.js: (9, 4)")
//   console.info(2);
// }
// export default class Clazz {
//   say() {
//     console.log("/Users/ancai/code/study/snippets/packages/framework/babel/test/source-code.js: (14, 8)")
//     console.debug(3);
//   }
//   render() {
//     return <div>{[console.log("/Users/ancai/code/study/snippets/packages/framework/babel/test/source-code.js: (17, 21)"), console.error(4)]}</div>;
//   }
// }
