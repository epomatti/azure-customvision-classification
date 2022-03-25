import { getTrainingClient } from "./cognitiveServices"
import * as fs from 'fs';
import { ImageFileCreateEntry, ImageFileCreateBatch } from "@azure/cognitiveservices-customvision-training/esm/models";

require('dotenv').config()

const projectId = process.env["projectId"]!
const trainingSampleDataRoot = process.env["trainingSampleDataRoot"]!

if (projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");
}

async function main() {
    const client = getTrainingClient();
    const tags = await client.getTags(projectId);

    let fileUploadPromises: any = [];
    tags.forEach(tag => {
        const imageFiles = fs.readdirSync(`${trainingSampleDataRoot}/${tag.name}`);
        const files: ImageFileCreateEntry[] = []
        const chunk = imageFiles.slice(0, 64)
        chunk.forEach(file => {
            const data = fs.readFileSync(`${trainingSampleDataRoot}/${tag.name}/${file}`)
            const fileEntry: ImageFileCreateEntry = { name: file, contents: data }
            files.push(fileEntry);
        })
        const batch: ImageFileCreateBatch = { images: files, tagIds: [tag.id!] }
        fileUploadPromises.push(client.createImagesFromFiles(projectId, batch))
    })

    await Promise.all(fileUploadPromises);

    console.log("Uploaded all images");

}
main()
    .catch(e => console.error(e))