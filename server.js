const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const axios = require('axios')

app = express();

const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

app.post("/api/v1/submiturl", async(req,res,next) => {
    let url = req.body;
    const validUrl = isValidUrl(url);
    console.log(validUrl);
    if(!validUrl){
        res.status(400).json({success: false});
    }else{
        res.status(201).json({success: true});
    }
});
app.get("/api/v1/submiturl", async(req,res,next) => {
    res.status(201).json({success: true, data: "Valid response here"});
});

// app.use("/api/v1/auth", auth);


// Setting a cron job
cron.schedule("*/10 * * * * *", function() {

	// Data to write on file
	let data = `${new Date().toUTCString()} : Server is working\n`;
	
	// //Appending data to logs.txt file
	// fs.appendFile("logs.txt", data, function(err) {
		
	// 	if (err) throw err;
		
	// 	console.log("Status Logged after 10 seconds!");
	// });

    // Hitting an API
    let request = axios.get('https://jsonplaceholder.typicode.com/posts/1')
        // Show response data
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
});

app.listen(3000);
