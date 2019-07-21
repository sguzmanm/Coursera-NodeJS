const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();
// Routes for /
dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the dishes to you");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the dish " +
        req.body.name +
        " with details " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on dishes");
  })
  .delete((req, res, next) => {
    res.end("Will delete all dishes");
  });
//Routes for /:dishId
dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    res.end(`Will send details of ${req.params.dishId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on dish " + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write(`Updating ${req.params.dishId}`);
    res.end(
      `Will update the dish ${req.body.name} with details ${
        req.body.description
      }`
    );
  })
  .delete((req, res, next) => {
    console.log(req.params);
    res.end(`Deleting dish ${req.params.dishId}`);
  });

module.exports = dishRouter;
