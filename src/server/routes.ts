import * as express from 'express';
import seaIce from './seaIce'

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/seaice', seaIce);

export default router;