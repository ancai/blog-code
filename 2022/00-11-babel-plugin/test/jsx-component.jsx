/**
* JSX element
* 2023-09-30 19:38:27
*/

import React from 'react';

function TestComponent() {
  return <p> hello,React </p>;
}

function Index() {
  return <div>
        <span>模拟 babel 处理 jsx 流程。</span>
        <TestComponent />
    </div>;
}
export default Index;
