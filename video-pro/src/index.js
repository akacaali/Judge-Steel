"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/process-video', (req, res) => {
    //get path in input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;
    // Check if the input file path is defined
    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path');
    }
    (0, fluent_ffmpeg_1.default)(inputFilePath)
        .outputOption("-vf", "scale=-1:360") //360p
        .on("end", () => {
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
