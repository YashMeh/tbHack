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
    return d;
}
function giveLatLon(pincode)
{
    var url="https://maps.googleapis.com/maps/api/geocode/json?address="+pincode+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
    request(url,function(err,resp,userDet){
        if(!err && resp.statusCode==200)
        {
         var La;
         var Lo;
         var parsedResp=JSON.parse(userDet);
         La=parsedResp.results[0].geometry.bounds.northeast.lat;
         Lo=parsedResp.results[0].geometry.bounds.northeast.lng;
         var ob={"latitude":La,"longitude":Lo};
         return ob;
        }    

})
}
function giveUserList(pincode,dist)
{
    var url="https://maps.googleapis.com/maps/api/geocode/json?address="+pincode+"&key=AIzaSyAvEpdyB6qT4qmaU_qkkx8ziwX_8kAOEp0";
    request(url,function(err,resp,docDet){
        if(!err && resp.statusCode==200)
        {
         var docLa;
         var docLo;
         var parsedResp=JSON.parse(docDet);
         docLa=parsedResp.results[0].geometry.bounds.northeast.lat;
         docLo=parsedResp.results[0].geometry.bounds.northeast.lng;
         var userDataUrl="https://tbhack2.herokuapp.com/api/user";
         request(userDataUrl,function(userErr,userResp,userDet){
             if(!err && resp.statusCode==200)
             {
                 var parsedUserData=JSON.parse(userDet);
                 parsedUserData.forEach(function(user){
                     var recObj=giveLatLon(user.pc);
                     var lat1=recObj.latitude;
                     var lon1=recObj.longitude;
                     var distance=distanceBetween(lat1,lon1,docLa,docLo);
                     if(distance<dist)
                     gs.push(user);   
                 })
             }
         })   
        }
    })
    return gs;
}


router.get("/",function(req,res){
console.log(giveUserList('211003',28));
})    
module.exports=router    