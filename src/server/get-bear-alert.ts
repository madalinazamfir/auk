import {BearAlert, BearAlertModel} from "./model/bear-alert.mode";


const bearAlertGetAll = async (req, res, next) => {
    let bearAlerts: Array<BearAlert> = await BearAlertModel.find({});
    res.status(200).send(bearAlerts);

}

export default bearAlertGetAll;