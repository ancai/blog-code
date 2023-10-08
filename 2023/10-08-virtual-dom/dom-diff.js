/* eslint-disable */
/**
* DOM diff procedure
* 2023-09-30 18:40:50
*/

// 最终Diff出来的结果如下

const diffResult = {
  1: [{ type: REPLACE, node: Element }],
  4: [{ type: TEXT, content: 'after update' }],
  5: [{ type: PROPS, props: { class: 'marginLeft10' } }, { type: REORDER, moves: [{ index: 2, type: 0 }] }],
  6: [{ type: REORDER, moves: [{ index: 2, type: 0 }] }],
  8: [{ type: REORDER, moves: [{ index: 2, type: 0 }] }],
  9: [{ type: TEXT, content: 'Item 3' }],
};

// #四、映射成真实DOM
// 虚拟DOM有了，Diff也有了，现在就可以将Diff应用到真实DOM上了
// 深度遍历DOM将Diff的内容更新进去

function dfsWalk(node, walker, patches) {
  const currentPatches = patches[walker.index];

  const len = node.childNodes ? node.childNodes.length : 0;
  for (let i = 0; i < len; i++) {
    walker.index++;
    dfsWalk(node.childNodes[i], walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

// 具体更新的代码如下，其实就是根据Diff信息调用源生API操作DOM

function applyPatches(node, currentPatches) {
  currentPatches.forEach((currentPatch) => {
    switch (currentPatch.type) {
      case REPLACE: {
        const newNode = (typeof currentPatch.node === 'string')
          ? document.createTextNode(currentPatch.node)
          : currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
        break;
      }
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          // ie
          node.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error(`Unknown patch type ${currentPatch.type}`);
    }
  });
}
