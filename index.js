import express from "express";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = "";
  const videoSize = fs.startSync("bigbuck.mp4").size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
  };
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port ${port}`));
