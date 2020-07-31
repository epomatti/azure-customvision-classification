import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training"
import { ApiKeyCredentials } from "@azure/ms-rest-js"

require('dotenv').config()

export function getTrainingClient() {
    const customVisionTrainingKey = process.env["customVisionTrainingKey"];
    const customVisionTrainingEndPoint = process.env["customVisionTrainingEndPoint"];
    const credentials = new ApiKeyCredentials({ inHeader: { "Training-key": customVisionTrainingKey } });
    return new TrainingAPIClient(credentials, customVisionTrainingEndPoint);
}