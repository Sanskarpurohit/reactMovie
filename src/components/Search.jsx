import React from 'react'

const search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
        <img src="Vector.svg" alt="Search" srcSet="" />
        <input type="text"
        placeholder='Search through thousands of movies'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
        </div>



    </div>

  )
}

export default search