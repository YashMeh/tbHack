var mongoose=require("mongoose")
    medInfo=[""],
    symptoms=[""]
var logDataSchema=new mongoose.Schema({
    aadhar:String,
    symptoms:Array,
    medicine:Array,
    sputum:Boolean,
    date:Number
})	
module.exports=mongoose.model("log",logDataSchema);