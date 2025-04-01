const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
    payStatus:{type:String}
},{strict:false});

const Payment= mongoose.model('Payment',paymentSchema);

module.exports=Payment;