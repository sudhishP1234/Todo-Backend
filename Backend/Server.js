const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const UserModel =require("./server/models/User")

const app =express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Todobase");

app.get('/', (req, res)=>{
  UserModel.find({})
  .then(user=> res.json(user))
  .catch(err=> res.json(err))
})
app.get("/getUser/:id", (req ,res)=>{
  const id =req.params.id;
  UserModel.findById({_id:id})
  .then(user=> res.json(user))
  .catch(err=> res.json(err))
})
app.put("/updateUser/:id",(req ,res)=>{
  const id =req.params.id;
UserModel.findByIdAndUpdate({_id:id},
{name:req.body.name, email:req.body.email, age:req.body.age})
.then(user=> res.json(user))
.catch(err=> res.json(err))
})

app.delete("/deleteUser/:id", (req, res)=>{
  const id =req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})

app.post("/createUser",(req,res)=>{
  UserModel.create(req.body)
  .then(user=>res.json(user))
  .catch(err=>res.json(err))  
})



// app.post("/createUser", async(req,res)=>{
//     const scma = new UserModel(req.body);
//     const dt =await scma.save();
//     console.log(dt)
// })

app.listen(4000 , ()=>{
    console.log("server is running")
})