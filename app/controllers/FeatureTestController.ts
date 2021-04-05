import { Config } from "../config";
import { Util } from "../util";
import { VWOHelper } from "../vwo-helper";

export class FeatureTestController {
  executeFeatureTestController(req: any, res: any, vwoHelper: VWOHelper) {
        const campaignKey = Config.featureTestCampaignKey;
        let stringVariable: string;
        let intVariable: string;
        let boolVariable: string;
        let doubleVariable: string;
      
        let userId = req.query.userId || Util.getRandomUser();
        let isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, {
          customVariables: Config.customVariables,
          variationTargetingVariables: Config.variationTargetingVariables,
          metaData: Config.metaData
        });
      
        let strValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, stringVariable, userId, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables,
            metaData: Config.metaData
        });
        let intValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, intVariable, userId, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables,
            metaData: Config.metaData
        });
        let boolValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, boolVariable, userId, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables,
            metaData: Config.metaData
        });
        let dubValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, doubleVariable, userId, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables,
            metaData: Config.metaData
        });
        const featureVariables = [
          {
            key: stringVariable,
            value: strValue
          },
          {
            key: intVariable,
            value: intValue
          },
          {
            key: boolVariable,
            value: boolValue
          },
          {
            key: doubleVariable,
            value: dubValue
          }
        ];
      
        res.render('feature-test', {
          title: `VWO | Feature Test | Node-sdk example`,
          userId,
          isEnabled,
          campaignKey,
          featureVariables,
          customVariables: JSON.stringify(Config.customVariables),
          variationTargetingVariables: JSON.stringify(Config.variationTargetingVariables),
          currentSettingsFile: Util.prettyPrint(vwoHelper.settingsFile)
        });
    }
}
