import { useEffect, useState } from "react"

const LongList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const ary = []
    for (let i = 0; i < 3000; i++) {
      ary.push(i);
    }
    setList(ary)
  }, [])

  return (
    <div>
      <ul>
        {
          list.map((num, index) => <li key={index}>{num}</li>)
        }
      </ul>
    </div>
  )
}

export default LongList;