import React from 'react'

export default function Pagination() {

    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(); i++)
    pageNumbers.push(i)

  return (
    <nav>
        {pageNumbers.length === 1 ?
        <div></div>:
            (pageNumbers.map(num => {
                return(
                    <div key={num}>
                        <button onClick={() => pagination(num)}>{num}</button>
                    </div>
                )
            }))
        }
    </nav>
  )
}

