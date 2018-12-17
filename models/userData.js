var mongoose=require("mongoose")
	medInfo=[""]
var userDataSchema=new mongoose.Schema({
    aadhar:String,
    name:String,
    dob:String,
    city:String,
    gender:String,
    address:String,
    pincode:String,
    state:String,
    symptoms:Array,
    medicine:Array,
    state:Boolean
    

	
})	
module.exports=mongoose.model("user",userDataSchema);