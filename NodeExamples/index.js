var rect = require("./rectangle");

function solveRect(l, w) {
  console.log("Length " + l + " width " + w);
  if (l <= 0 || w <= 0) {
    console.log("Fuck you");
  } else {
    console.log(
      "Permiter " + rect.perimeter(l, w) + ", area " + rect.area(l, w)
    );
  }
}

solveRect(1, 2);
solveRect(0, 2);
solveRect(9, 9);
