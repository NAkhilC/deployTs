const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const index = require("./routes/index");
const path = require("path");

//For env File
dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser());
//set the static path

app.set("view engine", "pug");
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["localhost:4200, localhost:3000"],
    credentials: true,
  })
);

const oneHour = 1000 * 60 * 60 * 1;

const client = redis.createClient({
  socket: {
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
  },
  password: process.env.REDISPASS,
});

(async () => {
  await client.connect();
  const pingCommandResult = await client.ping();
  console.log("Ping command result: ", pingCommandResult);
})();
app.use(
  session({
    secret: "thisisdeployentopenshiftapp",
    store: new RedisStore({
      client: client,
    }),
    saveUninitialized: true,
    cookie: {
      maxAge: oneHour,
      secure: false, // if true only transmit cookie over https
      httpOnly: false,
    },
    resave: false,
  })
);
app.use("/", index);
app.use(express.static(path.join(__dirname, "angular-app")));

app.listen(port, () => {
  console.log(`Server is Fire at ${port}, running on ${process.env.NODE_ENV} environment`);
});
