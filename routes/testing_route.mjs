import express from "express";
import { queryType } from "../query_functions/queryCmds.mjs";

const testingRouter = express.Router();
const myCollection = "authors";
const {queryDB, queryDB_sort, isDuplicate } = queryType

const queryLibrary ={
    all: {},
    spanishOnly: { languages: ["Spanish"] },
    frenchOnly: { languages: ["French"] },
    englishOnly: { languages: ["English"] },
    

}

// "Fake" routes for practicing MongoDB queries.
// ALL AUTHORS:
testingRouter.get("/all", async (req,res) =>{
    
    const query = queryLibrary.all
    const result = await queryDB(query, myCollection)
    res.send(result).status(200);
});

// ALL AUTHORS SORTED ALPABETICALLY BY LAST NAME:
testingRouter.get("/allSorted", async (req,res) =>{

    const query = queryLibrary.all
    const sortCriteria = {last_name : 1};
    const result = await queryDB_sort(query, myCollection, sortCriteria)
    res.send(result).status(200);
});


testingRouter.get("/exists", async (req,res) => {
    const query = { last_name : "Laforet" };
    const result = await isDuplicate(query, myCollection);
    res.send(result)
});
export default testingRouter;