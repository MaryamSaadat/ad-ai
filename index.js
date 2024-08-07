const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const OpenAI = require("openai");
const apiKey= process.env.GPT_API_KEY;

app.get("/", (req, res) => {
    res.send("Welcome to my Node.js backend!");
  });

app.get("/speech", (req, res) => {
  const { textToConvert, speed } = req.query;
  const apiBody = {
      model: "tts-1",
      input: textToConvert,
      voice: "alloy",
      speed: parseFloat(speed) || 1.0, // Default speed is 1.0 if not provided
  };
    const options = {
                url:"https://api.openai.com/v1/audio/speech",
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + apiKey,
                },
                responseType: "arraybuffer",
                data: JSON.stringify(apiBody)
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        // console.log("My response:", response.data)
    }).catch((error) => {
        console.log(error)
    })

});


app.listen(8000, () => console.log(`Server is running on port ${PORT}`));