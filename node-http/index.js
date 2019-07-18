const http = require("http");
const fs = require("fs");
const path = require("path");
const host = "localhost";
const port = 3000;
const server = http.createServer((req, res) => {
  console.log(req.headers);
  console.log("Request for " + req.url + " by method " + req.method);

  if (req.method !== "GET") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404 " +
        req.method +
        " Not Supported</h1></body></html>"
    );
    return;
  }

  var fileUrl;

  switch (req.url) {
    case "/":
      fileUrl = "/index.html";
      break;
    default:
      fileUrl = req.url;
      break;
  }
  console.log(fileUrl);
  var filePath = path.resolve("./public" + fileUrl);
  var fileExt = path.extname(filePath);
  if (fileExt === ".html") {
    fs.exists(filePath, exists => {
      if (!exists) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(
          "<html><body><h1>Error 404 " +
            fileUrl +
            " Not Found</h1></body></html>"
        );
        return;
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404 " +
        fileUrl +
        " Not HTML File</h1></body></html>"
    );
  }
});

server.listen(port, host, () => {
  console.log(`Server runing at ${host}:${port}`);
});
