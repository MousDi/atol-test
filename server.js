const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
module.exports = io;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Serveur bien installé" });
});





// set port, listen for requests
require("./app/routes/product.routes")(app);
const PORT = process.env.PORT || 8080;



http.listen(PORT, () => {
  io.emit(`Server is running on port ${PORT}.`);
});

