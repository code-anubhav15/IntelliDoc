import React from 'react'
import Slider from './slider'
import Howitworks from './howitworks'
import Features from './features'
import Popup from '../PopupWindow/PopupWindow'
const url = 'http://localhost:3000/medibuddy';

function Home() {
  return (
   <div className="">
    <Slider />
    <div>
      <Popup className='Popup' url={url}/>
    </div>
    <Features />
  
   </div>
  )
}

export default Home
