const { nftteamsService } = require('../services')
const { successResponse, errorResponseBadReq } = require('../helpers').ResponseHelper;

exports.index = async (req, res, next) => {
    try {
        const data = await nftteamsService.index(req);
        return  successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}


exports.upload_image = async (req, res, next) => {
    try {
        const data = await nftteamsService.upload_image(req)
        if(data.status==true){
            return successResponse(req, res, data.data, data.message);
        }else{
            return successErrorResponse(req, res, data.data, data.message);
        }
    } catch (error) {
        next(error);
    }
}

exports.nftStore = async (req, res, next) => {
    try {
        const data = await nftteamsService.nftStore(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

exports.read_nftStore = async (req, res, next) => {
    try {
        const data = await nftteamsService.read_nftStore(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

exports.upadte_nftStore = async (req, res, next) => {
    try {
        const data = await nftteamsService.upadte_nftStore(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

exports.delete_nftStore = async (req, res, next) => {
    try {
        const data = await nftteamsService.delete_nftStore(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

// create new collection


exports.indexAll = async (req, res, next) => {
    try {
        const data = await nftteamsService.indexAll(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}


exports.createCollectionInfo = async (req, res, next) => {
    try {
        const data = await nftteamsService.createCollectionInfo(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}


exports.read_createCollectionInfo = async (req, res, next) => {
    try {
        const data = await nftteamsService.read_createCollectionInfo(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

exports.update_createCollectionInfo = async (req, res, next) => {
    try {
        const data = await nftteamsService.update_createCollectionInfo(req);
        return successResponse(req, res, data.data, data.message);
    } catch (error) {
        next(error);
    }
}

exports.delete_createCollectionInfo = async (req, res, next) => {
    try {
        const data = await nftteamsService.delete_createCollectionInfo(req);
        if (data.status === true) {
            return successResponse(req, res, data.data, data.message);
        } else {
            return successErrorResponse(req, res, data.data, data.message);
        }
    } catch (error) {
        next(error);
    }
}
