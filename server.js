const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const axios = require('axios')

app = express();

// Body Parser
app.use(express.json());

function isUrlValid(url) {
    var res = url.match(/[-a-zA-Z0-9@:%_\+.~#?&\\=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\\=]*)?/g);
    if(res == null)
        return false;
    else
        return true;
}


app.post("/api/v1/submiturl", async(req,res,next) => {
    let url = req.body.url;
    const validUrl = isUrlValid(url);
    if(!validUrl){
        res.status(400).json({success: false, msg: 'Invalid Url, Please try again'});
    }else{
        axios.get(url)
        // Show response data
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        res.status(201).json({success: true});
    }
});
app.get("/api/v1/submiturl", async(req,res,next) => {
    res.status(201).json({success: true, data: "Valid response here"});
});

// app.use("/api/v1/auth", auth);


// Setting a cron job
// cron.schedule("*/10 * * * * *", function() {

// 	// Data to write on file
// 	let data = `${new Date().toUTCString()} : Server is working\n`;
	
// 	// //Appending data to logs.txt file
// 	// fs.appendFile("logs.txt", data, function(err) {
		
// 	// 	if (err) throw err;
		
// 	// 	console.log("Status Logged after 10 seconds!");
// 	// });

//     // Hitting an API
//     let request = axios.get('https://jsonplaceholder.typicode.com/posts/1')
//         // Show response data
//         .then(res => console.log(res.data))
//         .catch(err => console.log(err))
// });

app.listen(3000);
