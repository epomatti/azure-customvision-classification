# Azure Custom Vision Benchmark

Automated programs for training and prediction tasks using Azure Custom Vision (Cognitive Services).

Currently it only performs Classification, as I'm waiting for issue [#10358](https://github.com/Azure/azure-sdk-for-js/issues/10358) to implement Object Detection.

<img src="docs/doggo.png"/>

## Setup

Create the Cognitive Services resource:

```
az cognitiveservices account create -n <name> -g <group> --kind CognitiveServices --sku S0 -l eastus --yes
```

You can also use `--sku F0` which is the free tier.

Go to [customvision.ai](https://www.customvision.ai/projects#/settings) resources and copy the folling parameters:

<img src="docs/resource.png"/>

You may also get these values from the Azure Portal. I opened issue [#14595](https://github.com/Azure/azure-cli/issues/14595) to get the Key using the CLI.

Now add the values to the `.env` file:

```
customVisionTrainingKey=<training_key>
customVisionTrainingEndPoint=<endpoint>
predictionResourceId=<prediction_resource_id>
```

:information_source: _Custom Vision recommends at least 50 images per set to ensure model performance. 
Following the rule of thumb 70/30 you should have at least 15 additional images for the prediction tests._

Set the project name in the `.env` file:

```
projectName=<your_project_name>
```

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
$ ts-node src/createProject.ts
Project created. Add the ID to the .env file: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
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

You'll get an output for each image according to it's associated tag:

```
Results for [husky]:
         husky: 100.00%
         border_collie: 0.00%
Results for [border_collie]:
         border_collie: 100.00%
         husky: 0.00%
```

## References

[Custom Vision with SDK](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/quickstarts/image-classification?pivots=programming-language-javascript)

[Custom Vision Service Limits and Quotas](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/limits-and-quotas)
