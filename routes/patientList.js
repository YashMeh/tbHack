var request=require("request"),
    express=require("express"),
    router=express.Router()

var gs=[];
function distanceBetween(lat1,lon1,lat2,lon2)
{
    
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return Math.abs(d);
    
    
}
function giveLatLon(pincode)
{
    var url="https://maps.googleapis.com/maps/api/geocode/json?address="+pincode+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
    return new Promise(function(resolve,reject){
        request(url,function(err,resp,userDet){
            if(!err && resp.statusCode==200)
            {
             var La;
             var Lo;
             var parsedResp=JSON.parse(userDet);
             La=parsedResp.results[0].geometry.bounds.northeast.lat;
             Lo=parsedResp.results[0].geometry.bounds.northeast.lng;
             var ob={"latitude":La,"longitude":Lo};
             resolve(ob);
            }  
            else
            reject(err);  
    
    })
    })
    
}
function giveUserDetails()
{   
    var url="https://tbhack2.herokuapp.com/api/user";
    return new Promise(function(resolve,reject){
        request(url,function(err,resp,userDet){
            if(!err && resp.statusCode==200)
            {
             var ob=JSON.parse(userDet);   
             resolve(ob);
            }    
            else
            reject(err);
    })
    })
    
}
function giveDocDetails(docId)
{
    var url="https://tbhack2.herokuapp.com/api/doc/"+docId;
    return new Promise(function(resolve,reject){
        request(url,function(err,resp,docDet){
            if(!err && resp.statusCode==200)
            {
                var ob=JSON.parse(docDet);
                resolve(ob);
            }
            else
            reject(err);
        })
    })
}


router.get("/:id",function(req,res){
    var rs;
    var docLa;
    var docLo;
    var docPin;
    var docId=req.params.id;
    giveDocDetails(docId).then(function(doc){
        docPin=doc.pc;
    }).then(function(e){
        giveLatLon(docPin).then(function(docDet){
            docLa=docDet.latitude;
            docLo=docDet.longitude;
            console.log("docDet: "+docDet.latitude);
        }).then(function(ee){
            giveUserDetails().then(function(userList){
                userList.forEach(function(user){
                    var userPin=user.pc;
                    var userLa;
                    var userLo;
                    giveLatLon(userPin).then(function(userDet){
                        userLa=userDet.latitude;
                        userLo=userDet.longitude;
                        console.log(userLa,userLo,docLa,docLo);
                        var R = 6371e3; // metres
                        var pi=Math.PI;
                        var φ1 = userLa*(pi/180);
                        var φ2 = docLa*(pi/180);
                        var Δφ = Math.abs((docLa-userLa))*(pi/180);
                        var Δλ = Math.abs((userLo-docLo))*(pi/180);

                        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                                Math.cos(φ1) * Math.cos(φ2) *
                                Math.sin(Δλ/2) * Math.sin(Δλ/2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                        var d = (R * c)/1000;
                        console.log("distance is :"+d);
                        if(d<10)
                        gs.push(user);
                        
                    })
                    
                    
                })
                
            })
            
        })
    })
    
   
})    
module.exports=router    