
const express= require("express");
const connection  = require("./config/db");
// const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/produtRoute");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const app=express();
require("dotenv").config();
app.use(express.json())
app.use(cookieParser());
const port= process.env.PORT



app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/user",userRouter);
app.use("/products",productRoute)
// app.use("/order",orderRoute)

connection();
app.listen(port,()=>{
    console.log(`port is running at ${port}`)
})