import { createSlice } from '@reduxjs/toolkit';

let SliceName=createSlice({
name:"Change",
initialState:{
click:true,    
type:'Overview',
Total_Income:0,
Total_Expense:0,
Role:'👁️ User',
close:false,
Message:'',
Arr:[],
URL:'https://dash-back-4hc3.onrender.com',
UserID:''
},
reducers:{
ChangeType:(state,action)=>{
    state.type=action.payload
},
UpdateIncome:(state,action)=>{
    state.Total_Income=action.payload
},
UpdateExpense:(state,action)=>{
    state.Total_Expense=action.payload
},
UpdateArray:(state,action)=>{
    state.Arr=action.payload
},
UpdateClick:(state,action)=>{
  state.click=action.payload  
},
UpdateRole:(state,action)=>{
    state.Role=action.payload
},
UpdateMessage:(state,action)=>{
    state.Message=action.payload
},
UpdateClose:(state,action)=>{
    state.close=action.payload
},
UpdateID:(state,action)=>{
    state.UserID=action.payload
}
}
})
export const {ChangeType,UpdateExpense,UpdateIncome,UpdateArray,UpdateClick,UpdateRole,UpdateMessage,UpdateClose,UpdateID} =SliceName.actions;
export default SliceName.reducer;