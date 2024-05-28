import React,{useState, useEffect} from 'react'
import CardList from './CardList.js'
import SearchBox from './SearchBox.jsx'
import {tests} from './Tests.js';

function Diagnosis() {

  const [searchfield, setSearchfield] = useState('')

  const onSearchChange=(e)=>{
    setSearchfield(e.target.value)
  }

 

  const filterRobots = tests.filter(robot=>{return robot.name.toLowerCase().includes(searchfield.toLowerCase())})
  return (
    <div className='mt-20'>
     
     <h1 className='text-center text-3xl lg:text-5xl font-bold'>Diagnosis</h1>
       <SearchBox searchChange={onSearchChange}/>
     
      <br/>
     <CardList tests={filterRobots}/> 
    </div>
  )  
}

export default Diagnosis
