var mongoose=require("mongoose")
	
var userDataSchema=new mongoose.Schema({
    aadhar:String,
    name:String,
    age:String,
    gender:String,
    address:String,
    pincode:String,
    Cough:{
        type:Boolean,
        default: false
    },
    ChestPain:{
        type:Boolean,
        default: false
    },
    CoughingBlood:{
        type:Boolean,
        default: false
    },
    Fatigue:{
        type:Boolean,
        default: false
    },
    WeightLoss:{
        type:Boolean,
        default: false
    },
    NoAppetite:{
        type:Boolean,
        default: false
    },
    Chills:{
        type:Boolean,
        default: false
    },
    Fever:{
        type:Boolean,
        default: false
    },
    NightSweating:{
        type:Boolean,
        default: false
    },
    stage:Number,

	
})	
module.exports=mongoose.model("user",userDataSchema);