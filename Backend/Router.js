let express=require('express');
const { StoreTrans, FetchData, DeleteData, SearchByName, SearchByfilter, FetchDataAsc, FetchDataDesc,UpdateData, Getaccess, Login, SignUp } = require('./Apis');
let route=express.Router();
route.post('/update',StoreTrans);
route.get('/find',FetchDataAsc);
route.get('/findDsc',FetchDataDesc);
route.delete('/Delete',DeleteData);
route.get('/Search',SearchByName);
route.post('/filter',SearchByfilter)
route.put('/Update',UpdateData);
route.post('/Validate',Getaccess);
route.post('/Login',Login);
route.post('/SignUp',SignUp);
module.exports={route};