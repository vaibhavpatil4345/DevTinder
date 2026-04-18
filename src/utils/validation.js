const validator=require("validator")

const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body || {}

    if( !firstName || !lastName){
        throw new Error(" Please enter valid FirstName and LastName")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid email Id")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Please Enter strong password !")
    }
}

const validateEditProfileData= (req)=>{
const ALLOWED_EDIT_FIELDS = ["firstName","lastName","emailId","photoUrl", "gender", "age", "skills", "about"];
    const isEditAllowed = Object.keys(req.body).every((fields) =>
      ALLOWED_EDIT_FIELDS.includes(fields)
    );
    return isEditAllowed
}

module.exports={
    validateSignupData,
    validateEditProfileData
}