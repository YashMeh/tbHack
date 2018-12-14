var request=require("request"),
    express=require("express"),
    router=express.Router()

function routerFunction(docId)
{
    var url="https://tbhack2.herokuapp.com/api/doc/"+docId;
    var docPc;
    var docLa;
    var docLo;
    return new Promise(function(resolve,reject){
        request(url,function(err1,response1,body1){
            if(!err1 && response1.statusCode==200)
            {
                var docDetails=JSON.parse(body1);
                docPc=docDetails.pc;
            }
            var url2="https://maps.googleapis.com/maps/api/geocode/json?address="+docPc+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
            request(url2,function(err2,response2,body2){
                
            })
        })
    })
}
module.exports=router    