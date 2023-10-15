import { useState } from "react"

const ChildA = ({msgA}) => {
  const [countA, setCountA] = useState(0);

  console.log('ChildA is rendering...');
  return (
    <div>
      <p>
        ChildA count: {countA}
        <button onClick={() => setCountA(countA + 1)}>+</button>
      </p>
      <p>ChildA msgA: {msgA}</p>
    </div>
  )
}

const ChildB = ({msgB}) => {
  const [countB, setCountB] = useState(0);

  console.log('ChildB is rendering...');
  return (
    <div>
      <p>
        ChildB count: {countB}
        <button onClick={() => setCountB(countB + 1)}>+</button>
      </p>
      <p>ChildB msgB: {msgB}</p>
    </div>
  )
}

const Parent = () => {
  const [messageA, setMsgA] = useState(Date.now())
  const [messageB, setMsgB] = useState(Date.now())

  console.log('Parent is rendering ...');
  return (
    <div>
      <h2>test react rendering...</h2>
      <ChildA msgA={messageA} />
      <ChildB msgB={messageB} />
      <section>
        <button onClick={() => setMsgA(Date.now())}>changeChildA</button>
        <button onClick={() => setMsgB(Date.now())}>changeChildB</button>
      </section>
    </div>
  )
}

export default Parent;