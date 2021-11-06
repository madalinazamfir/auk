import * as express from 'express';
import seaIce from './seaIce'
import bearAlertSave from "./save-bear-alert";
import bearAlertGetAll from "./get-bear-alert";

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/seaice', seaIce);

router.post('/api/bear-alert', bearAlertSave)

router.get('/api/bear-alert', bearAlertGetAll)

export default router;