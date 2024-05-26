import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
    //get path in input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

      // Check if the input file path is defined
    if (!inputFilePath || !outputFilePath) {
    return res.status(400).send('Bad Request: Missing file path');
    }

    ffmpeg(inputFilePath)
        .outputOption("-vf", "scale=-1:360") //360p
        .on ("end", () => {
            res.status(200).send("Video processing started");
        })
        .on("error", (err) => {
            console.log("Error: ${err.message}");
            res.status(500).send("Internal Error: ${err.message}");
        })
        .save(outputFilePath);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video-pro started at http://localhost:${port}`);
});