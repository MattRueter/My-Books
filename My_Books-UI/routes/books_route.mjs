import express from "express";
import fetch from "node-fetch";
import { paginationFunctions } from "../utils/pagination.mjs";
import { utilityFunctions } from "../utils/utilityFunctions.mjs";
import books  from "../dummy_db.mjs";

const bookRouter = express.Router();
const { getTotalPages, createPages } = paginationFunctions;
const { checkQueryName } = utilityFunctions;
let online = true;

// currentView global object----------------------------------------------------------------------------
    let currentView = {pages:0, perPage: 5, books:null, sortBy:"title", currentPage:1, }
    // currentView is being used to store copies of fetched data. 
    //It keeps current State to avoid unecessary queries to DB
  


// GET BOOKS ROUTE:----------------------------------------------------------------------------------------------------------------------------
bookRouter.get("/getAllBooks/:bySortValue", checkQueryName, async (req,res) =>{
    /*  RENDERING.
        1.Fetches books by sort criteria from DB. Assigns this to global booksCopy variable for use in other routes.
        2.Paginates that data and sends only the first page to the front end.
        STATE.
        3.Assigns paged fetched data to global currentView.books.
        4.Assigns total number of pages to global currentView.pages.
    */
    
    let usersBooks //defined here as still using online / offline toggling.
    
    // Task #1
    const sortBy = req.query.sort;
    
    if(online){
        console.log("online.")
        const userid = req.session.passport.user.id
        const response = await fetch(`http://localhost:5000/book/usersBooks/${userid}/${sortBy}`);
        usersBooks = await response.json();
    }else{
        console.log("offline.")
        usersBooks = books;
    }
    
    // update currentView Obj with QUERY.
    currentView.sortBy = sortBy

    // update currentView Obj with the TOTAL # OF PAGES in the collection.
    currentView.pages = getTotalPages(usersBooks,currentView.perPage);

    // update currentView Obj with "PAGED" ARRRAY of the collection.
    currentView.books = createPages(currentView.pages, currentView.perPage, usersBooks);
  
    res.render("home",{
        books : currentView.books[0],
        pagination : { totalPages: currentView.pages }
    })
});

bookRouter.get("/:page", (req,res) => {
    /*
    This route takes the book array saved in State (currentView) and manipulates it.
    when a user clicks a page button on the UI
    this route gets the request. :page (req.query.page) will get converted to type=nubmer
    and used to send books : page[toNumber(req.query.page)]
    pagination object sent as well so that the correct number of page buttons persist (re-render really).
    */
    currentView.currentPage = Number(req.query.page) -1
    res.render("home", {
        books : currentView.books[currentView.currentPage],
        pagination : {totalPages: currentView.pages}
    })
});

//---------------------- DELETE --------------------
bookRouter.post("/delete", async(req,res) =>{
    const userid = req.session.passport.user.id
    const title = req.body.title;
    const query = {id:userid, title:title};

    if(online){
        const response = await fetch(`http://localhost:5000/book/deleteBook/${userid}/${title}`)
        const deletedBook = await response.json()
        //res.render("home",{}) deconstruct currentView State variable to display the same page and sort criteria.
    }

    res.send(query);
});
bookRouter.post("/addBook", async(req,res) =>{
    const userid = req.session.passport.user.id
    const book ={
        title: req.body.title,
        author_lastName: req.body.author_lastName,
        author_firstName: req.body.author_firstName,
        language: req.body.language,
        owner: userid
    }
    //const response = await fetch();
    //const newBook = await response.json();

    res.send(book)
});

export default bookRouter;