import express from "express";
import { queryType } from "../query_functions/queryCmds.mjs";
import { utils } from "../utils/utility_functions.mjs"

const bookRouter = express.Router();
const currentCollection = "books";
const { 
    queryDB, 
    queryDB_sort, 
    queryDB_post, 
    queryDB_delete, 
    queryDB_updateOne,
    queryDB_updateMany,
    documentExists 
} = queryType;
const { convertToBoolean } = utils;

//READ: --------------------------------------------------------------------------------------------
//ADMIN //get ALL books and sort according to sorting preference.
bookRouter.get("/:sortby", async (req,res) => {
    const sort = { [req.params.sortby] : 1 }
    const query = {}
    const result = await queryDB_sort(query, currentCollection, sort);

    res.send(result).status(200);

});
//ADMIN  // get SOME books based on filter criteria
bookRouter.get("/:filter/:criteria", async (req,res) =>{
    //boolean check
    req.params.criteria = convertToBoolean(req.params.criteria)

    const filter ={ [req.params.filter] : req.params.criteria}
    const result = await queryDB(filter, currentCollection)

    res.status(200).send(result);
});


//READ
//MY BOOKS USERS //get ALL books of a given USER and SORT according to sorting preference.
bookRouter.get("/usersBooks/:userid/:sortby", async (req,res) => {
    const sort = { [req.params.sortby] : 1 }
    const userid = req.params.userid;
    const query = { owner: userid }
    const result = await queryDB_sort(query, currentCollection, sort);
    res.send(result).status(200);
});

//WRITE
//ADD a book.
bookRouter.post("/addBook/:bookObject", async(req,res) => {
    const newBook = JSON.parse(req.params.bookObject)
    const alreadyExists = await documentExists(newBook,currentCollection);


    if(alreadyExists){
        const errorMsg = JSON.stringify("Already exists");
        res.status(409).send(errorMsg)
    }else{
        const result = await queryDB_post(newBook, currentCollection)
        res.status(201).send(result);
    }
});


//DELETE a book.
bookRouter.delete("/deleteBook/:userid/:bookTitle", async(req,res) =>{
    const book =  req.params.bookTitle ;
    const owner = req.params.userid;
    const query = {owner:owner, title:book};

    const exists = await documentExists(query,currentCollection);
    
    
    if(exists){
        const result = await queryDB_delete(query,currentCollection);
        res.send(result)
    }else{
        const errorMsg = JSON.stringify("Book not found.");
        res.send(errorMsg);
    }
});


//UPDATE a book.
bookRouter.put("/updateOne/:bookTitle/:editedFieldsObject", async(req,res) => {
    const book = {title : req.params.bookTitle };
    const edit = JSON.parse(req.params.editedFieldsObject);

    const result = await queryDB_updateOne(book, currentCollection, edit);


    res.status(200).send(result);
});


//UPDATE several books
bookRouter.put("/updateMany/:query/:editedFieldsObject", async(req,res) => {
    const query = JSON.parse(req.params.query);
    const edit = JSON.parse(req.params.editedFieldsObject);

    const result = await queryDB_updateMany(query,currentCollection, edit)


    res.status(200).send(result);
});

export default bookRouter;