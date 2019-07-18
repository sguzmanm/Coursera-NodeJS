const express = require("express");
const bodyParser = require("body-parser");

const promotionRouter = express.Router();
// Routes for /
promotionRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the promotions to you");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promotion " +
        req.body.name +
        " with details " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on promotions");
  })
  .delete((req, res, next) => {
    res.end("Will delete all promotions");
  });
//Routes for /:promotionId
promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    res.end(`Will send details of ${req.params.promotionId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on promotion " + req.params.promotionId);
  })
  .put((req, res, next) => {
    res.write(`Updating ${req.params.promotionId}`);
    res.end(
      `Will update the promotion ${req.body.name} with details ${
        req.body.description
      }`
    );
  })
  .delete((req, res, next) => {
    console.log(req.params);
    res.end(`Deleting promotion ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
