const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/model", async (req, res) => {
  try {
    const url =
      "https://mart-wishee.s3.ap-south-1.amazonaws.com/f576389a-5e76-42c1-9cf9-c400b0a91159/model.glb";
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "model/gltf-binary");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching model");
  }
});

app.listen(5000, () => {
  console.log("server started");
});
