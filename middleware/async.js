const asyncWrapper = (fn)=>{
    return async (req, res, next)=>{
        try{
            await fn(req,res,next)
        } catch(error){
            //from next() we pass error to next middleware 
            next(error)
        }
    }
}

module.exports = asyncWrapper