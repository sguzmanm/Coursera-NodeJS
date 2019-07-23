const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// Routes for /
leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the leaders to you");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the leader " +
        req.body.name +
        " with details " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on leaders");
  })
  .delete((req, res, next) => {
    res.end("Will delete all leaders");
  });
//Routes for /:leaderId
leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    res.end(`Will send details of ${req.params.leaderId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on leader " + req.params.leaderId);
  })
  .put((req, res, next) => {
    res.write(`Updating ${req.params.leaderId}`);
    res.end(
      `Will update the leader ${req.body.name} with details ${
        req.body.description
      }`
    );
  })
  .delete((req, res, next) => {
    console.log(req.params);
    res.end(`Deleting leader ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
