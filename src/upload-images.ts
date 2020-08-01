import { getTrainingClient } from "./cognitive-services"
import * as fs from 'fs';
import { ImageFileCreateEntry, ImageFileCreateBatch } from "@azure/cognitiveservices-customvision-training/esm/models";

require('dotenv').config()

const projectId = process.env["projectId"]
const sampleDataRoot = process.env["sampleDataRoot"]

if (projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");
}

if (sampleDataRoot === undefined || sampleDataRoot.length === 0) {
    throw new Error("You must set the sample data root");
}

async function main() {
    const client = getTrainingClient();
    const tags = await client.getTags(projectId);

    let fileUploadPromises = [];
    tags.forEach(tag => {
        const imageFiles = fs.readdirSync(`${sampleDataRoot}/${tag.name}`);
        const files: ImageFileCreateEntry[] = []
        const chunk = imageFiles.slice(0, 64)
        chunk.forEach(file => {
            const data = fs.readFileSync(`${sampleDataRoot}/${tag.name}/${file}`)
            const fileEntry: ImageFileCreateEntry = { name: file, contents: data }
            files.push(fileEntry);
        })
        const batch: ImageFileCreateBatch = { images: files, tagIds: [tag.id] }
        fileUploadPromises.push(client.createImagesFromFiles(projectId, batch))
    })

    await Promise.all(fileUploadPromises);

    console.log("Uploaded all images");

}
main()
    .catch(e => console.error(e))