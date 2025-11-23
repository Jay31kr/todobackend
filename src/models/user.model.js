import  { model , Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = Schema({
    userName : {type:String,required:true, unique:true, index:true, loweCase:true, },
    email : {type:String, required:true, unique:true ,lowercase:true},
    passWord : {type:String , reuired :true, minlen:[8,"pasword should contain atleast 8 characters"] }
},
{timeStamps : true});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password, process.env.BCRYPT_SALT_ROUNDS || 10)
    next();
})

userSchema.methods.isPasswordCorrect=async function(passWord){
    return await bcrypt.compare(passWord,this.passWord)
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


 const User = model("User" , userSchema  );
 export default User;