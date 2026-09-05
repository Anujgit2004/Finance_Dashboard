let mongoose=require("mongoose");
let UserD=mongoose.Schema({
    UName:{
        type:String,
        required:true,
    },
    UEmail:{
type:String,
required:true,
unique:true,
    },
UPass:{
    type:String,
    required:true
}
    }
)
let Users=mongoose.model("UserT",UserD);
module.exports= Users;