const Chapters=require('../Model/chapter');
const Courses=require('../Model/course');
// add a chapter
const addChapter= async (req,res) =>{

    let {title,
        url}=req.body;

        try{
            const courseId=req.params.id;
            const course=await Courses.findById(courseId);
            if(!course){
                return res.json({message:"course doen't exist "})
            }

            let chapter= await Chapters.create({title,
                url,
                course:courseId
            });

            res.json({message:"chapter added successfully",chapter});
        }catch(err){
            res.json({message:err.message});
        }
}

//get all chapter
const getChapter=async (req,res) =>{
    try{
        const id=req.params.id;
        const course=await Courses.findById(id);

        if(!course){
            return res.json({message:"course doesn't exist"});
        }

        const chapter=await Chapters.find({course:id}).sort({createdAt:-1});
        res.json({message:"all chapters",chapter});
    }catch(err){
        return res.json({message:err.message});
    }
}

// update chapter
const updatechapter=async (req,res) =>{
    try{
        
        const chapterId=req.params.id;

        const chapter=await Chapters.findByIdAndUpdate(chapterId,req.body,{new:true});
        if(!chapter){
            return res.json({message:"chapter doesn't exist"});
        }

        return res.json({message:"chapter has been updated",chapter});
    }catch(err){
        return res.json({message:err.message});
    }
}

// delete chapter
const removeChapter=async(req,res) =>{
    try{
        const chapterId=req.params.id;
    const chapter=await Chapters.findByIdAndDelete(chapterId);
    
    if(!chapter){
        return res.json({message:"chapter doesn't exist"});
    }

    return res.json({message:"chapter deleted successfully",chapter});
    
    }catch(err){
        return res.json({message:err.message});
    }
}

module.exports={addChapter,getChapter,updatechapter,removeChapter};
