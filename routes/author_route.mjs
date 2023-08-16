import express from "express";
import db from "../db/conn.mjs";
import { queryType } from "../query_functions/queryCmds.mjs";


const authorRouter = express.Router();
const myCollection = "authors"; 
const { queryDB , queryDB_sort, isDuplicate} = queryType

//READ: ----------------------------------------------------------------------------

//GET ALL AUTHORS
authorRouter.get("/allAuthors", async (req,res) => {
    const query = {}
    const result = await queryDB(query, myCollection);

    res.send(result).status(200);
});

//GET ALL AUTHORS SORTED:
authorRouter.get("/allAuthorsSorted", async (req,res) => {
    const query = {};
    const sortCriteria = {last_name : 1};
    const result = await queryDB_sort(query, myCollection, sortCriteria)

    res.send(result).status(200);
});

//GET AUTHOR BY LAST NAME
authorRouter.get("/:lastname", async(req,res) => {
    let query = { last_name: req.params.lastname};
    const result = await queryDB(query, myCollection);

    if(result.length <=0){
        res.send("Not Found.").status(404)
    }else{
        res.send(result).status(200);
    }
});

//CREATE--------------------------------------------------------------------------------

//ADD AUTHOR
authorRouter.post("/:newDocument", async(req,res) => {
    let newDocument = {
        last_name: req.query.lastname,
        first_name: req.query.firstname,
        languages: [req.query.languages]
    }
    //Checks if author alraady in DB. *only checks by name.
    const {last_name, first_name} = newDocument;
    const alreadyExists = await isDuplicate({last_name,first_name}, myCollection)

    if(!alreadyExists){
        let collection = await db.collection(myCollection);
        let result = await collection.insertOne(newDocument);
        res.status(204).send(result);
    }else{

        res.status(403).send(alreadyExists)
    }

});



export default authorRouter;