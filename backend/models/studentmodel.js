const studentSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "student", // Default role is student
            enum: ["student"],  // Only student for this model
        },
        academicGoals: {
            type: String,
            maxlength: 300,
        },
        courseSchedule: [
            {
                courseName: { type: String},
                day: { type: String },
                time: { type: String },
            }
        ],
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);