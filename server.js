const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

// =================================================================== MIDDLEWARE
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// =================================================================== MODELLING


const db = require("./server-config/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    // {
    //     "username": "admin",
    //         "email": "mfisher36@gmail.com",
    //             "password": "koklol",
    //                 "roles": ["admin", "user"]
    // }
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mfisher application." });
});

// routes
require('./server-config/routes/auth.routes')(app);
require('./server-config/routes/user.routes')(app);


//TEST
app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// COMMANDS:
// node server.js to start server - open browser to  http://localhost:8080/