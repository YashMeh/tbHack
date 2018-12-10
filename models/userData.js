var mongoose=require("mongoose")
	
var userDataSchema=new mongoose.Schema({
    uid:String,
    name:String,
    gender:String,
    yob:String,
    co:String,
    house:String,
    street:String,
    loc:String,
    vtc:String,
    po:String,
    dist:String,
    subdist:String,
    state:String,
    pc:String,
    dob:{
        type:Date
    },
    stage:Number
	
})	
module.exports=mongoose.model("user",userDataSchema);