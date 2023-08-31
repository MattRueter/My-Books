import express from "express";
import fetch from "node-fetch";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "./loadEnvironment.mjs";

import session from "express-session";
import passport  from "passport";
import { authMethods } from "./auth/auth.mjs";

import loginRouter from "./routes/login_route.mjs";
import bookRouter from "./routes/books_route.mjs";


const PORT = process.env.PORT;
const secret= process.env.SECRET

const app = express();
const {checkIfAuthenticated } = authMethods;
const store = new session.MemoryStore();


//------------------------------------------------------------------------------------------------
//MIDDLEWARE:
app.set('view engine', 'pug');
app.use(helmet({
    contentSecurityPolicy:{
        directives:{
            scriptSrc: ["'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"]
        }
    }
}));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("./"));
app.use(express.urlencoded({ extended: true }));

//SESSION
app.use(
    session({
        secret: secret, //hardcoded
        //cookie: {maxAge: 172800000, secure: true, sameSite: "none"}, 
        //cookie seems to conflict with serialization/deserialization.
        resave:false,
        saveUninitialized: false,
        store,
    })
);

//PASSPORT -----------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());



// ROUTES ----------------------------------------------------
app.use("/login", loginRouter);
app.use("/book", bookRouter)

app.get("/", (req,res) =>{
    res.redirect("/login")
});
app.get("/home", checkIfAuthenticated, (req,res) =>{
        res.render("home", {books: []})
});



//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`My Books Client is listening on port ${PORT}`);
    
});