import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { UpdateClose, UpdateMessage, UpdateRole } from './slice';
import cross from './assets/cross.png'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
export default function Validation() {
    let backend='http://localhost:8000';
   let dispatch= useDispatch();
let [valid,Setvalid]=useState({
    Uemail:'',
    Upass:''
})
const handleValid=(e)=>{
let prod={...valid};
prod[e.target.name]=e.target.value;
Setvalid(prod)
}

const handleSubmit=async(e)=>{
 e.preventDefault();
if(valid.Upass.length>10||valid.Upass.length<5){
    return toast.error('Password should be minimum of 5 characters and maximum of 8 characters')
}
if(!valid.Uemail.includes('@')||valid.Uemail==''){
    return toast.error('Email Can not be empty or wrong type')
}

let res=await fetch(`${backend}/user/Validate`,{
    method:'POST',
    headers:{
         "Content-Type": "application/json"
    },
    body:JSON.stringify(valid)
})

let data=await res.json();
dispatch((UpdateMessage(data.message)))
if(data.message=='Submitted'){
    toast.success('Login Succesfully')
    dispatch(UpdateClose(true)) 
}
else{
    toast.error('Wrong Credentials')
  dispatch(UpdateRole('👁️ User')) 
  dispatch(UpdateClose(true)) 
}

Setvalid({
    Uemail:'',
    Upass:''
})
}


  return (
    <>
    <div className='fixed w-5/6 top-0 bottom-0 max-md:w-full  flex justify-center backdrop-blur-sm items-center'>
<div className='w-3/6 max-md:w-5/6 border ml-4 flex flex-col rounded-xl px-3 gap-3 py-7 bg-[#020618] text-white'>
<img className='w-5 self-center max-lg:w-6  cursor-pointer' src={cross} onClick={()=>dispatch(UpdateClose(true)) }/>
        <h1 className='text-xl text-center font-medium text-slate-400'>Admin Credentials To Make Update In Data</h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-starts gap-5 mt-5'>
            <div className='flex flex-col gap-2 items-center'>
                <label className='text-lg font-medium'>Enter Your Email:</label>
                <input className='w-5/6 rounded-xl p-1 bg-slate-800 focus:bg-bg-slate-800 focus:outline-0' type="email" name='Uemail' value={valid.Uemail} onChange={handleValid}/>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                 <label className='text-lg font-medium'>Enter Your Password:</label>
                <input className='w-5/6 rounded-xl p-1 bg-slate-800 focus:bg-bg-slate-800 focus:outline-0'  type="password" name='Upass' value={valid.Upass} onChange={handleValid}/>
            </div>
            <div className='flex gap-2 w-full justify-center'>
<input className='w-2/6  p-1 rounded-xl font-medium bg-green-700 cursor-pointer' type="submit" value='Submit'/>
<input className='w-2/6  p-1 rounded-xl font-medium bg-red-800 cursor-pointer' type="reset" value={'Reset'}/>
            </div>
            
        </form>
        
      </div>
    </div>
      
</>
  )
}
