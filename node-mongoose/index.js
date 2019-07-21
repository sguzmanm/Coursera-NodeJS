const assert = require("assert");

const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect
  .then(db => {
    console.log("Connected");

    Dishes.create({
      name: "Uthapizza",
      description: "Test"
    })
      .then(dish => {
        console.log("Inserted dish", dish);
        return Dishes.findByIdAndUpdate(
          dish._id,
          {
            $set: { description: "Update test" }
          },
          {
            new: true
          }
        ).exec();
      })
      .then(dish => {
        console.log("Dishes", dish);
        dish.comments.push({
          rating: 5,
          comment: "Cool dish",
          author: "Checho"
        });
        return dish.save();
      })
      .then(dish => {
        console.log(dish);
        return Dishes.remove();
      })
      .then(() => {
        return mongoose.connection.close({});
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
