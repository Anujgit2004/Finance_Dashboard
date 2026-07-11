let express=require('express');
const Transmodel = require('./AddTrans');
let dotenv=require('dotenv').config();

let app=express();
app.use(express.json());

const StoreTrans=(req,res)=>{
let{Type,Description,Amount,Dates,Category}=req.body    
let TransD=Transmodel({
Type,
Description,
Amount,
Dates,
Category
})
TransD.save().then(res.send('data Save'))
}

const FetchDataAsc=async(req,res)=>{
   
         let getdata=await Transmodel.find().sort({Dates:1 });
    res.send(getdata);
}

const FetchDataDesc=async(req,res)=>{
   
         let getdata=await Transmodel.find().sort({Dates:-1 });
    res.send(getdata);
}

const DeleteData=async(req,res)=>{
   let Ddata= await Transmodel.findByIdAndDelete(req.query.id);
   res.send('deleted')
   
}

const SearchByName=async(req,res)=>{
    let find=req.query.name||'';
  let getDetail= await Transmodel.find({
        Category:{ $regex: find, $options: 'i' }
        });

        res.send(getDetail)
}


const SearchByfilter=async(req,res)=>{
    let {Type,Category,FDate,ToDate}=req.body;
   let filter={};
if(Type){
    filter.Type=Type;
}

if(Category){
    filter.Category=Category;
}


let datefilter={}
  if (FDate) {
            datefilter.$gte = new Date(FDate); 
        }
if (ToDate) {  
            const end = new Date(ToDate);
            end.setHours(23, 59, 59, 999);
            datefilter.$lte = end;
        }

  let query = {};
        if (FDate||ToDate) {
            filter.Dates =datefilter; // 'createdAt' is your DB date field
        }

      

let getdata=await Transmodel.find(filter)
res.send(getdata)
    
}


const UpdateData=async(req,res)=>{
let id=await req.query.ID;
let obj=await req.body;
let UpdatedData=await Transmodel.findByIdAndUpdate(id,{$set:obj})
UpdatedData.save().then(()=>res.send(UpdatedData))
}


const Getaccess=(req,res)=>{
 try{
let adminEmail=process.env.UEMAIL;
let adminPass=process.env.UPASS;
let {Uemail,Upass}=req.body;
console.log(req.body)
if(Uemail!=adminEmail||Upass!=adminPass){
    return res.json({message:'Incorrect'})
}
return res.json({message:'Submitted'});
 }   
catch(err){
res.send(err)
}
}

module.exports={StoreTrans,FetchDataAsc,DeleteData,SearchByName,SearchByfilter,FetchDataDesc,UpdateData,Getaccess};