let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),backgroundScan: false});
let x;
let data = {};
scanner.addListener('scan', function (content) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(content,"text/xml");
    x = Array.from(xmlDoc.all[0].attributes);
    let output = "";
    for(let i=0;i<x.length;i++) {
        data[x[i].nodeName] = x[i].nodeValue;
    }
    let address = [data["house"],data["street"],data["lm"],data["loc"],data["vtc"],data["state"]].join(", ");
    let aadhar = data["uid"];
    let name = data["name"];
    let dob = new Date(data["dob"]);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let mdiff = today.getMonth() - dob.getMonth();
    if (mdiff < 0 || (mdiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    let pincode = data["pc"];
    let gender = (data["gender"] === "M")?"Male":"Female";

    document.getElementById('aadhar').value = aadhar;
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('gender').value = gender;
    document.getElementById('address').value= address;
    document.getElementById('pincode').value = pincode;
    //output = "Aadhar Nummber: " + aadhar + "\nName: "+ name + "\nAge: " + age +"\nGender: "+ gender +"\nAddress: " + address + "\nPincode: " + pincode;
    //console.log(data);
});
Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        if(cameras.length > 1)
            scanner.start(cameras[1]);
        else
            scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

document.getElementById("submit").addEventListener("click", sendData);
function sendData() {
    let patient = {};
    patient["aadhar"] = document.getElementById('aadhar').value;
    patient["name"] = document.getElementById('name').value;
    patient["age"] = document.getElementById('age').value;
    patient["gender"] = document.getElementById('gender').value;
    patient["address"] = document.getElementById('address').value;
    patient["pincode"] = document.getElementById('pincode').value;

    let symptoms = document.getElementsByName("symptoms");
    for(let i=0;i<symptoms.length;i++)    {
        patient[symptoms[i].value] = symptoms[i].checked;
    }

    const url = "https://tbhack2.herokuapp.com/api/user";
    $.post(url,patient,function(data, status)   {
    });

}




