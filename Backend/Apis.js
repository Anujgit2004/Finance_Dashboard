let express=require('express');
const Transmodel = require('./AddTrans');
let dotenv=require('dotenv').config();
let bcrypt=require("bcrypt");
let ID=null;
const Users = require('./User');
const { Generate } = require('./Auth');
let app=express();
app.use(express.json());


const Login=async(req,res)=>{
  let{UEmail,UPass}= req.body;
  let existEmail=await Users.findOne({UEmail})
  if(!existEmail){
    res.json({message:"Invalid Email"});
  }
  console.log(existEmail);
  let pass =await bcrypt.compare(UPass,existEmail.UPass);
  if(!pass){
    res.json({message:"Invalid Password"});
  }
 
const valid=Generate(existEmail);
if(!valid){
res.json({message:"Access Denied"});
}

return res.json({token:valid,ID:existEmail._id});
}

const SignUp=async(req,res)=>{
  let {UName,UEmail,UPass}= req.body;
  console.log({UPass});
   let existEmail=await Users.findOne({UEmail});
   if(existEmail){
    res.json({message:"Email already registered"});
   }
  let hashpass=await bcrypt.hash(UPass,10);
 let AddUser=await new Users({
    UName,
    UEmail,
    UPass:hashpass
   })

  AddUser.save().then(()=>{
  let valid=Generate(AddUser);
  res.json({token:valid,ID:AddUser._id});
   });
}


const StoreTrans=(req,res)=>{
let{DataId,Type,Description,Amount,Dates,Category}=req.body    
let TransD=Transmodel({
DataId,
Type,
Description,
Amount,
Dates,
Category
})
TransD.save().then(res.send('data Save'))
}

const FetchDataAsc=async(req,res)=>{
  ID=req.query.id;
         let getdata=await Transmodel.find({DataId:ID}).sort({Dates:1 });
    res.send(getdata);
}

const FetchDataDesc=async(req,res)=>{
   ID=req.query.id;
         let getdata=await Transmodel.find({DataId:ID}).sort({Dates:-1 });
         res.send(getdata);
}

const DeleteData=async(req,res)=>{
   let Ddata= await Transmodel.findByIdAndDelete(req.query.id);
   res.send('deleted')
   
}

const SearchByName=async(req,res)=>{
    let find=req.query.name||'';
  let getDetail= await Transmodel.find({DataId:ID,
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

      

let getdata=await Transmodel.find({DataId:ID},filter);
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

module.exports={StoreTrans,FetchDataAsc,DeleteData,SearchByName,SearchByfilter,FetchDataDesc,UpdateData,Getaccess,Login,SignUp};