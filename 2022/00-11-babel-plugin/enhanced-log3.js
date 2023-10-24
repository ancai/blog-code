/**
* enhanced log statement
* 2023-10-23 20:41:23
*/

// 后来我们觉得在同一行打印会影响原本的参数的展示，所以想改为在 console.xx 节点之前打印的方式
// 1. JSX 中的 console 代码不能简单的在前面插入一个节点，而要把整体替换成一个数组表达式，因为 JSX 中只支持写单个表达式。
// <div>{console.log(111)}</div>
// 要替换成数组的形式
// <div>{[console.log('filename.js(11,22)'), console.log(111)]}</div>

// 插入 AST 可以使用 path.insertBefore 的 api， 而替换整体节点用 path.replaceWith，
// 判断是 insertBefore 还是 replaceWith 要看当前节点是否在 JSXElement 之下，
// 所以要用path.findParent 方法顺着 path 查找是否有 JSXElement 节点。
// replace 的新节点要调用 path.skip 跳过后续遍历。

// if (path.findParent(path => path.isJSXElement())) {
//   path.replaceWith(types.arrayExpression([newNode, path.node]))
//   path.skip();// 跳过子节点处理
// } else {
//   path.insertBefore(newNode);
// }

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx'],
});

const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);
traverse(ast, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;

      if (path.findParent((path) => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  },
});

const { code, map } = generate(ast);
console.log(code);

// output:

// console.log("filename: (2, 4)")
// console.log(1);
// function func() {
//   console.log("filename: (5, 8)")
//   console.info(2);
// }
// export default class Clazz {
//   say() {
//     console.log("filename: (10, 12)")
//     console.debug(3);
//   }
//   render() {
//     return <div>{[console.log("filename: (13, 25)"), console.error(4)]}</div>;
//   }
// }
