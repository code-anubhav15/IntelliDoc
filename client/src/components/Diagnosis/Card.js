import React, { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Context } from '../..';

export default function CardThree({key,id,img,name,description,path}) {
  
  const {user, setUser,isAuthorized,setIsAuthorized}=useContext(Context);
  const Munna=()=>{
    
  }
  return (
    <div className="w-[260px] rounded-2xl border">
      <img
        src={img}
        alt="Laptop"
        className="h-[100px] w-full rounded-t-2xl object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {name} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          {description}
        </p>
        {/* <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Macbook
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Apple
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Laptop
          </span>
        </div> */}
        <Link to={path} onClick={()=>{!isAuthorized?toast.error("User Not Authorized"):Munna()}}> <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
         Test
        </button></Link> 
      </div>
    </div>
  )
}
