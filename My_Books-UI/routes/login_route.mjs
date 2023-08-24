import express from "express";
import passport  from "passport";
import { authMethods } from "./auth.mjs";

const loginRouter = express.Router();
const { usePassportStrategy } = authMethods;


//MiddleWare-----------------------------
loginRouter.use(usePassportStrategy);

//ROUTES---------------------------------
loginRouter.get("/", (req,res) =>{
    res.render("login");
});

loginRouter.post("/",
    passport.authenticate("local", {failureRedirect: "/"}),
    (req, res) =>{
        res.redirect("/home");
    }
);


export default loginRouter;