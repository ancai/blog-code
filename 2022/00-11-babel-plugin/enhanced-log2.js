/**
* enhanced log statement
* 2023-10-23 20:41:23
*/

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

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

// 现在判断条件比较复杂，要先判断 path.node.callee 的类型，然后一层层取属性来判断，其实我们可以用 generator 模块来简化.
// traverse(ast, {
//   CallExpression(path, state) {
//     if (types.isMemberExpression(path.node.callee)
//       && path.node.callee.object.name === 'console'
//       && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
//     ) {
//       const { line, column } = path.node.loc.start;
//       path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`));
//     }
//   },
// });

const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);
traverse(ast, {
  CallExpression(path, state) {
    const calleeName = generate(path.node.callee).code;
    // console.log(path.get('callee').toString());
    // console.log('calleeName: ', calleeName);
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`));
    }
  },
});

const { code, map } = generate(ast);
console.log(code);

// output:

// console.log("filename: (2, 4)", 1);
// function func() {
//   console.info("filename: (5, 8)", 2);
// }
// export default class Clazz {
//   say() {
//     console.debug("filename: (10, 12)", 3);
//   }
//   render() {
//     return <div>{console.error("filename: (13, 25)", 4)}</div>;
//   }
// }
