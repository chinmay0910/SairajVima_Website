const express = require('express');
const router = express.Router();
const { homeController, comingsoon } = require("../controllers/homeController");

router.get('/', homeController)
router.get('/comingsoon', comingsoon)

module.exports = router;
