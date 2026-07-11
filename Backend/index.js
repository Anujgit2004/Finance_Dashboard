let express=require('express');
let app=express();
const mongoose = require('mongoose');
const Transmodel = require('./AddTrans');
const { route } = require('./Router');
require('dotenv').config();
let cors=require('cors');
app.use(cors({
    origin:'https://finance-dashboard-q7kv.onrender.com',
}))

app.use(express.json());
app.get('/',(req,res)=>{
  res.send('backend Running')
})
const uri = process.env.URL;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
   catch(err){
    console.log(err)
  }
}
run().catch(console.dir);


app.use('/user',route)


app.listen(8000);