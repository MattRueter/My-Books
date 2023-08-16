import express from "express";
import db from "../db/conn.mjs";
import { queryType } from "../query_functions/queryCmds.mjs";
import { utils } from "../utils/utility_functions.mjs"

const bookRouter = express.Router();
const currentCollection = "books";
const { queryDB, queryDB_sort } = queryType;
const { convertToBoolean } = utils;
//READ:
//get ALL books and sort according to sorting preference.
bookRouter.get("/:sortby", async (req,res) => {
    const sort = { [req.params.sortby] : 1 }
    const query = {}
    const result = await queryDB_sort(query, currentCollection, sort);

    res.send(result).status(200);

});
// get SOME books based on filter criteria
bookRouter.get("/:filter/:criteria", async (req,res) =>{
    //boolean check
    req.params.criteria = convertToBoolean(req.params.criteria)
    const filter ={ [req.params.filter] : req.params.criteria}
    console.log(filter)
    const result = await queryDB(filter, currentCollection)

    res.send(result).status(200);
});


export default bookRouter;