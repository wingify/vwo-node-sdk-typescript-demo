import { VWOHelper } from "../vwo-helper";
import { Util } from "../util";
import { Config } from "../config";


export class AbController {
    executeAbController(req: any, res: any, vwoHelper: any) {
        let campaignKey = Config.abCampaignKey;
        let variationName: string;
        let userId: string;
        let isPartOfCampaign: boolean

      
        userId = req.query.userId || Util.getRandomUser();
      
        if (vwoHelper.vwoClientInstance) {
          // variationName = vwoHelper.vwoClientInstance.getVariation(campaignKey, userId, {
          //   customVariables,
          //   variationTargetingVariables,
          //   metaData
          // });
      
          variationName = vwoHelper.vwoClientInstance.activate(campaignKey, userId, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables
          });
      
          if (variationName) {
            isPartOfCampaign = true;
          } else {
            isPartOfCampaign = false;
          }
      
          vwoHelper.vwoClientInstance.track(campaignKey, userId, Config.abCampaigngoalIdentifier, {
            customVariables: Config.customVariables,
            variationTargetingVariables: Config.variationTargetingVariables,
            metaData: Config.metaData
          });
        }
      
        res.render('ab', {
          title: `VWO | A/B | Node-sdk example | ${variationName}`,
          userId,
          isPartOfCampaign,
          variationName,
          campaignKey,
          abCampaigngoalIdentifier: Config.abCampaigngoalIdentifier,
          customVariables: JSON.stringify(Config.customVariables),
          variationTargetingVariables: JSON.stringify(Config.variationTargetingVariables),
          currentSettingsFile: Util.prettyPrint(vwoHelper.settingsFile)
        });
      }
}

