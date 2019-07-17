var rect = require("./rectangle");

function solveRect(l, w) {
  console.log("Length " + l + " width " + w);
  rect(l, w, (err, rectangle) => {
    if (err) {
      console.log("ERROR: ", err.message);
    } else {
      console.log(
        "Perimeter " + rectangle.perimeter() + " area " + rectangle.area()
      );
    }
  });
}

solveRect(1, 2);
solveRect(0, 2);
solveRect(9, 9);
