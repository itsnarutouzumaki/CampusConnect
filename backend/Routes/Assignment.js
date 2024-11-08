const express=require('express');
const {addAssignment,getAssignment,updateAssignment,deleteAssignment,uploadFile}=require('../Controllers/Assignment')
const router=express.Router();
const multer=require('multer');
const path=require('path');
//add assignement
router.post('/add',addAssignment);

//get all assignments
router.get('/all',getAssignment);

//update an assignment
router.put('/update/:id',updateAssignment);

//delete an assignment
router.delete('/delete/:id',deleteAssignment);


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  // upload assignment
  router.put("/upload/:id", upload.single("file"), uploadFile);


module.exports=router;