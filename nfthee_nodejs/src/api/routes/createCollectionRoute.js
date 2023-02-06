const express = require('express');
const { Multer: { upload } } = require('../../utils');
const { imageUpload } = require('../../../server');

const router = express.Router();

const {
    indexAll,
    upload_image,
    createCollectionInfo,
    read_createCollectionInfo,
    update_createCollectionInfo,
    delete_createCollectionInfo
} = require('../controller').createCollectionController;


let uploadMultiple = upload.fields([
    { name: 'logo_image', maxCount: 1 },
    { name: 'featured_image', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
]);

router.get('/createCollection/all', indexAll)
router.post('/collectionImage', imageUpload.single('fileName'), upload_image);
router.post('/createCollection', uploadMultiple, createCollectionInfo);
router.post('/createCollection/read', read_createCollectionInfo);
router.post('/createCollection/update', uploadMultiple, update_createCollectionInfo);
router.post('/createCollection/delete', delete_createCollectionInfo);

module.exports = router;