import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training"
import { PredictionAPIClient } from "@azure/cognitiveservices-customvision-prediction"
import { ApiKeyCredentials } from "@azure/ms-rest-js"

require('dotenv').config()

const customVisionTrainingKey = process.env["customVisionTrainingKey"]!;
const customVisionTrainingEndPoint = process.env["customVisionTrainingEndPoint"]!;

export function getTrainingClient() {
    const credentials = new ApiKeyCredentials({ inHeader: { "Training-key": customVisionTrainingKey } });
    return new TrainingAPIClient(credentials, customVisionTrainingEndPoint);
}

export function getPredictionClient() {
    const credentials = new ApiKeyCredentials({ inHeader: { "Prediction-key": customVisionTrainingKey } });
    return new PredictionAPIClient(credentials, customVisionTrainingEndPoint);
}
