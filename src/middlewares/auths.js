 const adminAuth=(req,res,next)=>{
    const token="xyz"
    const authorized=token ==="xyz"
    console.log()
    if(!authorized){
        res.status(401).send()
    }else{
        next()
    }
}


 const userAuth=(req,res,next)=>{
    const token="xyz"
    const authorized=token ==="xyz"
    console.log()
    if(!authorized){
        res.status(401).send()
    }else{
        next()
    }
}

module.exports={
    adminAuth,
    userAuth
}