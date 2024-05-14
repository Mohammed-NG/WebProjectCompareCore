const express = require("express");
const bcrypt = require('bcrypt');
const collection = require("./config");
const gsmarena = require("gsmarena-api"); // Import gsmarena-api
const app = express();
const path = require('path');
const { Console } = require("console");
const axios = require('axios');
const bodyParser = require('body-parser')

const OpenAI = require('openai-api');
const openai = new OpenAI({ apiKey: 'sk-proj-uBggfYWxx8Jaj8dXb752T3BlbkFJr6eMajJ6afixIYzQotaK' });


//convert data into json file
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(express.static("public"));

//convert data into json file
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(express.static("public"));


async function getphones() {
   //testing
   const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
   // console.log(device);
}
//console.log(getphones());

const accesPath = path.join(__dirname, 'HTML');
const public_path=__dirname;

const logRequest = function(req, res, next) {
   console.log('Request: ${req.method} for ${req.path} ');
   next();
};

app.use(logRequest);

app.use(express.static(public_path));

app.get("/", function(req, res) {
   res.sendFile(path.join(accesPath,'Homepage.html'))
});

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
   const data = await gsmarena.deals.getDeals();
   //const f=c[1]
   // console.log(data);
   res.json(data)
})
///API database

//get Brand List
app.get("/compare/branddata", async function (req, res) {
   const brands = await gsmarena.catalog.getBrands();
   //const f=c[1]
   //console.log(brands);
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
       //console.log("This is details"+details);
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


// Register User
app.post("/signup", async (req, res) => {
   const data = {
       Fname: req.body.fname,
       Lname: req.body.lname,
       id: Math.floor(Math.random()*1000000),
       Email: req.body.email,
       Password: req.body.password // Make sure this matches everywhere it's used
   };

   // Check if the user already exists in the database
   const existingUser = await collection.findOne({ Email: data.Email });

   if (existingUser) {
       console.log("Interesting");
       res.send('User already exists.');
   } else {
       if (!data.Password) {
           return res.status(400).send('Password is required.');
       }
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
       data.Password = hashedPassword;
       const userdata = await collection.insertMany([data]); // Pass an array to insertMany
       //console.log(userdata);
       res.redirect('/hello'); // Assuming '/hello' is your route to homepage
   }
});



app.post("/login", async (req, res) => {
   try {
      console.log("A")
       const check = await collection.findOne({ Email: req.body.email });
       console.log("B")
       if (!check) {
           res.send("User name cannot found")
       }
       console.log("C")

       // Compare the hashed password from the database with the plaintext password
       const isPasswordMatch = await bcrypt.compare(req.body.password, check.Password);
       console.log(isPasswordMatch)
       console.log(check)
       if (!isPasswordMatch) {
           res.send("A");
       }
       else {
           res.redirect("/hello");
       }
   }
   catch {
    res.send("check");   
   }
});

app.post('/compare.html/ask/:message', async (req, res) => {


   const { message } = req.body;
   try {
     const response = await openai.complete({
       engine: 'text-davinci-002',
       prompt: message,
       maxTokens: 150,
     });
     res.json({ reply: response.choices[0].text.trim() });
   } catch (error) {
     console.error('Error:', error);
     res.status(500).json({ error: 'An error occurred' });
   }

});




app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

