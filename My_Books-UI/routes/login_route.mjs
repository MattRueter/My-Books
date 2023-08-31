import express from "express";
import passport  from "passport";
import { authMethods } from "../auth/auth.mjs";
import { hashsingMethods } from "../auth/hash.mjs";
import { utilityFunctions } from "../utils/utilityFunctions.mjs";

const loginRouter = express.Router();
const apikey = process.env.API_KEY;
const { usePassportStrategy } = authMethods;
const { hashPassword } = hashsingMethods;
const { sanitizeInput } = utilityFunctions;

//MiddleWare-----------------------------
loginRouter.use(usePassportStrategy);

//ROUTES---------------------------------
loginRouter.get("/", (req,res) =>{
    res.render("login",{
       messageDisplay: "hideMessage" 
    });
});

loginRouter.get("/error", (req,res) =>{
    res.render("login",{
        messageDisplay: "showMessage",
        errorMessage: "username or password incorrect."
    });
});

loginRouter.post("/",
    passport.authenticate("local", {failureRedirect: "/login/error"}),
    (req, res) =>{
        console.log(req.session.passport.user)
        res.redirect("/home");
    }
);

//SIGNING UP:
loginRouter.post("/signup", sanitizeInput, async(req,res) =>{
    const newUser= req.body.username;
    let newPassword = req.body.password;

    //HASH password here:
    const hashedPassword = await hashPassword(newPassword, 10);
    const user = { username:newUser, password: hashedPassword };
    const newuser = JSON.stringify(user)

    const response = await fetch(`https://my-books-api-2v9z.onrender.com/user/adduser/${newuser}` ,{method:"POST", headers:{Authorization: apikey}})
    
    //log new user in as part of signup process:
    req.login(user, (err)=>{
      if(err){
        return next(err)
      }  
      res.redirect("/home");
    });
});


loginRouter.get("/logout", (req, res) =>{
    req.logout(function(err){
     
     if(err){ return next(err);}
        res.redirect("/")
    });
 });

export default loginRouter;