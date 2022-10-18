import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js'
const checkAuth = async(req,res,next) =>{
   let token;
  
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
         token= req.headers.authorization.split(' ')[1];//separa a partir de un espacio (devuelve un arreglo) ya que solo se requiere el token despues del Bearer
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         
        req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        
         return next();
        } catch (error) {
          const errores = new Error("Token no valido");
          res.status(403).json({msg: errores.message});
        }

        if(!token){
          const errores = new Error("Token no valido");
          return res.status(403).json({msg: errores.message});
        }
        next();
   }

   


   
   next();
};

export default checkAuth;