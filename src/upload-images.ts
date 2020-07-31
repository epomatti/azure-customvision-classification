import { getTrainingClient } from "./cognitive-services"
import fs from 'fs';

require('dotenv').config()

const projectId = process.env["projectId"]

if(projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");    
}

async function main() {
    const client = getTrainingClient();
    const tags = await client.getTags(projectId);

    let fileUploadPromises = [];

    tags.forEach(tag => {
        const imageFiles = fs.readdirSync(`images/${tag.name}`);
        imageFiles.forEach(file => {
            fileUploadPromises.push(client.createImagesFromData(projectId, fs.readFileSync(`images/${file}`), { tagIds: [tag.id] }))            
        })        
    })

}

main()
    .catch(e => console.error(e))