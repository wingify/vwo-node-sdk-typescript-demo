import express from 'express';
import {
    Config
} from './config';
import {
    AbController
} from './controllers/AbController';
import {
    FeatureRolloutController
} from './controllers/FeatureRolloutController';
import {
    FeatureTestController
} from './controllers/FeatureTestController';
import {
    PushController
} from './controllers/PushController';
import {
    Util
} from './util';
import {
    VWOHelper
} from './vwo-helper';

const app = express();
const port = 4000;
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        title: `VWO | Node-sdk example`,
        currentSettingsFile: Util.prettyPrint("currentSettingsFile")
    });
});

app.listen(port, () => {
    //   if (err) {
    //     return console.error(err);
    //   }
    return console.log(`server is listening on ${port}`);
});
let currentSettingsFile = {};

export class Server {
    vwoHelper = new VWOHelper();

    getSettingsFile() {
        this.vwoHelper
            .getSettingsFile(Config.accountId, Config.sdkKey)
            .then(latestSettingsFile => {
                currentSettingsFile = latestSettingsFile;
                this.vwoHelper.settingsFile = latestSettingsFile;
                this.vwoHelper.initVWOSdk(latestSettingsFile);
                console.log(currentSettingsFile)
            })
            .catch(err => {
                console.error('Something went wrong in fetching account settings.', err);
            });

            app.get('/settings', (req, res) => {
                res.json(this.vwoHelper.settingsFile);
            });
            app.get('/feature-rollout', (_req: any, res: any) => new FeatureRolloutController().executeFeatureRolloutController(_req, res, this.vwoHelper));
            app.get('/feature-test', (_req: any, res: any) => new FeatureTestController().executeFeatureTestController(_req, res, this.vwoHelper));
            app.get('/ab', (_req: any, res: any) => new AbController().executeAbController(_req, res, this.vwoHelper));
            app.get('/push', (_req: any, res: any) => new PushController().executePushController(_req, res, this.vwoHelper));

            app.post('/webhook', (req, res) => {
                console.log('\nWEBHOOK TRIGGERED', req.body, '\nWebhook Auth Key:', req.headers['x-vwo-auth']);

                if (Config.webhookAuthKey && req.headers['x-vwo-auth']) {
                    if (req.headers['x-vwo-auth'] !== Config.webhookAuthKey) {
                        console.error('\nVWO webhook authentication failed. Please check.\n');

                        return;
                    } else {
                        console.log('\nVWO webhook authenticated successfully.\n');
                    }
                } else {
                    console.log('\nSkipping Webhook Authentication as webhookAuthKey is not provided in config.js\n');
                }

                if (this.vwoHelper.vwoClientInstance) {
                    this.vwoHelper.vwoClientInstance.getAndUpdateSettingsFile().then(_updatedSettings => {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({
                            status: 'success',
                            message: 'settings updated successfully'
                        }));
                    });
                }
            });
    }
}




new Server().getSettingsFile();
