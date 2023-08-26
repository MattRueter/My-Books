import express from "express";
import { queryType } from "../query_functions/queryCmds.mjs";

const userRouter = express.Router();
const currentCollection = "users";
const { queryDB} = queryType;

//READ
userRouter.get("/getUser/:username", async (req,res) =>{

    const username = req.params.username;
    const query = { username: username};
    const result = await queryDB(query, currentCollection);
    
    res.send(result);
});



export default userRouter;