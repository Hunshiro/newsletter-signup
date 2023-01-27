const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(request, response){
response.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
const Firstname = req.body.fname;
const Lastname = req.body.lname;
const Email = req.body.email;
const data = {
members: [
{
email_address: Email,
status:"subscribed",
merge_fields:{
FNAME: Firstname,
LNAME:Lastname
}
}
]
};
const myJSON = JSON.stringify(data);
const url = "https://us21.api.mailchimp.com/3.0/lists/134eb5cdfa";
const options = {
method: "POST",
auth:"prabhanshu:834f659a7cfd0dca730418f47d11cf52-us21",
headers: { "Content-Type": "application/json" },
}
const request = https.request(url, options, function(response){
if (response.statusCode === 200) {
res.sendFile(__dirname+"/success.html");
} else {
res.sendFile(__dirname+"/failure.html");
}
response.on("data", function(data){
console.log(JSON.parse(data));
});
});
request.write(myJSON);
request.end();
});
app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.port || 3000, function(){
console.log("server is running on port 3000");
});

// 96b6219a4c94073bd65f02cfece952b3-us21
// 134eb5cdfa