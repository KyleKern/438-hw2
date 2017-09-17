
var express = require('express');
var router = express.Router();
var https = require('https'); 


console.log("In getty!!!!!!!!!!!!"); 
console.log("api key: " + process.env.GETTY_API_KEY); 

const options = {
    hostname: "api.gettyimages.com", 
    port: 443, 
    path: 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=most_popular&phrase=birds',
    method: 'GET', 
    headers: {
        'Api-Key': "d5yqb5k7mfg3da4zfa4ntkk9"
    }
}; 

function makeApiRequest(sendBackResponseToBrowser) {
    var apiResponse = ''; 
    
    https.get(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            console.log("received data: "); 
            apiResponse += chunk; 
        }); 
        
        response.on('end', function() {
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + apiResponse); 
            
            var responseJSON = JSON.parse(apiResponse); 
            var images = responseJSON.images; 
            console.log(responseJSON); 
            console.log("num images: " + images.length); 
            console.log("url of first image: " + images[0].display_sizes[0].uri); 
            var imageURI = images[Math.floor(Math.random() * 29)].display_sizes[0].uri; 
            
            sendBackResponseToBrowser(imageURI); 
            
        }); 
    }).on("error", function(e) {
        console.log("Got an error: " + e.message); 
    }); 
}






router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express', className: 'CST438' });
  makeApiRequest(function(imageURI){
      res.render('getty', {imageURI: imageURI});
  }); 
   
});

module.exports = router;
