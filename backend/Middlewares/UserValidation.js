import joi from 'joi'
export const singupvalidation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
      
        password:joi.string().min(8).max(10).required()
    });
    const{error} = schema.validate(req.body);
    if(error){
        return res.json(error);
    }
    next();
}
export const loginvalidation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).max(10).required()
    });
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}