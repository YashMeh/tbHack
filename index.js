var express=require("express"),
    bodyParser=require("body-parser"),
    port=process.env.PORT || 3000,
    mongoose=require("mongoose"),
    app=express()
//mongoose.connect("mongodb://localhost/emailer");	

mongoose.connect("mongodb://Yash123:yash1234@ds039768.mlab.com:39768/tbhack");
app.use(bodyParser.urlencoded({extended:true}));
var apiroutes=require("./routes/apiRoutes");
app.use("/api/user",apiroutes);
app.get("/",function(req,res){
    res.send("The api route is at /api/user");
})
app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    else
    console.log("Server running at port "+ port);
})