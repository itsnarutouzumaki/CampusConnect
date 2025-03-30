const { login } = require('../controller/Admin.js');
const  express =require('express');
const router = express.Router();
const {authenticateJWT} = require('../middleware/jwttoken.js');

router.post('/login',authenticateJWT, login);
module.exports=router;