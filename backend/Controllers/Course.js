const Courses=require('../Models/course');

// adding a course
const addCourse= async (req,res) =>{
    let {name,
        code,
        description,
        credit,
        duration,
        startDate,
        endDate,
        enrollmentCount,
        createdAt}=req.body;

        try{
            let course= await Courses.create({name,
                code,
                description,
                credit,
                duration,
                startDate,
                endDate,
                enrollmentCount,
                createdAt});

            res.json({message:"course added successfully",course});
        }catch(err){
            res.json({message:err.message});
        }
}


// get course details
const getCourse= async (req,res)=>{
    let course=await Courses.find().sort({createdAt:-1});
    res.json({message:"all courses",course});
}

module.exports={addCourse,getCourse};