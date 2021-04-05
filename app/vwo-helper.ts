import * as vwoSDK from "vwo-node-sdk";
export class VWOHelper {
    public vwoClientInstance: vwoSDK.vwoInstance
    public settingsFile: object

    async getSettingsFile(accountId: string, sdkKey: string): Promise < object > {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
        this.settingsFile = await vwoSDK.getSettingsFile(accountId, sdkKey);
        return this.settingsFile;
    }

    initVWOSdk(settingsFile: object) {

        this.vwoClientInstance = vwoSDK.launch({
            isDevelopmentMode: false,
            settingsFile: settingsFile,
            userStorageService: new VWOStorageService(),
            logging: new VWOLoggerConfig(),
            batchEvents: new EventBatching()
            // pollingInterval: 5000,
            // sdkKey: sdkKey
        });

        return this.vwoClientInstance;
    }
}

class VWOStorageService implements vwoSDK.VWOUserStorageConfig {
    userData = {};
    userIds = [];

    get(userId: string, campaignKey: string): Record < string, any > {
        let data = {};

        if (this.userData[campaignKey]) {
            for (let i = 0; i < this.userData[campaignKey].length; i++) {
                if (userId === this.userData[campaignKey][i].userId) {
                    data = this.userData[campaignKey][i];
                    break;
                }
            }
        }

        return data;
    };
    set(userStorageData: Record < string, any > ) {
        const {
            campaignKey,
            userId
        } = userStorageData;
        // Persist user profile based on userStorageData

        // Example code which saves data in object. This object will reset on server restart.
        if (this.userIds.indexOf(userId) === -1) {
            this.userData[campaignKey] = this.userData[campaignKey] || [];
            this.userData[campaignKey].push(userStorageData);

            this.userIds.push(userId);
        } else {
            for (let i = 0; i < this.userData[campaignKey].length; i++) {
                if (userId === this.userData[campaignKey][i].userId) {
                    this.userData[campaignKey][i] = userStorageData;
                    break;
                }
            }
        }
    }

}


class VWOLoggerConfig implements vwoSDK.VWOLogger {
    logger: log = new log()
    level =  vwoSDK.LogLevelEnum.DEBUG
    haveColoredLogs =  false;
}

class log implements vwoSDK.VWOLog {
    log(level: any, message: string): void {
        console.log(`VWO log for ${level} is ${message}`)
    }
}

class EventBatching implements  vwoSDK.VWOBatchConfig {
    flushCallback: Function = function(error: string, properties: any[]): void {
        console.log('event batching error is ', error)
        console.log('event batching properties are ', properties)
    };
    requestTimeInterval: number = 600;
    eventsPerRequest: number = 3;

}
