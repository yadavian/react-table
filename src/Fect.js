import React, { useEffect, useState } from 'react'

const Fect = () => {

  const [count, setcount] = useState(0)

  useEffect(() => {
    // const getData = async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    //     method: 'get'
    //   });
    //   const movies = await response.json();
    //   console.log('movies :>> ', movies);
    // }
    // getData();
    alert("ankit")
    return () => {
      alert("return")
    }
  }, [count])

  return (
    <>


      <button onClick={() => setcount(count + 1)}>Submit- {count}</button>

    </>
  )
}

export default Fect