const express = require("express");
const bodyParser = require("body-parser");

const Promotions = require("../models/promotions");
const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

// Routes for /
promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find({})
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
  .post((req, res, next) => {
    Promotions.create(req.body)
      .then(
        newPromo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(newPromo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on promotions");
  })
  .delete((req, res, next) => {
    Promotions.remove({})
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
//Routes for /:promotionId
promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
      .then(
        promo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on promotion " + req.params.promotionId);
  })
  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        updatedPromotion => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(updatedPromotion);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
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

module.exports = promotionRouter;
