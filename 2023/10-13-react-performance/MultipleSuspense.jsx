import React,{SuspenseList} from "react"
import RemoteCompA from "./RemoteCompA";
import RemoteCompB from "./RemoteCompB";
import RemoteCompC from "./RemoteCompC";

const CompA = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve({default: RemoteCompA}), 1000)
}))
const CompB = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve({default: RemoteCompB}), 1500)
}))
const CompC = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve({default: RemoteCompC}), 2000)
}))

const MultipleSuspense = () => {

  return (
    <div>
      <SuspenseList revealOrder="forwards">
        <Suspense fallback={'loading A Comp...'}>
          <CompA  />
        </Suspense>
        <Suspense fallback={'loading B Comp...'}>
          <CompB  />
        </Suspense>
        <Suspense fallback={'loading C comp...'}>
          <CompC  />
        </Suspense>
      </SuspenseList>
    </div>
  )
}

export default MultipleSuspense;
