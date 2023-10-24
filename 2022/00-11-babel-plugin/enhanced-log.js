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

    export default class Student {
        sayHi() {
            console.debug('hello...');
        }
        learn() {
          console.error('I am learning ....')
        }
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'module',
});

traverse(ast, {
  CallExpression(path, state) {
    if (types.isMemberExpression(path.node.callee)
      && path.node.callee.object.name === 'console'
      && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
    ) {
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
