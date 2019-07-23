const express = require("express");
const bodyParser = require("body-parser");

const Dishes = require("../models/dishes");
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Routes for /
dishRouter
  .route("/")
  .get((req, res, next) => {
    Dishes.find({})
      .then(
        dishes => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dishes);
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .post((req, res, next) => {
    Dishes.create(req.body)
      .then(
        dish => {
          console.log("Dish created", dish);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on dishes");
  })
  .delete((req, res, next) => {
    Dishes.remove({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
    res.end("Will delete all dishes");
  });
//Routes for /:dishId
dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on dish " + req.params.dishId);
  })
  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        dish => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(
        dish => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });
// Comments
dishRouter
  .route("/:dishId/comments")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments);
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .post((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            dish.comments.push(req.body);
            dish
              .save()
              .then(
                dish => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(dish.comments);
                },
                err => next(err)
              )
              .catch(err => next(err));
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT op not supported on comments");
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
            }
            dish
              .save()
              .then(
                dish => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(dish.comments);
                },
                err => next(err)
              )
              .catch(err => next(err));
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  });
//Routes for /:dishId/comments/:commentId
dishRouter
  .route("/:dishId/comments/:commentId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            var comment = dish.comments.id(req.params.commentId);
            if (comment != null) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            } else {
              err = new Error("Comment", req.params.commentId, "not found");
              err.statusCode = 404;
              return next(err);
            }
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST op not supported on comment " + req.params.commentId);
  })
  .put((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            var comment = dish.comments.id(req.params.commentId);
            if (comment != null) {
              if (req.body.rating) {
                comment.rating = req.body.rating;
              }
              if (req.body.comment) {
                comment.comment = req.body.comment;
              }
              dish
                .save()
                .then(
                  dish => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish.comments));
                  },
                  err => next(err)
                )
                .catch(err => next(err));
            } else {
              err = new Error("Comment", req.params.commentId, "not found");
              err.statusCode = 404;
              return next(err);
            }
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            var comment = dish.comments.id(req.params.commentId);
            if (comment != null) {
              comment.remove();
              dish
                .save()
                .then(
                  dish => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish.comments);
                  },
                  err => next(err)
                )
                .catch(err => next(err));
            } else {
              err = new Error("Comment", req.params.commentId, "not found");
              err.statusCode = 404;
              return next(err);
            }
          } else {
            err = new Error("Dish", req.params.dishId, "not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        err => {
          next(err);
        }
      )
      .catch(err => {
        next(err);
      });
  });

module.exports = dishRouter;
