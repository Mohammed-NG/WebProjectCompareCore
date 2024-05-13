const express = require("express");
const gsmarena = require("gsmarena-api"); // Import gsmarena-api
const app = express();
const path = require('path');

async function getphones() {
   //testing
   const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
   // console.log(device);
}
console.log(getphones());

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
app.get("/favorite.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'favorite.html'))
   
})

app.get("/compare/data", async function (req, res) {
   const data = await gsmarena.deals.getDeals();
   //const f=c[1]
   console.log(data);
   res.json(data)
})
///API database

//get Brann List
app.get("/compare/branddata", async function (req, res) {
   const brands = await gsmarena.catalog.getBrands();
   //const f=c[1]
   console.log(brands);
   res.json(brands)
})

// app.get('/compare/n', async (req, res) => {  // Use :id to denote a dynamic parameter
//    try {
//        const deviceId = req.id;  // Access the dynamic parameter via req.params.id
//       //  console.log(deviceId);
//        const deviceDetails = await gsmarena.catalog.getBrand(deviceId);
//        res.json(deviceDetails);
//    } catch (error) {
//        console.error("Failed to fetch device details:", error);
//        res.status(500).json({ error: "Failed to fetch device details" });
//    }
// });

app.get('/compare/:id', async (req, res) => {  // Correctly define the route to accept an 'id' parameter
   try {
       const deviceId = req.params.id;  // Correctly retrieve the 'id' from the route parameters
      //  console.log("Requested device ID:", deviceId);
       const deviceDetails = await gsmarena.catalog.getBrand(deviceId);
      //  console.log(deviceDetails)
       res.json(deviceDetails);
   } catch (error) {
       console.error("Failed to fetch device details:", error);
       res.status(500).json({ error: "Failed to fetch device details" });
   }
});

////details
app.get('/compare/details/:idDetails', async (req, res) => {  // Correctly define the route to accept an 'id' parameter
   try {
       const details = req.params.idDetails;  // Correctly retrieve the 'id' from the route parameters
       console.log("This is details"+details);
       const deviceDetails = await gsmarena.catalog.getDevice(details);
      //  console.log(deviceDetails)
       res.json(deviceDetails);
   } catch (error) {
       console.error("Failed to fetch device details:", error);
       res.status(500).json({ error: "Failed to fetch device details" });
   }
});


app.get("/compare.html", function(req, res) {
   
   res.sendFile(path.join(accesPath,'compare.html'))
   
})

app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

