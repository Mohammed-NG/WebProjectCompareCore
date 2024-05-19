const express = require("express");
const bcrypt = require('bcrypt');
const collection = require("./config");
const gsmarena = require("gsmarena-api");
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const OpenAI = require('openai-api');

const OPENAI_API_KEY = 'sk-proj-uBggfYWxx8Jaj8dXb752T3BlbkFJr6eMajJ6afixIYzQotaK';
const openai = new OpenAI(OPENAI_API_KEY);
const port = process.env.PORT || 10000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Logging middleware
const logRequest = (req, res, next) => {
    console.log(`Request: ${req.method} for ${req.path}`);
    next();
};
app.use(logRequest);

// Define paths
const accesPath = path.join(__dirname, 'pages');
const public_path = __dirname;

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(accesPath, 'Homepage.html'));
});

app.get("/hello", (req, res) => {
    res.sendFile(path.join(accesPath, 'Homepage.html'));
});

app.get("/Homepage.html", (req, res) => {
    res.sendFile(path.join(accesPath, 'Homepage.html'));
});

app.get("/signIn.html", (req, res) => {
    res.sendFile(path.join(accesPath, 'signIn.html'));
});

app.get("/signUp.html", (req, res) => {
    res.sendFile(path.join(accesPath, 'signUp.html'));
});

app.get("/favorite.html", (req, res) => {
    res.sendFile(path.join(accesPath, 'favorite.html'));
});

app.get("/compare.html", (req, res) => {
    res.sendFile(path.join(accesPath, 'compare.html'));
});

app.post('/compare/devices', async (req, res) => {
    const { device1, device2 } = req.body;
    const prompt = `Provide a comparison summary between ${device1} and ${device2}.`;

    try {
        const response = await openai.complete({
            engine: 'gpt-3.5-turbo-0125',
            prompt: prompt,
            maxTokens: 150
        });

        res.json({ comparisonSummary: response.choices[0].text.trim() });
    } catch (error) {
        console.error('Failed to fetch comparison from OpenAI:', error);
        res.status(500).json({ error: 'Failed to process comparison' });
    }
});

app.get("/compare/data", async (req, res) => {
    const data = await gsmarena.deals.getDeals();
    res.json(data);
});

app.get("/compare/branddata", async (req, res) => {
    const brands = await gsmarena.catalog.getBrands();
    res.json(brands);
});

app.get('/compare/:id', async (req, res) => {
    try {
        const deviceId = req.params.id;
        const deviceDetails = await gsmarena.catalog.getBrand(deviceId);
        res.json(deviceDetails);
    } catch (error) {
        console.error("Failed to fetch device details:", error);
        res.status(500).json({ error: "Failed to fetch device details" });
    }
});

app.get('/compare/details/:idDetails', async (req, res) => {
    try {
        const details = req.params.idDetails;
        const deviceDetails = await gsmarena.catalog.getDevice(details);
        res.json(deviceDetails);
    } catch (error) {
        console.error("Failed to fetch device details:", error);
        res.status(500).json({ error: "Failed to fetch device details" });
    }
});

// User registration
app.post("/signup", async (req, res) => {
    const data = {
        Fname: req.body.fname,
        Lname: req.body.lname,
        id: Math.floor(Math.random() * 1000000),
        Email: req.body.email,
        Password: req.body.password
    };

    const existingUser = await collection.findOne({ Email: data.Email });

    if (existingUser) {
        res.send('User already exists.');
    } else {
        if (!data.Password) {
            return res.status(400).send('Password is required.');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
        data.Password = hashedPassword;
        await collection.insertMany([data]);
        res.redirect('/hello');
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ Email: req.body.email });
        if (!check) {
            res.send('User not found');
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.Password);
            if (!isPasswordMatch) {
                res.send('Wrong password');
            } else {
                res.redirect("/hello");
            }
        }
    } catch (error) {
        res.send("Error during login");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
