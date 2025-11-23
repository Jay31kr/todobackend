import mongoose , {Schema , model} from "mongoose"

 const todoSchema = Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    isCompleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{timeStamps:true})

 const Todo = model("Todo",todoSchema);
 export default Todo;