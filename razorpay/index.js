const express = require('express');
const app = express();
const port = 3000;
const Razorpay = require('razorpay');
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.post("/payment",async(req,res)=>{
    let {amount} = req.body;
    var instance = new Razorpay({ key_id: 'rzp_test_z50EzhcZxEm7Bw', key_secret: 'wMfgzHi37qQ81QEKtflgJJa6' })

    let order = await instance.orders.create({
      amount: amount*100,
      currency: "INR",
      receipt: "receipt#1"
    })
    res.status(201).json({
        success : true,
        order,
        amount,
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})