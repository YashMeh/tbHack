var request=require("request"),
    express=require("express"),
    router=express.Router()

var gs=[];
function routerFunction(docId)
{
    var url="https://tbhack2.herokuapp.com/api/doc/"+docId;
    var docPc;
    var docLa;
    var docLo;
    var userList;
    
    return new Promise(function(resolve,reject){
        request(url,function(err1,response1,body1){
            if(!err1 && response1.statusCode==200)
            {
                var docDetails=JSON.parse(body1);
                docPc=docDetails.pincode;
            }
            var url2="https://maps.googleapis.com/maps/api/geocode/json?address="+docPc+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
            request(url2,function(err2,response2,body2){
                if(!err2 && response2.statusCode==200){
                    var docCo=JSON.parse(body2);
                    docLa=docCo.results[0].geometry.bounds.northeast.lat;
                    docLo=docCo.results[0].geometry.bounds.northeast.lng;
                }
                var url3="https://tbhack2.herokuapp.com/api/user";
                request(url3,function(err3,response3,body3)
                {
                    if(!err3 && response3.statusCode==200)
                    {
                        var userL=JSON.parse(body3);
                        userList=userL;
                        for(var i=0;i<userList.length;i++){
                            var userPc=userList[i].pincode;
                            var url4="https://maps.googleapis.com/maps/api/geocode/json?address="+userPc+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
                            request(url4,function(err4,response4,body4){
                                if(!err4 && response4.statusCode==200)
                                {
                                    var userDet=JSON.parse(body4);
                                    var userLa=userDet.results[0].geometry.bounds.northeast.lat;
                                    var userLo=userDet.results[0].geometry.bounds.northeast.lng;
                                    console.log(userLa);
                                    gs.push({docLa,docLa});
                                    console.log("reached !!");
                                }
                            })    
                           
                        };
                        
                    }
                    setTimeout(function(e){
                        resolve(gs);
                    },10000);
                
                    
                })
                
            })
        })
    })
}
router.get("/:id",function(req,res){
    var ID=req.params.id;
    routerFunction(ID).then(function(e){
        console.log(e);
    })
})
module.exports=router    