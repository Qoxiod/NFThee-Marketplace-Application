const express = require('express');
const {
  Multer: { upload, uploadS3 },
} = require('../../utils');

const { imageUpload } = require('../../../server');

const router = express.Router();

const {
  index,
  nftStore,
  upload_image,
  read_nftStore,
  upadte_nftStore,
  delete_nftStore,
  getAllItemInfo,
  getItemInfo,
  read_getItemInfo,
  update_getItemInfo,
  insert_likes,
  remove_likes,
} = require('../controller').nftteamsController;

let uploadMultiple = uploadS3.fields([
  { name: 'logo_image', maxCount: 1 },
  { name: 'featured_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]);

router.get('/all', index);
router.post('/store', nftStore);
router.post('/image', uploadS3.single('fileName'), upload_image);
router.get('/read', read_nftStore);
router.post('/update', uploadS3.single('uploadFile'), upadte_nftStore);
router.post('/delete', delete_nftStore);
router.get('/admin/getAllItem', getAllItemInfo);
router.get('/getItem', getItemInfo);
router.get('/getItem/read', read_getItemInfo);
router.get('/getItem/update', update_getItemInfo);
router.post('/like', insert_likes);
router.post('/unlike', remove_likes);
router.post('/writeImage', uploadS3.single('testImage'), upload_image);

router.post('/uploadImageTest', imageUpload.single('fileName'));

module.exports = router;
