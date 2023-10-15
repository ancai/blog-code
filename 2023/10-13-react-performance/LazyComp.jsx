import { lazy, Suspense } from "react"

// const About = lazy(() => delayForComp(import('./MockRemoteComp')))
import MockRemoteComp from "./MockRemoteComp"

const RemoteComp = lazy(MockRemoteComp)

const LazyComp  = () => {
  return (
    <div>
      <p>test load a remote lazy component</p>
      <Suspense
        fallback={<div> loading comp ... </div>}
      >
        <RemoteComp />
      </Suspense>
    </div>
  )
}

export default LazyComp;