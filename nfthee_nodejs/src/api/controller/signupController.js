const { signupServices } = require('../services');
const { successResponse, errorResponseBadReq, successErrorResponse } = require('../helpers').ResponseHelper;

exports.register = async(req, res, next) => {
    try {
        const data = await signupServices.register(req);
        if(data.status==true){
            return successResponse(req, res, data.data, data.message);
        }else{
            return successErrorResponse(req, res, data.data, data.message);
        }
    } catch (error) {
        next(error);
    }
}
exports.signupDataAll = async(req, res, next) => {
    try {
        const data = await signupServices.signupDataAll(req);

        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}
exports.login = async(req, res, next) => {
    try {
        const data = await signupServices.login(req);
        if(data.status==true){
            return successResponse(req, res, data.data, data.message);
        }else{
            return successErrorResponse(req, res, data.data, data.message);
        }
    } catch (error) {
        next(error);
    }
}