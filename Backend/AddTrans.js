let mongoose=require('mongoose');
let Addmaterial=mongoose.Schema({
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