import express from "express";
import passport  from "passport";
import { authMethods } from "../auth/auth.mjs";

const loginRouter = express.Router();
const { usePassportStrategy } = authMethods;


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

loginRouter.get("/logout", (req, res) =>{
    req.logout(function(err){
     
     if(err){ return next(err);}
        res.redirect("/")
    });
 });

export default loginRouter;