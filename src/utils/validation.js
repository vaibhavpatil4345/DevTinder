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

module.exports={
    validateSignupData,
}