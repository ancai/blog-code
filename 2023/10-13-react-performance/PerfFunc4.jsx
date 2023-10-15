/**
 * useCallback
 */

import React, { useState, useCallback } from "react"

const ChildA = React.memo(({msgA, changeMsgA}) => {
  const [countA, setCountA] = useState(0);

  console.log('ChildA is rendering...');
  return (
    <div>
      <p>
        ChildA count: {countA}
        <button onClick={() => setCountA(countA + 1)}>+</button>
      </p>
      <p>
        ChildA msgA: {msgA}
        <button onClick={() => changeMsgA('child-A changed...')}>changeMsgA</button>
      </p>
    </div>
  )
})

const ChildB = React.memo(({msgB, changeMsgB}) => {
  const [countB, setCountB] = useState(0);

  console.log('ChildB is rendering...');
  return (
    <div>
      <p>
        ChildB count: {countB}
        <button onClick={() => setCountB(countB + 1)}>+</button>
      </p>
      <p>
        ChildB msgB: {msgB}
        <button onClick={() => changeMsgB('child-B changed...')}>changeMsgB</button>
      </p>
    </div>
  )
})

const Parent = () => {
  const [messageA, setMsgA] = useState(Date.now())
  const [messageB, setMsgB] = useState(Date.now())

  const changeMessageA = useCallback((msg) => setMsgA(msg), []);
  const changeMessageB = useCallback((msg) => setMsgB(msg), []);

  console.log('Parent is rendering ...');
  return (
    <div>
      <h2>test react rendering...</h2>
      <ChildA msgA={messageA} changeMsgA = {changeMessageA}/>
      <ChildB msgB={messageB} changeMsgB = {changeMessageB}/>
      <section>
        <button onClick={() => setMsgA(Date.now())}>changeChildA</button>
        <button onClick={() => setMsgB(Date.now())}>changeChildB</button>
      </section>
    </div>
  )
}

export default Parent;