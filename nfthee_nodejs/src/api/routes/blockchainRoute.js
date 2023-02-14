const express = require('express');
const {
  Multer: { upload },
  ApiAuth: { auth },
} = require('../../utils');

const router = express.Router();
const { getBlockchain, setBlockchain } =
  require('../controller').blockchainController;

router.get('/getBlockchain',auth, getBlockchain);
router.post('/setBlockchain',auth, setBlockchain);

module.exports = router;
