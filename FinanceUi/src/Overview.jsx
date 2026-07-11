import React from 'react'
import mode from './assets/mode.png'
import img1 from './assets/bolt64.png'
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
export default function Overview() {

window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});

let TotalIncome=useSelector((state) => state.First.Total_Income)
let TotalExpense=useSelector((state) => state.First.Total_Expense)
let Spending=useSelector((state)=>state.First.Arr)
let NetBalance=TotalIncome-TotalExpense;
let Saving=((NetBalance/TotalIncome)*100).toFixed(0);
  return (

<div className='flex'>
<SideBar></SideBar>

<div className='w-5/6 max-md:w-full absolute p-2 pb-4 right-0 bg-[#020618] min-h-screen flex flex-col justify-between'>
      
      <div className='trans-nav w-full flex justify-between bg-[#020618] p-2 border-b-1 border-slate-700 items-center'>
          <div className="left">
      <h1 className='font-bold text-sm text-white'>Dashboard Overview</h1>
      <h2 className='text-xs text-slate-400'>Your financial summary at a glance</h2>
          </div>
      <div className="right flex items-center gap-3 justify-between">
      <img src={img1} alt="" className='max-lg:w-10 min-md:hidden'/>
      </div>
      </div> 

      <div className='grid md:grid-cols-4 p-5 max-lg:p-3 border gap-5 max-lg:gap-3 bg-[#020618]'>

            <div className='border flex  flex-col py-8 max-lg:py-5 px-3 gap-4 rounded-xl bg-[#121632]'>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" lucide lucide-wallet text-violet-400" aria-hidden="true"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
  <div className='flex flex-col gap-2'>
    <p className='text-white text-2xl max-lg:text-xl max-sm:text-lg font-bold'>{'₹ '+NetBalance}</p>
    <p className='text-gray-400 text-sm max-lg:text-xs font-bold'>NET BALANCE</p>
  </div>
    </div>
 
         <div className='border flex  flex-col py-8 max-lg:py-5 px-3 gap-4 rounded-xl bg-[#0B1C2B]'>
 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 lucide lucide-trending-up" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
  <div className='flex flex-col gap-2'>
    <p className='text-white text-2xl max-lg:text-xl max-sm:text-lg font-bold'>{'₹ '+TotalIncome}</p>
    <p className='text-gray-400 text-sm max-lg:text-xs font-bold'>TOTAL INCOME</p>
    <p className='text-gray-500 text-sm max-lg:text-xs font-bold'>Salary + Freelance + More</p>
  </div>
            </div>

         <div className='border flex  flex-col py-8 px-3 max-lg:py-5 gap-4 rounded-xl bg-[#181329]'>
 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-400 lucide lucide-trending-down" aria-hidden="true"><path d="M16 17h6v-6"></path><path d="m22 17-8.5-8.5-5 5L2 7"></path></svg>
  <div className='flex flex-col gap-2'>
    <p className='text-white text-2xl max-lg:text-xl max-sm:text-lg font-bold'>{'₹ '+TotalExpense}</p>
    <p className='text-gray-400 text-sm max-lg:text-xs font-bold'>TOTAL EXPENSE</p>
    <p className='text-gray-500 text-sm max-lg:text-xs font-bold'>Across all categories</p>
  </div>
            </div>

         <div className='border flex  flex-col py-8 max-lg:py-5 px-3 gap-4 rounded-xl bg-[#191A25]'>
 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400 lucide lucide-piggy-bank" aria-hidden="true"><path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"></path><path d="M16 10h.01"></path><path d="M2 8v1a2 2 0 0 0 2 2h1"></path></svg>
  <div className='flex flex-col gap-2'>
    <p className='text-white text-2xl max-lg:text-xl max-sm:text-lg font-bold'>{Saving+'%'}</p>
    <p className='text-gray-400 text-sm max-lg:text-xs font-bold'>TOTAL SAVING</p>
    <p className='text-gray-500 text-sm max-lg:text-xs font-bold'>Of total income saved</p>
  </div>
            </div>
      </div>

     

      <div className='w-full rounded-xl flex flex-col gap-4 max-md:mb-10 p-5 bg-[#0C1327]'>
        <h1 className='text-white'>Top Spending Categories</h1>
        <div className='flex flex-col gap-2 '>
{Spending.map((v,i)=>{
  return(
  <div className='flex flex-col gap-1' key={i}>
          <div className='w-full flex justify-between'>
            <p className='text-gray-400 font-medium max-sm:text-sm'>{v.Category}</p>
            <p className='text-gray-400 font-medium max-sm:text-sm'>₹{v.Amount}</p>
          </div>
          <div className='w-full rounded-xl bg-[#1D293D]'>
            <div className={`w-${6-i}/6 rounded-xl p-2 max-sm:p-1 ${i%2==0?'bg-[#14B8A6]':'bg-green-700'}`}></div>
          </div>
        </div>
  )
})}
      
       
      </div>
      </div>
     
    </div>
</div>

    
  )
}
