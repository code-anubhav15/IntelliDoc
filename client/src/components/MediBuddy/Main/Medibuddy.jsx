import React from 'react'
import Sidebar from './Sidebar/Sidebar.jsx';
import Main from './Main.jsx';
import ContextProvider from './context/context.jsx';

const Medibuddy = () => {
  return (
    <ContextProvider>
    <div className='body'>
      <Sidebar/>
      <Main/>
      </div>
    </ContextProvider>
  )
}

export default Medibuddy
