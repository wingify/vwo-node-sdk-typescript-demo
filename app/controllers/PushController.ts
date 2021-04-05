import {
    Config
} from "../config";
import {
    Util
} from "../util";
import {
    VWOHelper
} from "../vwo-helper";

export class PushController {
    executePushController(req: any, res: any, vwoHelper: VWOHelper) {
        const userId = req.query.userId || Util.getRandomUser();

        const result = vwoHelper.vwoClientInstance.push(Config.customDimensionKey, Config.customDimensionValue, userId);

        res.render('push', {
            title: `VWO | Node-sdk example`,
            userId,
            customDimensionKey: Config.customDimensionKey,
            customDimensionValue: Config.customDimensionValue,
            result,
            currentSettingsFile: Util.prettyPrint(vwoHelper.settingsFile)
        });
    }
}