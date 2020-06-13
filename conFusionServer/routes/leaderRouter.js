const express = require("express");
const bodyParser = require("body-parser");

const Leader = require("../models/leaders");
const authenticate = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// Routes for /
leaderRouter
  .route("/")
  .get(authenticate.verifyUser, (req, res, next) => {
    Leader.find({})
      .then(
        docs => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(docs);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Leader.create(req.body)
      .then(
        leader => {
          console.log("Created leader\n", leader);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on leaders");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leader.remove({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });
//Routes for /:leaderId
leaderRouter
  .route("/:leaderId")
  .get(authenticate.verifyUser, (req, res, next) => {
    Leader.findById(req.params.leaderId)
      .then(
        leader => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on leader " + req.params.leaderId);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        updatedLeader => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(updatedLeader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = leaderRouter;
