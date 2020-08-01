import { getTrainingClient } from "./cognitiveServices"

require('dotenv').config()

const projectId = process.env["projectId"]
const predictionResourceId = process.env["predictionResourceId"]
const publishName = process.env["publishName"]


if (projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");
}

if (predictionResourceId === undefined || predictionResourceId.length === 0) {
    throw new Error("You must set prediction resource ID");
}

async function main() {
    const client = getTrainingClient();

    console.log("Training...");
    let trainingIteration = await client.trainProject(projectId);

    // Wait for training to complete
    console.log("Training started...");
    while (trainingIteration.status == "Training") {
        console.log("Training status: " + trainingIteration.status);
        await new Promise(resolve => setTimeout(resolve, 2000));
        trainingIteration = await client.getIteration(projectId, trainingIteration.id)
    }
    console.log("Training status: " + trainingIteration.status);

    // Publish the iteration to the end point
    await client.publishIteration(projectId, trainingIteration.id, publishName, predictionResourceId);

}
main()
    .catch(e => console.error(e))