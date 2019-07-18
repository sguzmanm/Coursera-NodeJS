const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostName = "localhost";
const port = "3000";

const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const promoRouter = require("./routes/promoRouter");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
//Routes
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);
// Static server
app.use(express.static(__dirname + "/public"));
// Main use
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><p>TEST</p></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostName, () => {
  console.log(hostName + ":" + port);
});
