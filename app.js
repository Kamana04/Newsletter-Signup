const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname, "public")));

app.get("/",function (req,res) {
      
      res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res) {
   const firstname = req.body.fname;
   const lastname = req.body.lname;
   const email = req.body.ename;
   
   var data = {

   	       members : [
   	       {
   	  	     email_address : email,
   	  	     status : "subscribed",
   	  	     merge_fields : {
   	  		      FNAME: firstname,
   	  		      LNAME : lastname
   	  	       }
   	       }
   	      ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us6.api.mailchimp.com/3.0/lists/9765a243d2";
   const options = {
   	    method : "POST",
   	    auth : "Kamana:7b27a9e1cc97767eb946afc8dfa21a48-us6"
   }
   const request = https.request(url,options,function (response) {

   	if(response.statusCode === 200)
   	{
   		res.sendFile(__dirname + "/success.html");
   	}
   	else
   	{
   		res.sendFile(__dirname + "/failure.html");
   	}

   	response.on("data",function(data) {
		console.log(JSON.parse(data));

   });
   });

request.write(jsonData);
request.end();

app.post("/failure",function(req,res) {
    res.redirect("/");
});
});


app.listen(process.env.PORT || 3000,function (response) {
	console.log("server at 3000");
	
	
});
//
//list id
// 