import express from "express";
import passport  from "passport";
import { Strategy } from "passport-local"
import users from "../dummy_users.mjs"; // will be replaced with calls to API

const LocalStrategy = Strategy;

//serialization.
passport.serializeUser((user, done) =>{
    done(null, {id:user.id, username:user.username})
});

passport.deserializeUser((user, done) =>{
    const userObj = users.filter(index => index.id === user.id);
    if(user){
        return done(null, user)
    }else{
        return done(err)
    }
});


//Strategy.
function usePassportStrategy (req,res,next){
    passport.use(
        new LocalStrategy(async function(username, password, cb) {
            
            const user = users.filter(index => index.username == username);
            let matchFound;
            
            //checks returns if no user in DB
            if(user.length <=0){
                return cb(null,false)
            }
            
            //temp check of password match. BCRYPT methods will replace this. 
            password == user[0].password ? matchFound = true : matchFound = false
            //const matchFound = await comparePassword(password, user[0].password);
            if(! matchFound){
                return cb(null, false)
            }
            
            if(matchFound){                
                return cb(null, user[0])
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