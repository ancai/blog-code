/* eslint-disable  */
export default function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        default: () => <div>this is a remote component</div>
      })
    }, 1000);
  })
}


// export default function MockRemoteComp({ markdown }) {
//   return (
//     <div>this is a remote component</div>
//   );
// }
