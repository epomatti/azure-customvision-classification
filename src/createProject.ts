import { getTrainingClient } from "./cognitiveServices"
import { TrainingAPIModels } from "@azure/cognitiveservices-customvision-training";

require('dotenv').config()

const tagsVar = process.env["tags"]!
const projectName = process.env["projectName"]!

async function main() {
    const client = getTrainingClient();

    const options: TrainingAPIModels.TrainingAPIClientCreateProjectOptionalParams = {
        classificationType: "Multiclass"
    };

    const project = await client.createProject(projectName, options);
    console.log(`Project created. Add the ID to the .env file: ${project.id!}`)

    const tagNames = tagsVar.split(",");
    const tagPromises : any = []
    tagNames.forEach(tag => {
        tagPromises.push(client.createTag(project.id!, tag))
    })
    
    await Promise.all(tagPromises)

}

main()
    .catch(e => console.error(e))