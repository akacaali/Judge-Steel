import { Storage } from "@google-cloud/storage";    
import fs, { link } from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = storage.bucket("JudgeRawVideos");
const processedVideoBucketName = storage.bucket("JudgeProcessedVideos");

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";


export function setupDirectory() {
 
  }

    @param rawVideoName {@link localRawVideoPath}
    @parma processedVideoName {@link localProcessedVideoPath}
    @returns 

export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {ffmpeg('${localRawVideoPath}/${rawVideoName}')
    .outputOption("-vf", "scale=-1:360") //360p
    .on ("end", () => {
        console.log("Video processing done");
        resolve();
    })
    .on("error", (err) => {
        console.log("Error: ${err.message}");
        reject(err);
    })
    .save('${localprocessedVideoPath}/${processedVideoName}');
});

}


 @param fileName
 {@link rawVideoBucketName}  {@link localRawVideoPath}
 @returns 


 export async function downloadrawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({destination: '${localRawVideoPath}/${fileName}'});

    console.log('gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.'
    );

}

  @param fileName
  {@link localProcessedVideoPath}  {@link processedVideoBucketName}
  @returns 




 export async function uploadProcessedVideo(fileName: string) {

}
