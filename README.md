# Azure Custom Vision Benchmark

Automated programs for training and prediction tasks using Azure Custom Vision (Cognitive Services).

## Setup

### Create the Cognitive Services resource

Example with Azure CLI:

```
az cognitiveservices account create -n <name> -g <group> --kind CognitiveServices --sku S0 -l eastus --yes
```

Go to [customvision.ai](https://www.customvision.ai/projects#/settings) resources and copy the folling parameters:

```
customVisionTrainingKey=<training_key>
customVisionTrainingEndPoint=<endpoint>
predictionResourceId=<prediction_resource_id>
```

Add these values to `.env`

:information_source: _Custom Vision recommends at least 50 images per set to ensure model performance. 
Following the rule of thumb 70/30 you should have at least 15 additional images for the prediction tests._

### Prepare the Tags & Image Samples

Add your samples path to the `.env` file:

```
trainingSampleDataRoot=<path>
predictionSampleDataRoot=<path>
```

Add the tags to the `.env` file separeted by commas (`,`):

```
tags=tag1,tag2,tag3
```

The `tags` must match the directories for each image set.

Example:

<img src="docs/sample.png"/>

Your data sample must match this directory structure.

## Training and Prediction

First you need to create your project and tags:

```sh
ts-node src/createProject.ts
```

Add the project ID to the `.env` file:

```
projectId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Upload your images:

_My algorithm is limited to send a single batch of 64 images. Help me with a pull request :grin:_
```sh
ts-node src/upload.ts
```

Train your model:

```sh
ts-node src/training.ts
```

Run the prediction tests:

```sh
ts-node src/prediction.ts
```

## References

Custom Vision Portal: https://www.customvision.ai

[Custom Vision with SDK](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/quickstarts/image-classification?pivots=programming-language-javascript)

[Custom Vision Service Limits and Quotas](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/limits-and-quotas)