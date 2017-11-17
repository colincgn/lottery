const router = require('express-promise-router')();

// Controller Functions
const { root, fail, postTicketScan, notFound } = require('../controllers/index');

// Routes
router.get('/', root);
router.post('/ticket-scan', postTicketScan);
router.get('/fail', fail);

// Fall Through Route
router.use(notFound);

module.exports = router;