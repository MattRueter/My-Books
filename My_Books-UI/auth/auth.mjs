import express from "express";
import fetch from "node-fetch";
import passport  from "passport";
import { Strategy } from "passport-local"
import { hashsingMethods } from "./hash.mjs";

const LocalStrategy = Strategy;
const { comparePassword } = hashsingMethods;

//Serialization----------------------------------------------------------------
passport.serializeUser((user, done) =>{
    done(null, {id:user._id, username:user.username})
});
passport.deserializeUser((user, done) =>{
    if(user){
        return done(null, user)
    }else{
        return done(err)
    }
});


//Strategy-----------------------------------------------------------------------
function usePassportStrategy (req,res,next){
    passport.use(
        new LocalStrategy(async function(username, password, cb) {
            //const user = users.filter(index => index.username == username);
            
            const response = await fetch(`http://localhost:5000/user/getUser/${username}`)
            const user = await response.json()
            
            //checks and returns if no user in DB
            if(user.length <=0){
                return cb(null,false)
            }
            // if user exists, compare inputed password with password in DB. 
            const dbPassword = user[0].password;
            const matchFound = await comparePassword(password, dbPassword);
            if(! matchFound){
                return cb(null, false)
            }
            
            if(matchFound){                
                return cb(null, user[0]);
            }
        })
    );
        next()
}

function checkIfAuthenticated(req,res, next) {
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()){
        res.status(404).send("You're not allowed in!")
    }
    next()
}
export const authMethods = { usePassportStrategy, checkIfAuthenticated }