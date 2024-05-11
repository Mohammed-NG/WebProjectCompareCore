const express = require("express");
const gsmarena = require("gsmarena-api"); // Import gsmarena-api
const app = express();
const path = require('path');
async function getphones() {
   const c = await gsmarena.deals.getDeals();
   //const f=c[1]
   console.log(c);
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
});

app.get("/signIn.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'signIn.html'))
   
});
app.get("/favorite.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'favorite.html'))
   
})

app.get("/compare.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'compare.html'))
   
})

app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

console.log(getphones());