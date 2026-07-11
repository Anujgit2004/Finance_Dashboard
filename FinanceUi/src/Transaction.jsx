import img1 from './assets/bolt64.png'
import mode from './assets/mode.png'
import search from './assets/search.png'
import filter from './assets/filter.png'
import Edit from './assets/Edit.png'
import sorting from './assets/sorting.png'
import uparrow from './assets/Uparrow.png'
import downarrow from './assets/downarrow.png'
import overview from './assets/overview.png'
import { Toaster } from 'react-hot-toast';
import bulb from './assets/bulb.png'
import transaction from './assets/transaction.png'
import cross from './assets/cross.png'
import loading from './assets/loading.gif'
import deletes from './assets/delete.png'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeType, UpdateArray, UpdateClose, UpdateExpense, UpdateIncome, UpdateMessage, UpdateRole } from './slice'
import SideBar from './SideBar'
import { ReducerType } from '@reduxjs/toolkit'
import Validation from './Validation'
export function Transaction(){
let dispatch=useDispatch()
let[click,setclick]=useState(true)
let[Uclick,setUclick]=useState(true)
let [Types,setType]=useState('Expense')
let [Tdata,SetTdata]=useState([])
let [Sdata,SetSdata]=useState([])
let [Uid,SetUid]=useState('');
let [lock,setlock]=useState(false)
let [sort,setsort]=useState(true)
let [Open,Setopen]=useState(true)
let [load,setload]=useState(true)
let[arr,setarr]=useState([])
let [count,setcount]=useState(1);

   let role=useSelector((state)=>state.First.Role);
let message=useSelector((state)=>state.First.Message);
let close=useSelector((state)=>state.First.close);
let [data,setdata]=useState({
Type:'Expense',
Description:'',
Amount:'',
Dates:'',
Category:'Food&Dining'   
})


let[filterD,SetFilter]=useState({
Type:'',
Category:'',
FDate:'',
ToDate:''  
})


const handleinput=(e)=>{
let prod={...data}
let value=e.target.value;
let name=e.target.name;
prod[name]=value;
setdata(prod);
}

//Fetch Data
useEffect(()=>{
callmethod()
},[sort])

//Fetch Data
const callmethod=async()=>{
   if(sort){
    let res=await fetch('http://localhost:8000/user/findDsc');
let data=await res.json();
SetSdata(data)
clearFields()
   }
   else{
let res=await fetch('http://localhost:8000/user/find');
let data=await res.json();
SetSdata(data)
clearFields()
   }

}







//data added function
const handlesumbmit=async(e)=>{
    e.preventDefault();
    setload(false)
  let response= await fetch('http://localhost:8000/user/update',{
    method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
    body:JSON.stringify(data)
})
setTimeout(async() => {
let res=await fetch('http://localhost:8000/user/findDsc');
let data=await res.json();
SetSdata(data)
clearFields()
toast.success('data added')
setload(true)
},100);
}

let clearFields=()=>{
setdata({
 Type:'Expense',
Description:'',
Amount:'',
Dates:'',
Category:'Food&Dining'    
})


setType('Expense')
}

//Delete Data
const DoDelete=async(ids)=>{
  let Value=  confirm('Do You Want To Delete This Data')
  if(Value){
let response=await fetch(`http://localhost:8000/user/Delete?id=${ids}`,{
    method:'DELETE'
});

(response.statusText=='OK')?toast.success('Item deleted'):toast.error('not deleted');
await callmethod()
  SetFilter({
      Type:'',
Category:'',
FDate:'',
ToDate:''   
    })
  }

}



const handleinput2=async(e)=>{
let name=e.target.value;
let data=await fetch(`http://localhost:8000/user/Search?name=${name}`)
let searchData=await data.json();
SetSdata(searchData)
}


//fetching data filter
const handlefilter=async(e)=>{
    let prod={...filterD}
let name=e.target.name;
let value=e.target.value;
prod[name]=value;
SetFilter(prod)
}

useEffect(()=>{
fetch('http://localhost:8000/user/filter',{
    method:'POST',
     headers: {
        "Content-Type": "application/json"
      },
    body:JSON.stringify(filterD)
}).then((res)=>res.json()).then((data)=>SetSdata(data)).catch((err)=>console.log(err))
},[filterD])


//Reset Filter
const handlereset=()=>{
    SetFilter({
      Type:'',
Category:'',
FDate:'',
ToDate:''   
    })

}



const total = Sdata.reduce((sum, transaction) => sum + transaction.Amount, 0);

let Income=Sdata.filter((v,i)=>v.Type!='Expense')
const Income_amount=Income.reduce((sum, transaction) => sum + transaction.Amount, 0)

let Expense=Sdata.filter((v,i)=>v.Type!='Income')
const Expense_amount=Expense.reduce((sum, transaction) => sum + transaction.Amount, 0)

// useEffect(()=>{
//     highSpend()
// },[])


const HighExpense = [...Expense].sort((a, b) => b.Amount - a.Amount).slice(0,5||Expense.length);
useEffect(()=>{
dispatch(UpdateIncome(Income_amount));
dispatch(UpdateExpense(Expense_amount));
dispatch(UpdateArray(HighExpense));
},[Income_amount,Expense_amount,HighExpense])


const DoUpdate=(id)=>{
    SetUid(id)
let ToUpdate=Sdata.filter((v,i)=>v._id==id);
setdata({
  Type:ToUpdate[0].Type,
Description:ToUpdate[0].Description,
Amount:ToUpdate[0].Amount,
Dates:ToUpdate[0].Dates,
Category:ToUpdate[0].Category   
})
setType(ToUpdate[0].Type)
setUclick(false)
}


const handleUpdate=async()=>{
 let res=  await fetch(`http://localhost:8000/user/Update?ID=${Uid}`,{
       method:'PUT',
         headers: {
        "Content-Type": "application/json"
      },
    body:JSON.stringify(data)
    })
    setTimeout(async() => {
let res=await fetch('http://localhost:8000/user/findDsc');
let data=await res.json();
SetSdata(data)
clearFields()
toast.success('data updated')
setload(true)
},100);
}



const handleOption=(e)=>{
dispatch(UpdateRole(e.target.value));
}

if(role=='👁️ User'){
 dispatch(UpdateClose(false)); 
 dispatch(UpdateMessage(''));  
}

if(close==true&&message!='Submitted'){
    dispatch(UpdateRole('👁️ User'))
}


return(
<>
<Toaster position="top-center" reverseOrder={false} />
<div className='flex'>
<SideBar></SideBar>
    <div className='transUi absolute right-0 w-5/6 min-h-screen max-md:w-full flex flex-col bg-[#020618]'>
    {(role=='👑 Admin'&&close==false)?
    <Validation></Validation>:<></>}
    
 <div className='trans-nav w-full flex justify-between p-2 border-b-1 border-slate-700 items-center'>
    <div className="left">
<h1 className='font-bold text-sm max-lg:text-xs text-white'>All Transaction</h1>
<h2 className='text-xs text-slate-400'>Browse, filter and manage your records</h2>
    </div>
<div className="right flex items-center gap-3 justify-between">
<select name="role" className='text-white max-lg:text-sm cursor-pointer rounded-xl bg-slate-800 p-2 max-lg:p-1 focus:outline-none' onChange={handleOption}>
    <option  className='text-white bg-blue-500 hover:bg-blue-500' value="👑 Admin" selected={(role=='👑 Admin')?true:false}>👑 Admin</option>
     <option className='text-white bg-blue-500' value="👁️ User" selected={role=='👁️ User'?true:false} >👁️ User</option>
</select>
<img className='w-8 max-lg:w-5 max-sm:hidden' src={mode}></img>
</div>
</div> 

<div className={`fixed w-5/6 top-0 bottom-0 max-md:w-full  flex justify-center backdrop-blur-sm items-center ${(click)?'hidden':''}`}>
<div className='Trans-from w-2/6 max-xl:w-3/6 max-sm:w-5/6 z-50 p-4 rounded-xl flex flex-col gap-4 max-lg:gap-2 bg-slate-700'>
<div className='flex justify-between items-center'>
    <h1 className='text-xl max-lg:text-lg max-sm:text-sm  font-medium text-slate-300'>Add Transaction</h1>
<img className='w-10 max-lg:w-6 cursor-pointer' src={cross} onClick={()=>setclick(true)+clearFields()}/>
</div>

<div className='flex justify-between gap-4'>
    <button className={`w-3/6 rounded-xl max-lg:text-sm max-sm:text-xs  p-2 cursor-pointer font-medium ${Types=='Expense'?'bg-red-500':'bg-slate-500'} text-white`} onClick={()=>{data.Type='Expense',setType('Expense')}}>Expense</button>
    <button className={`w-3/6 text-white max-lg:text-sm max-sm:text-xs  cursor-pointer rounded-xl p-2 font-medium ${Types=='Income'?'bg-green-500':'bg-slate-500'}`} onClick={()=>{data.Type='Income',setType('Income')}}>Income</button>
</div>
    <form className='flex flex-col gap-3 max-lg:gap-2'>
        <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs '>DESCRIPTION</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm  focus:outline-purple-500 bg-slate-500' onChange={handleinput} name='Description' value={data.Description} type="text" placeholder=' e.g. Monthly Salary'/>
        </div>
      
      <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs '>AMOUNT ($)</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm  focus:outline-purple-500 bg-slate-500' onChange={handleinput} name='Amount' value={data.Amount} type="number" placeholder='0.00'/>
    </div>

    <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs '>DATE</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm  focus:outline-purple-500 bg-slate-500 text-slate-300' onChange={handleinput} name='Dates' value={data.Dates} type="Date"/>
        </div>

        <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs '>CATEGORY</label>
       <select className='focus:outline-3 rounded-xl p-2 max-sm:text-sm  focus:outline-purple-500 bg-slate-500 text-slate-300' onChange={handleinput} value={data.Category} name="Category">
        <option value="Food&Dining" selected>Food&Dining</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Shopping">Shopping</option>
        <option value="Salary">Salary</option>
        <option value="Investement">Investement</option>
        <option value="Freelance">Freelance</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Others">Others</option>
       </select>
        </div>
    </form>

    <div className='flex gap-4 justify-between mt-2'>
            <button className='w-3/6 border hover:bg-orange-500 max-lg:text-sm max-sm:text-xs   cursor-pointer rounded-xl p-2 font-medium text-white' onClick={clearFields}>Cancel</button>
            {
                (load)?
                 <button className='w-3/6 cursor-pointer max-lg:text-sm max-sm:text-xs   rounded-xl p-2 font-medium bg-purple-500 text-white' onClick={handlesumbmit}> 
    Add Transaction</button>:
    <img src={loading} alt="" width={'50px'}/>
            }
           

    </div>
</div>
</div>

<div className={`fixed w-5/6 top-0 bottom-0 max-md:w-full max-md:bottom-5  flex justify-center backdrop-blur-sm items-center ${(Uclick)?'hidden':''}`}>
<div className='Trans-from w-2/6 max-xl:w-3/6 max-sm:w-5/6 z-50 p-4 rounded-xl flex flex-col gap-4 max-lg:gap-2 bg-slate-700'>
<div className='flex justify-between items-center'>
    <h1 className='text-xl max-lg:text-lg max-sm:text-sm font-medium text-slate-300'>Update Transaction</h1>
<img className='w-10 max-lg:w-6 cursor-pointer' src={cross} onClick={()=>setUclick(true)+clearFields()}/>
</div>

<div className='flex justify-between gap-4'>
    <button className={`w-3/6 rounded-xl max-lg:text-sm max-sm:text-xs p-2 cursor-pointer font-medium ${Types=='Expense'?'bg-red-500':'bg-slate-500'} text-white`} onClick={()=>{data.Type='Expense',setType('Expense')}}>Expense</button>
    <button className={`w-3/6 text-white max-lg:text-sm max-sm:text-xs cursor-pointer rounded-xl p-2 font-medium ${Types=='Income'?'bg-green-500':'bg-slate-500'}`} onClick={()=>{data.Type='Income',setType('Income')}}>Income</button>
</div>
    <form className='flex flex-col gap-3 max-lg:gap-2'>
        <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs'>DESCRIPTION</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm focus:outline-purple-500 bg-slate-500' onChange={handleinput} name='Description' value={data.Description} type="text" placeholder=' e.g. Monthly Salary'/>
        </div>
      
      <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs'>AMOUNT ($)</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm focus:outline-purple-500 bg-slate-500' onChange={handleinput} name='Amount' value={data.Amount} type="number" placeholder='0.00'/>
    </div>

    <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs'>DATE</label>
        <input className='focus:outline-3 rounded-xl p-2 max-sm:text-sm focus:outline-purple-500 bg-slate-500 text-slate-300' onChange={handleinput} name='Dates' value={data.Dates} type="Date"/>
        </div>

        <div className='flex flex-col gap-2'>
        <label className='font-medium text-slate-400 max-lg:text-sm max-sm:text-xs'>CATEGORY</label>
       <select className='focus:outline-3 rounded-xl p-2 max-sm:text-sm focus:outline-purple-500 bg-slate-500 text-slate-300' onChange={handleinput} value={data.Category} name="Category">
        <option value="Food&Dining" selected>Food&Dining</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Shopping">Shopping</option>
        <option value="Salary">Salary</option>
        <option value="Investement">Investement</option>
        <option value="Freelance">Freelance</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Others">Others</option>
       </select>
        </div>
    </form>

    <div className='flex gap-4 justify-between mt-2'>
            <button className='w-3/6 border max-lg:text-sm max-sm:text-xs  hover:bg-orange-500  cursor-pointer rounded-xl p-2 font-medium text-white' onClick={clearFields}>Cancel</button>
            {
                (load)?
                 <button className='w-3/6 cursor-pointer max-lg:text-sm max-sm:text-xs  rounded-xl p-2 font-medium bg-purple-500 text-white' onClick={handleUpdate}> 
    Update Transaction</button>:
    <img src={loading} alt="" width={'50px'}/>
            }
           

    </div>
</div>
</div>

<div className='Add flex justify-between p-2 mt-2 items-center'>
  <div className="left">
<h1 className='font-bold text-xl text-white max-lg:text-lg'>Transactions</h1>
<h2 className='text-xs text-slate-400'>{Sdata.length}</h2>
    </div>
<div className='right flex items-center gap-3'>
<button className='border rounded-xl p-2 max-lg:text-xs text-white text-sm'>Export CSV</button>
<button className='rounded-xl p-1 px-3 max-lg:text-sm text-white bg-purple-500 cursor-pointer' onClick={()=>setclick(false)}>+ Add</button>
</div>
</div> 

<div className='bottom p-3'>
    <div className='bg-slate-800 rounded-xl'>
  <div className='Search flex items-center p-4 max-sm:flex-col max-lg:p-2 rounded-xl gap-3  justify-around'>
    <div className='search flex bg-slate-950 p-2 py-3 max-lg:py-2 rounded-xl w-5/6 max-lg:w-4/6 max-sm:w-full items-center gap-3'>
<img src={search} className='w-6 max-lg:w-4'/>
<input className='w-3/6 text-slate-200 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-75' disabled={Open?lock:!lock} type="text" onChange={handleinput2} placeholder='Search by category...'/>
    </div>
    <div className='flex gap-2 max-sm:w-full'>
<div className={` text-white ${Open?'bg-slate-950':'bg-purple-500'} flex gap-2 p-2 cursor-pointer hover:border hover:border-purple-500 rounded-xl`} onClick={()=>Setopen(!Open)}>
    <img className='w-5 max-lg:w-4' src={filter} alt="" />
    <p className='font-medium max-lg:text-sm'>Filters</p>
</div>
<img className={`w-10 max-lg:w-9 ${sort?'':'border border-red-500'} p-2 hover:border-3 hover:border-purple-500 rounded-xl bg-slate-950 cursor-pointer`} src={sorting} alt="" onClick={()=>setsort(!sort)}/>

<button className={`bg-red-500 ${filterD.Type!=''||filterD.Category!=''||filterD.FDate!=''||filterD.ToDate!=''?'':'hidden'} text-white px-3 py-2 max-lg:text-sm max-lg:px-2 rounded-xl cursor-pointer`} onClick={handlereset}>Reset</button>
</div>
</div>
<div className={`filter-property ${Open?'hidden':''} grid lg:grid-cols-4 md:grid-cols-2 p-3 gap-5`}>
<div className='flex flex-col gap-2'>
    <label className='text-gray-400 font-medium'>Types</label>
    <select name="Type" value={filterD.Type} onChange={handlefilter} className='p-3 rounded-xl text-gray-400 font-medium border-2 border-gray-600 focus:border-blue-700 focus:outline-none bg-slate-950'>
<option value="All Types">All Types</option>
<option value="Income">Income</option>
<option value="Expense">Expense</option>
    </select>
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-400 font-medium'>Category</label>
    <select name="Category" value={filterD.Category} onChange={handlefilter} className='p-3 rounded-xl text-gray-400 font-medium border-2 border-gray-600 focus:border-blue-700 focus:outline-none bg-slate-950'>
        <option value="All Categories" selected>All Categories</option>
 <option value="Food&Dining">Food&Dining</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Shopping">Shopping</option>
        <option value="Salary">Salary</option>
        <option value="Investement">Investement</option>
        <option value="Freelance">Freelance</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Others">Others</option>
    </select>
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-400 font-medium'>From Date</label>
    <input type="date" name='FDate' value={filterD.FDate} onChange={handlefilter} className='p-3 rounded-xl text-gray-400 font-medium border-2 border-black focus:border-blue-700 focus:outline-none bg-slate-800'/>
</div>
<div className='flex flex-col gap-2'>
    <label className='text-gray-400 font-medium'>To Date</label>
    <input type="date" name='ToDate' value={filterD.ToDate} onChange={handlefilter} className='p-3 rounded-xl text-gray-400 font-medium border-2 border-black focus:border-blue-700 focus:outline-none bg-slate-800'/>
</div>
</div>
    </div>
  

<div className='history mt-5 max-md:mb-12 max-md:mt-2 bg-slate-900 rounded-xl'>

    {
        
        (Sdata.length>0)?
 Sdata.map((v,i)=>{    
            return(
<div className="block border flex justify-between items-center border-b-gray-700   p-2" key={i}>
    <div className="left flex items-center gap-4">
<img className='w-8 h-10 max-lg:w-5 max-lg:h-7' src={v.Type=='Expense'?uparrow:downarrow} alt="" />
<div className='info max-lg:text-sm'>
<p className='text-white'>{v.Category}</p>
<div className='flex gap-2 max-sm:flex-col max-sm:gap-0 max-sm:items-start items-center border'>
<p className='text-white max-sm:text-xs'>{v.Description}</p>
<p className='text-white max-sm:text-xs'>{new Date(v.Dates).toLocaleDateString('en-IN')}</p>
</div>

</div>
    </div>
    <div className='flex items-center gap-2 max-lg:gap-1 max-lg:text-sm'>
        <button className={` p-2 ${v.Type=='Expense'?'bg-amber-400 text-red-500':'bg-green-400'} max-sm:hidden rounded-xl`}>{v.Type}</button>
        <p className={`${v.Type=='Expense'?'text-white font-bold max-sm:text-xs':'text-green-500 font-bold max-sm:text-xs'}`}>{(v.Type=='Expense')?'-'+v.Amount:'+'+v.Amount}</p>
         <button className={`p-2 ${message=='Submitted'&&role=='👑 Admin'?'':'hidden'} rounded-xl cursor-pointer`} onClick={()=>DoUpdate(v._id)}><img className='w-5 h-5 max-lg:w-4 max-lg:w-4' src={Edit} alt="" /></button>
        <button className={`p-2 ${message=='Submitted'&&role=='👑 Admin'?'':'hidden'} rounded-xl cursor-pointer`} onClick={()=>DoDelete(v._id)}><img className='w-10 h-10 max-lg:w-6 max-lg:h-6' src={deletes} alt="" /></button>
    </div>
</div>
            )
        }):
        <div className="block border flex justify-between border-b-gray-700 bg-slate-950 p-2">
            <p className='text-white'>No Data Available</p>
    </div>

//         Tdata.map((v,i)=>{
//             return(
// <div className="block border flex justify-between border-b-gray-700 bg-slate-950 p-2" key={i}>
//     <div className="left flex gap-4">
// <img className='w-8 h-10 ' src={v.Type=='Expense'?uparrow:downarrow} alt="" />
// <div className='info'>
// <p className='text-white'>{v.Category}</p>
// <p className='text-white'>{v.Description}</p>
// </div>
//     </div>
//     <div className='flex items-center gap-2'>
//         <button className={`p-2 ${v.Type=='Expense'?'bg-amber-400 text-red-500':'bg-green-400'} rounded-xl`}>{v.Type}</button>
//         <p className='text-white'>{(v.Type=='Expense')?'-'+v.Amount:v.Amount}</p>
//         <button className='border p-2 rounded-xl cursor-pointer' onClick={()=>DoDelete(v._id)}><img className='w-10 h-10' src={deletes} alt="" /></button>
//     </div>
// </div>
//             )
//         })
        
    }


</div>
</div>


</div> 
</div>

</>
)
}