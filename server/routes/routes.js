const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controller');
const authMiddlewares = require('../middlewares/auth.middleware');

router.post('/signup', authControllers.register);
router.post('/login', authControllers.login)
router.post('/', authMiddlewares.userVerification);

module.exports  = router;