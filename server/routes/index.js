const router = require('express').Router();
const User = require('../controllers/user');
const Api = require('../controllers/api')
const authenticate = require('../middlewares/auth');

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/loginGoogle', User.loginGoogle);


router.use(authenticate);

// ----API 3rd Party---
router.get('/catFacts',Api.catFacts)
router.get('/catImg',Api.catPict)
router.get('/dogImg',Api.dogPict)
router.get('/dogFacts',Api.dogFacts)


module.exports = router