const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());

const port = 5000;

var morgan = require("morgan"); //Morgan is used for logging request details

app.use(morgan("tiny"));

const mongoose = require("mongoose"); // doc mongoose pour connecter mongo
mongoose.connect("mongodb://localhost:27017/video-manager", {
  useNewUrlParser: true
});

let db = mongoose.connection; // doc mongoose pour verifier la connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected to mongodb");
});

let Schema = mongoose.Schema; // doc mongoose schema
let VideoSchema = new Schema({
  id: String,
  title: String,
  description: String,
  hashtags: String,
  url: String
});

let SerieSchema = new Schema({
  videos: [VideoSchema]
});

let Video = mongoose.model("Video", VideoSchema);
let Serie = mongoose.model("Serie", SerieSchema);

// // let v = new Video({
// //     title:  "My first video title",
// //     description: "a video test for my DB",
// //     hashtags: "my hashtag",
// //     url:   "http://myfirstvideo.com"
// // });

// // v.save();

// // Video.find(function(err, docs){
// //   console.log(docs)
// // })

app.get("/", function(req, res) {
  console.log("GET /");
  res.send("Hello World!");
});

app.get("/stats", (req, res) => {
  console.log("GET /stats");
  res.send({
    videoCount: 1223,
    serieCount: 11
  });
});

app.get("/videos", (req, res) => {
  console.log("GET /videos");
  Video.find(function(err, docs) {
    console.log(docs);
    res.send(docs);
  });
});

app.get("/videos/:id", (req, res) => {
  console.log("GET /videos" + req.params.id);
  Video.where({ _id: req.params.id })
  .findOne(function(err, video) {
    if (err) return res.send({ error: "error" });
    if (video) {
      res.send(video);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
