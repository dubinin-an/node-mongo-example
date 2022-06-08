require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
// mongoose-morgan
const mongoosemorgan = require('mongoose-morgan');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// app.use(morgan(':remote-addr'))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

app.use(mongoosemorgan({
    collection: 'logs',
    connectionString: db.url,
    // connectionString: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/logs-db?authSource=admin`,
  },
  {
    skip: function (req, res) {
        console.log('skip', req.method)
      return req.originalUrl.includes('logs') && req.method !== 'DELETE';
      // return res.statusCode < 400;
    }
  },
  '{date::date[iso];ip::remote-addr;user::remote-user;methode::method;url::url;status::status;body::body;resTime::response-time ms}'
));

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
  res.json({ message: "Welcome to application." });
});

require("./routes/turorial.routes")(app);
require("./routes/logs.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
