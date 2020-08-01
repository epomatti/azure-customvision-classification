import { getPredictionClient } from "./cognitiveServices"
import * as fs from 'fs';

const projectId = process.env["projectId"]
const predictionSampleDataRoot = process.env["predictionSampleDataRoot"]
const tagsVar = process.env["tags"]

async function main() {

    const client = getPredictionClient()
    const tagNames = tagsVar.split(",");

    for (const tag of tagNames) {
        const imageFiles = fs.readdirSync(`${predictionSampleDataRoot}/${tag}`);
        for (const file of imageFiles) {
            const data = fs.readFileSync(`${predictionSampleDataRoot}/${tag}/${file}`)
            const results = await client.classifyImage(projectId, "benchmark", data);
            console.log(`Results for [${tag}]:`);
            results.predictions.forEach(predictedResult => {
                console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
            });
        }
    }
}
main()
    .catch(e => console.error(e))

