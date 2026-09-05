let mongoose=require('mongoose');
const Users = require('./User');
let Addmaterial=mongoose.Schema({
DataId:{
type:mongoose.Schema.Types.ObjectId,
ref:Users,
required:true,
},
Type:{
type:String,
required:true
},   
Description:{
    type:String,
    required:true
},
Amount:{
    type:Number,
    required:true
},
Dates:{
    type:Date,
    required:true
},
Category:{
    type:String,
    required:true
}
})
let Transmodel=mongoose.model('TransDetail',Addmaterial);
module.exports= Transmodel;