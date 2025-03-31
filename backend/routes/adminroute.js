const { login,updatedetails } = require('../controller/Admin.js');
const  express =require('express');
const router = express.Router();
const {authenticateJWT} = require('../middleware/jwttoken.js');
const upload = require('../middleware/uploadMiddleware.js');

router.post('/login', login);
router.post('/updatedetails', upload.single('file'),updatedetails);
module.exports=router;