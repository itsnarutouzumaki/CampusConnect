const multer=require('multer');
const item=require('../../models/studentschema.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const checkUserExists = async (req, res, next) => {
    const { email } = req.body;
    try {
    const student = await item.findOne({ email });
        if (item) {
            return res.status(400).send('User already exists');
        }
        next();
    } catch (err) {
        res.status(500).send('Server error');
    }
};
const signup=async (req,res)=>
{
const {fullname,email,password}=req.body;
const hashedPassword=await bcrypt.hash(req.body.password,10,
    (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Hashed Password:', hash);
        }
      }
);

//req.body.password=hashedPassword;
const data=new item(req.body);
const saveddata=await data.save();
const token = jwt.sign({ _id: saveddata._id }, "aa12aa3aa4", { expiresIn: '1h' });
res.send(saveddata);
};
const login=async (req,res)=>
{
const {email,password}=req.body;
const item=await item.findOne({email});
if(!item)
{
    return res.status(400).send('Invalid email or password');
};
const isMatch=await bcrypt.compare(password,item.password);
if(!isMatch)
{
    return res.status(400).send('Invalid email or password');
}
const token = jwt.sign({ _id: item._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.send({ item, token });
}
module.exports={
    signup,
    checkUserExists,
    login
}