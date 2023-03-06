const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


// 007c704c0ff26c2846b68c6df7378d90-us8
// aad41d6b4f

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    const data = {
        member: [{
            email_address: email,
            status: "subscribe",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/aad41d6b4f"
    const options = {
        method: "POST",
        auth: "prerak23:007c704c0ff26c2846b68c6df7378d90-us8"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.send("success");
        } else {
            res.send("failure");
        }


        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end

})

app.listen(3000, function () {
    console.log("Server is running");
})