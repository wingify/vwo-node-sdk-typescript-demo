export class Config {
    static accountId = '';
    static sdkKey = '';

    static abCampaignKey = '';
    static abCampaigngoalIdentifier = '';

    static featureRolloutCampaignKey = '';
    static featureTestCampaignKey = '';
    static customVariables: Record<string, any> = {};
    static variationTargetingVariables: Record<string, any>  = {};
    static metaData = {
        user: ''
    };

    static customDimensionKey = '';
    static customDimensionValue = '';

    static pollTime = 10000;
    static webhookAuthKey = '';

}