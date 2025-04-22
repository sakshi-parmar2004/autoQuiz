import User from "../model/UserSchema.js";


export const getData = async(req,res)=>
{
    const { userId } = req.body;
  console.log("userId", userId)

    try {
        const user = await User.findOne({_id:userId});

    if(!user)
    {
        return res.json({success:false ,message:"Invalid User"})
    }

   return res.json({success:true, userData:{
        name: user.name,
        email:user.email
      
    }})
        
    } catch (error) {
        console.log(error.message);
       return res.json({success:false,message:error.message});
        
    }
    

}