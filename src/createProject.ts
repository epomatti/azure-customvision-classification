import { getTrainingClient } from "./cognitiveServices"
import { TrainingAPIModels } from "@azure/cognitiveservices-customvision-training";

require('dotenv').config()

const tagsVar = process.env["tags"]

async function main() {
    const client = getTrainingClient();

    const options: TrainingAPIModels.TrainingAPIClientCreateProjectOptionalParams = {
        classificationType: "Multiclass"
        // TODO set domain type to ObjectDetection - Waiting for issue #10358
    };

    const project = await client.createProject("benchmark", options)
    console.log(`Project create with ID ${project.id}. Add it to .env file`)

    const tagNames = tagsVar.split(",");
    const tagPromises = []
    tagNames.forEach(tag => {
        tagPromises.push(client.createTag(project.id, tag))
    })
    
    await Promise.all(tagPromises)

}

main()
    .catch(e => console.error(e))