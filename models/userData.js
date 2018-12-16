var mongoose=require("mongoose")
	
var userDataSchema=new mongoose.Schema({
    aadhar:String,
    name:String,
    dob:String,
    city:String,
    gender:String,
    address:String,
    pincode:String,
    state:String,
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
    }
    

	
})	
module.exports=mongoose.model("user",userDataSchema);