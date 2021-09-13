const express = require("express");
const request = require("request");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();


app.use(express.static("publik"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.eMail;

const data = {
    members: [
        {
            email_adress: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/874eb56d25";

const options = {
    method: "POST",
    auth: "stefan:70a0a91b3ce5be26244371fa8784c6e9-us6"
}

const request = https.request(url, options, function(response){
response.on("data", function(data){
console.log(JSON.parse(data));
})
});

request.write(jsonData);
request.end();  

});





app.listen("3000", function () {
    console.log("Server is Running on port 3 tisuce");


});


// 70a0a91b3ce5be26244371fa8784c6e9-us6 api key

// 874eb56d25 auidanc eid 