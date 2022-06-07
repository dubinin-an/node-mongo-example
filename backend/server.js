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
// app.use(morgan(':date[iso] :remote-addr :remote-user :method :url :status :res[header] - :response-time ms :req[header]'))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



const db = require("./models");

console.log(db.url);

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

app.use(mongoosemorgan({
    collection: 'error_logger',
    connectionString: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/logs-db?authSource=admin`,
  },
  {
    // skip: function (req, res) {
    //   return res.statusCode < 400;
    // }
  },
  '{date::date[iso];ip::remote-addr;user::remote-user;methode::method;url::url;status::status;res::res[header];resTime::response-time ms;req::req[header]}'
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

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
