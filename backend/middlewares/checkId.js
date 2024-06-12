import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        return res.status(404)
        throw new Error(`Invalid ID ${req.params.id}`)

    }
     
    next();
}


export default checkId;
