import { Config } from "../config";
import { Util } from "../util";
import { VWOHelper } from "../vwo-helper";

export class FeatureRolloutController {
  executeFeatureRolloutController(req: any, res: any, vwoHelper: VWOHelper)  {
        const campaignKey = Config.featureRolloutCampaignKey;
        let userId = req.query.userId || Util.getRandomUser();
      
        let isEnabled: boolean;
        let featureVariables = [];
        let stringVariable: string;
        let intVariable: string;
        let boolVariable: string;
        let doubleVariable: string;
      
        if (vwoHelper.vwoClientInstance) {
          isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, { customVariables: Config.customVariables, metaData: Config.metaData });
          let strValue: any, intValue: any, boolValue: any, dubValue: any;
      
          strValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, stringVariable, userId, {
            customVariables: Config.customVariables,
            metaData: Config.metaData
          });

          intValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, intVariable, userId, {
            customVariables: Config.customVariables,
            metaData: Config.metaData
          });
          boolValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, boolVariable, userId, {
            customVariables: Config.customVariables,
            metaData: Config.metaData
          });
          dubValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, doubleVariable, userId, {
            customVariables: Config.customVariables,
            metaData: Config.metaData
          });
      
          featureVariables = [
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
        }
      
        res.render('feature-rollout', {
          title: `VWO | Feature Rollout | Node-sdk example`,
          userId,
          isEnabled,
          campaignKey,
          featureVariables,
          customVariables: JSON.stringify(Config.customVariables),
          currentSettingsFile: Util.prettyPrint(vwoHelper.settingsFile)
        });
    }
}