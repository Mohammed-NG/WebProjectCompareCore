const express = require("express");
//const gsmarena = require("gsmarena-api"); // Import gsmarena-api
const app = express();
const path = require('path');
async function getphones() {
  // const brands = await gsmarena.catalog.getBrands();
   //console.log(brands);
}
const accesPath = path.join(__dirname, 'HTML');
const public_path=__dirname;

const logRequest = function(req, res, next) {
   console.log(`Request: ${req.method} for ${req.path}`);
   next();
};

app.use(logRequest);

app.use(express.static(public_path));

app.get("/hello", function(req, res) {
   res.sendFile(path.join(accesPath,'Homepage.html'))
});

app.get("/signIn.html", function(req, res) {
   //res.sendFile(path.join(public_path,'style.css'))
   res.sendFile(path.join(accesPath,'signIn.html'))
   
});




app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

//console.log(getphones());