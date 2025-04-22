import User from "../model/UserSchema.js";
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { transporter } from "../config/nodemailer.js";

export const signup =async(req,res)=>
{

    const{name,email,password} = req.body;

    if(!email || !name || !password)
    {
        res.json({success:false,message:"All fields required"})

    }

    try {

        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            res.json({success:false,message:"User Already Exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({name ,email, password:hashedPassword})
        console.log("name :",name,"email:",email,"password:",password);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
        
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const mailOptions = {
              from: process.env.SMTP_SENDER,
              to: email,
              subject: "Welcome to Auto Quiz ",
              text: "Get ready to challenge your mind, sharpen your skills, and have some fun along the way . We're thrilled to have you join our quiz-loving community — let the journey begin! 🚀",
            };
            await transporter.sendMail(mailOptions);

        res.json({success:true,message:"Successfully Created"})
        
    } catch (error) {
        console.log("error is ", error.message)
        res.json({success:false,message:"Sign Up failed"})
    }

}

export const Login = async(req,res)=>
{

    const{email,password} = req.body;
    // ...existing code...

try {
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const findUser = await User.findOne({ email });
    if (!findUser) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
    
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

    // Successful login
    return res.status(200).json({ success: true, message: "Login successful" });

} catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "An error occurred during login" });
}

// ...existing code...
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ succes: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ succes: false, mesage: error.message });
  }
};

export const isAuthenticated = (req,res)=>
  {
     try {
      res.json({success:true, message:"Succesfully Autheticated"});
  
     } catch (error) {
      console.log(error.message);
      res.json({ succes: false, mesage: error.message });
     }
  }