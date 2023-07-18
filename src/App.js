import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BiLastPage, BiFirstPage } from 'react-icons/bi';
import { useEffect, useState } from 'react';


function App() {

  const [rowSize, setRowSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [paginatedData, setPaginatedData] = useState([])
  const [inputPage, setInputPage] = useState(1)

  console.log(posts)

  useEffect(() => {
    fn_fetchPost()
  }, [])

  const fn_fetchPost = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setPosts(json);
        fn_paginate(json);
      })
  }

  const fn_paginate = (data) => {
    console.log('data', data)
    if (data.length > 0) {
      const startingIndexOfPage = ((currentPage * rowSize) - rowSize);
      const endingIndexOfPage = ((currentPage * rowSize) - 1) + 1;

      console.log(startingIndexOfPage, endingIndexOfPage)

      let data1 = []
      for (let i = startingIndexOfPage; i < endingIndexOfPage; i++) {
        data1.push(data[i])
      }

      console.log('data1', data1)
      setPaginatedData(data1)
    }
  }

  useEffect(() => {
    fn_paginate(posts)
  }, [currentPage, rowSize])





  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedData && paginatedData.map((d, i) => {
                return (
                  <>
                    {d?.id && <tr key={i}>
                      <td scope="row">{d?.id}</td>
                      <td>{d?.title}</td>
                    </tr>}
                  </>
                )
              })
            }


          </tbody>
        </table>
      </div>



      <div className=" col-md-12 w-100 d-flex" style={{ justifyContent: "space-between" }}>

        <div className='d-flex'>
          <select className="form-select" style={{ width: "100px" }} onChange={(e) => setRowSize(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>

          <input type='text' value={inputPage} onChange={(e) => setInputPage(e.target.value)}
            className='form-control'  style={{ width: "50px",marginLeft: "2rem",marginRight: "0.5rem"}} />
          <a className='btn btn-primary' onClick={() => setCurrentPage(inputPage)}>Go</a>
        </div>

        <div className="">
          <div className="btn-group" role="group" aria-label="Basic example">

            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "red", color: "white" }}
              disabled={currentPage == 1}
              onClick={() => currentPage > 1 && setCurrentPage(1)}><BiFirstPage /></button>
            <button
              type="button"
              className="btn"
              disabled={currentPage == 1}
              style={{ backgroundColor: "#036", color: "white" }}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}><IoIosArrowBack /></button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "orange", color: "white" }}
            >{currentPage} of {Math.ceil(posts.length / rowSize)}</button>
            <button
              type="button"
              className="btn"
              disabled={Math.ceil(posts.length / rowSize) == currentPage}
              style={{ backgroundColor: "#036", color: "white" }}
              onClick={() => currentPage < Math.ceil(posts.length / rowSize) && setCurrentPage(currentPage + 1)}>
              <IoIosArrowForward />
            </button>
            <button
              type="button"
              className="btn"
              disabled={Math.ceil(posts.length / rowSize) == currentPage}
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => currentPage < Math.ceil(posts.length / rowSize) && setCurrentPage(Math.ceil(posts.length / rowSize))}><BiLastPage />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
