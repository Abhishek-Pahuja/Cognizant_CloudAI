var fs = require("fs");
const path = require("path");
const request = require("request");

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    // console.log("content-type:", res.headers["content-type"]);
    // console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

// download(
//   filePath,
//   "google.png",
//   function () {
//     console.log("done");
//   }
// );

// const imagepath = path.join(__dirname, "/google.png");
// console.log(imagepath);

module.exports={download}