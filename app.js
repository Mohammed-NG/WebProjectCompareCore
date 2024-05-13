const express = require("express");
const gsmarena = require("gsmarena-api"); // Import gsmarena-api
const app = express();
const path = require('path');

async function getphones() {
/////
}

const accesPath = path.join(__dirname, 'HTML');
const public_path=__dirname;

const logRequest = function(req, res, next) {
   console.log('Request: ${req.method} for ${req.path}');
   next();
};

app.use(logRequest);

app.use(express.static(public_path));

app.get("/hello", function(req, res) {
   res.sendFile(path.join(accesPath,'Homepage.html'))
});

app.get("/Homepage.html", function(req, res) {
   res.sendFile(path.join(accesPath,'Homepage.html'))
   res.status(200).json({field: "value"})
});//isn't this the same as above?

app.get("/signIn.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'signIn.html'))
   
});

app.get("/signUp.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'signUp.html'))
   
});

app.get("/favorite.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'favorite.html'))
   
})

app.get("/compare/data", async function (req, res) {
   const c = await gsmarena.deals.getDeals();
   //const f=c[1]
   console.log(c);
   res.json(c)
})
///API database

//get Brann List
app.get("/compare/branddata", async function (req, res) {
   const brands = await gsmarena.catalog.getBrands();
   //const f=c[1]
   console.log(brands);
   res.json(brands)
})

app.get("/compare.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'compare.html'))
   
})

app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

console.log(getphones());