## VWO Typescript Example

[vwo-node-sdk](https://github.com/wingify/vwo-node-sdk) allows you to A/B Test your application at server-side and other capabilities like feature rollout, feature testing, etc.

This repository provides a basic demo of how server-side works with VWO NodeJs SDK.

### Requirements

- Node 6.10.0 onwards

### Documentation

Refer [VWO Official Server-side Documentation](https://developers.vwo.com/reference#fullstack-introduction)

### Scripts

1. Install dependencies

```bash
yarn install
```

2. For NodeJs, update your app configuration inside `config.ts`

```js
// Only if settings-file is fetched from browser, otherwise pass settings-file from server to client
static const accountId = '';
static const sdkKey = '';

// AB Test
static const abCampaignKey = '';
static const abCampaigngoalIdentifier = '';

// Feature Rollout
static const featureRolloutCampaignKey = '';
static const featureTestCampaignKey = '';
static const featureTestCampaigngoalIdentifier = '';

static const featureVariable = '';

// Push API i.e. Custom Dimension for post-segmentation
static const tagKey = '';
static const tagValue = '';

// Pre-segmentation variables
static const customVariables = {};

```

3. Run application

```bash
yarn start
```

## License

[Apache License, Version 2.0](https://github.com/wingify/vwo-node-sdk-example/blob/master/LICENSE)

Copyright 2019-2021 Wingify Software Pvt. Ltd.
