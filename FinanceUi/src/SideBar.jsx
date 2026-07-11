import React, { useState } from 'react'
import img1 from './assets/bolt64.png'
import { Link } from 'react-router-dom'
import overview from './assets/overview.png'
import transaction from './assets/transaction.png'
import bulb from './assets/bulb.png'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateClick, UpdateRole } from './slice'
export default function SideBar() {
let dispatch=useDispatch();
 let click=useSelector((state)=>state.First.click); 
 let message=useSelector((state)=>state.First.Message);
 let role=useSelector((state)=>state.First.Role); 
 const handleOption=(e)=>{
 dispatch(UpdateRole(e.target.value))
 }

  return (
    <div>
      <div className='w-1/6 max-md:hidden fixed min-h-screen border border-l-0 border-t-0 border-slate-800 bg-[#020618]'>
      <div className='flex w-full border border-l-0  border-slate-800 items-center p-2'>
          <img src={img1} alt="" className='max-lg:w-10'/>
          <div>
              <p className='font-bold max-lg:text-sm text-white'>Zorvyn</p>
              <p className='text-xs text-gray-400'>FINTECH</p>
          </div>
      </div>
      <div className='text-white p-2 flex flex-col gap-4'>
      <p className='text-xs font-bold text-gray-400 ml-4 mt-5'>NAVIGATION</p>
      <Link to={'/Overview'}>
      <div className={`border ${click?'':'bg-[#8E51FF] text-white border-0'} flex items-center gap-2 p-2 rounded-xl`} onClick={()=>dispatch(UpdateClick(false))}>
          <img className='w-8 h-8 max-lg:w-5 max-lg:h-5' src={overview} alt="" />
      <p className='max-lg:text-sm'>Overview</p> 
      </div>
      </Link>
      <Link to={'/'}>
      <div className={`border ${click?'bg-[#8E51FF] text-white border-0':''}  flex items-center gap-2 p-2 rounded-xl`} onClick={()=>dispatch(UpdateClick(true))}>
          <img className='w-8 h-8 max-lg:w-5 max-lg:h-5' src={transaction} alt="" />
      <p className='max-lg:text-sm'>Transaction</p> 
      </div>
      </Link>
      
      {/* <div className='border flex items-center gap-2 p-2 rounded-xl'>
          <img className='w-8 h-8' src={bulb} alt="" />
      <p>Insights</p> 
      </div> */}
      
      </div>
      <div className="flex flex-col absolute w-full bottom-5 border-l-0 border border-b-0 border-slate-800 p-2 items-center gap-3 items-start">
        <p className='text-gray-400 max-lg:text-sm'>ROLE</p>  
      <select name="role" className='text-white max-lg:text-sm cursor-pointer w-full rounded-xl bg-slate-800 p-2 focus:outline-none' onChange={handleOption}>
          <option  className='text-white bg-blue-500 hover:bg-blue-500' value="👑 Admin" selected={role=='👑 Admin'?true:false} >👑 Admin</option>
           <option className='text-white bg-blue-500' value="👁️ User" selected={role=='👁️ User'?true:false} >👁️ User</option>
      </select>
      </div>
      <div>
      
      </div>
      </div>

      <div className='w-full fixed min-md:hidden flex justify-around bottom-0 z-99 p-2 items-center  bg-[#030618]'>
         <Link to={'/Overview'}>
      <div className={`border ${click?'':'bg-[#8E51FF] text-white border-0'} flex px-4 py-1  flex-col items-center rounded-xl`} onClick={()=>dispatch(UpdateClick(false))}>
          <img className='w-8 h-8 max-lg:w-5 max-lg:h-5' src={overview} alt="" />
      <p className='max-lg:text-sm text-white'>Overview</p> 
      </div>
      </Link>
        <Link to={'/'}>
      <div className={`border ${click?'bg-[#8E51FF] text-white border-0':''}  flex flex-col px-4 py-1 items-center rounded-xl`} onClick={()=>dispatch(UpdateClick(true))}>
          <img className='w-8 h-8 max-lg:w-5 max-lg:h-5' src={transaction} alt="" />
      <p className='max-lg:text-sm text-white'>Transaction</p> 
      </div>
      </Link>
      </div>
    </div>
  )
}
