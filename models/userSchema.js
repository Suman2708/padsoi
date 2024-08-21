const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretkey=process.env.KEY;
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("email is not valid");
            }
        }

    },
    mobile_no:{
        type:String,
        required:true,
        unique:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirm_password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
}],
carts:Array
});
userSchema.pre("save",async function(next){

    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
        this.confirm_password=await bcrypt.hash(this.confirm_password,12);
    }
      next();
});


userSchema.methods.generateAuthTokens=async function(){

   try{
    let token = jwt.sign({_id:this.id},secretkey);
    this.tokens=this.tokens.concat({token:token}); //phla bala token(schema ka h)-dusra bala  jo let token h
    await this.save();
    return token;
   }catch(error){
      console.log(error);
   }




}


userSchema.methods.addtocarts=async function(cart){

    try{
         this.carts=this.carts.concat(cart);

         await this.save();
         return this.carts;
    }catch(error){
        console.log(error);
    }
}
const USER=new mongoose.model("USER",userSchema);



module.exports=USER;