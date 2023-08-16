import express from "express";
import db from "../db/conn.mjs";
import { queryType } from "../query_functions/queryCmds.mjs";

const bookRouter = express.Router();
const myCollection = "books";
const { queryDB } = queryType;

//READ:
//get all books.
bookRouter.get("/", async (req,res) => {
    const query = {}
    const result = await queryDB(query, myCollection);
    
    res.send(result).status(200);
});

export default bookRouter;