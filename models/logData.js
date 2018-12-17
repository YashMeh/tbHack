var mongoose=require("mongoose")
    medInfo=[""],
    symptoms=[""]
var logDataSchema=new mongoose.Schema({
    aadhar:String,
    symptoms:Array,
    medicine:Array,
    state:Boolean,
    date:{
        type:Date,
        default:Date.now()
    }
})	
module.exports=mongoose.model("log",logDataSchema);