var express=require("express"),
    router=express.Router()

router.get("/",function(req,res){
    res.sendFile("index.html",{root:__dirname+'/../views'});
})
router.get("/govt",function(req,res){
    res.sendFile("govt_landing_page.html",{root:__dirname+'/../views'});
})
router.get("/govt/portal",function(req,res){
    res.sendFile("govt_portal.html",{root:__dirname+'/../views'});
})
router.get("/govt/showdata",function(req,res){
    res.sendFile("govt_show_data.html",{root:__dirname+'/../views'});
})
router.get("/business",function(req,res){
    res.sendFile("medwise.html",{root:__dirname+'/../views'});
})


module.exports=router    