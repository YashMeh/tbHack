var mongoose=require("mongoose")
    medInfo=[""],
    symptoms=[""]
var logDataSchema=new mongoose.Schema({
    aadhar:String,
    symptoms:Array,
    medicine:Array,
    sputum:Boolean,
    state:String,
    city:String,
    date:Number
})	
module.exports=mongoose.model("log",logDataSchema);