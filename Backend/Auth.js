const jwt=require("jsonwebtoken");
require('dotenv').config();
const Secretkey=process.env.SECRETKEY;
function Generate(ExistUser){
const Payload={
UEmail:ExistUser.UEmail,
UPass:ExistUser.UPass
}
return jwt.sign(Payload,Secretkey,{expiresIn:'2h'});
}

module.exports={Generate};