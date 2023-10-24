/* eslint-disable func-names */
/**
* enhanced log statement
* 2023-10-23 20:41:23
*/

// 改造成 plugin 插件
// 上面完成的功能想要复用就得封装成插件的形式，babel 支持 transform 插件，形式是函数返回一个对象，对象有 visitor 属性。
// module.exports = function(api, options) {
//   return {
//     visitor: {
//       Identifier(path, state) {},
//     },
//   };
// }

// 第一个参数可以拿到 types、template 等常用包的 api，不需要单独引入这些包。

// 作为插件用的时候，并不需要自己调用 parse、traverse、generate，只需要提供一个 visitor 函数，在这个函数内完成转换功能。

// state 中可以拿到用户配置信息 options 和 file 信息，filename 就可以通过 state.filename 来取。

// 前面的代码很容易可以改造成插件：

const generate = require('@babel/generator').default;

const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);
module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;
          const newNode = template.expression(`console.log("${state.filename || 'unkown filename'}: (${line}, ${column})")`)();
          newNode.isNew = true;

          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};

// 在  【enhanced-log4.js】 启动调用
