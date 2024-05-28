import React from 'react'
import { FaSearch } from 'react-icons/fa';
const SearchBox = ({searchfield,searchChange}) => {
  return (
    <div className='m-2 flex 
    justify-center
    lg:justify-end'>
      <input 
      className='p-3 w-10/12 lg:w-3/12 border-2 border-black rounded-full' 
      type='search' 
      placeholder='Search Tests'
      onChange={searchChange}
      />
      <div className='bg-blue-600 relative  w-12 rounded-full  flex right-12 border-2 border-black flex justify-center items-center'>
      <FaSearch className='text-white  h-6 w-6'/>
      </div>
    </div>
  )
}

export default SearchBox
