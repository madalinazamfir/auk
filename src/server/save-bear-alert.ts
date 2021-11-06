import {BearAlert, BearAlertModel} from "./model/bear-alert.mode";



const bearAlertSave = async (req, res, next) => {
    try {
        let savedBearAlert: BearAlert = await BearAlertModel.insertMany(req.body);
        res.status(200).send(savedBearAlert);
    } catch (err) {
        res.status(400).send({errorMessage: err.errmsg})
    }
}

export default bearAlertSave;