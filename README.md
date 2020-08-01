# Azure Custom Vision Benchmark

This app is under development.

## Getting Started

### 1 - Prepare the image sets

Create a directory named `images` in the project root.

Each directory under `images` will be converted to a tag, and each image will be uploaded to Custom Vision.

In the `.env` file create the tags separated by `,` like this:

```
tags=tag1,tag2,tag3
```

The algorithm is currently limited to **64 images** for convenience.

### 2 - Run the code

Create the Cognitive Service resource in Azure:

```
az cognitiveservices account create -n <name> -g <group> --kind CognitiveServices --sku S0 -l eastus --yes
```

Go to [customvision.ai](https://www.customvision.ai/projects#/settings) resources to find the `endpoint` and the `key` values.

Create the `.env` with the required properties.

Use `ts-node` to create the project artifacts:

```
create-project.ts
create-tags.ts
```

## References

Custom Vision Portal: https://www.customvision.ai

[Custom Vision with SDK](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/quickstarts/image-classification?pivots=programming-language-javascript)

[Custom Vision Service Limits and Quotas](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/limits-and-quotas)