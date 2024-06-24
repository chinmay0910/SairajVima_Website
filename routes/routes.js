const express = require('express');
const router = express.Router();
const { homeController, comingsoon, products, SubmitEmails } = require("../controllers/homeController");
const { quoteController, getpremiumController, downloadPresentation } = require("../controllers/quotes");

router.get('/', homeController)
router.get('/quotes', quoteController)
router.post('/quotes', getpremiumController)
router.get('/download', downloadPresentation)
router.get('/comingsoon', comingsoon)
router.get('/products', products)
router.post('/submit-email', SubmitEmails)

module.exports = router;
