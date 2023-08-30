import express from "express";
import { queryType } from "../query_functions/queryCmds.mjs";

const userRouter = express.Router();
const currentCollection = "users";
const { queryDB, queryDB_post} = queryType;


//READ  
userRouter.get("/getUser/:username", async (req,res) =>{

    const username = req.params.username;
    const query = { username: username};
    const result = await queryDB(query, currentCollection);
    
    res.send(result);
});

//WRITE
userRouter.post("/adduser/:newuser", async (req,res) => {
    const user = JSON.parse(req.params.newuser);
    const result = await queryDB_post(user,"users");
 
    res.send(result);
});

export default userRouter;