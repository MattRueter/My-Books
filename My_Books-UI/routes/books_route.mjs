import express from "express";
import fetch from "node-fetch";
import { paginationFunctions } from "../utils/pagination.mjs";
import books  from "../dummy_db.mjs";


//variables used in routes as well as Global STATE variables:---------------------------------------------------------------------------------
const { getTotalPages, createPages } = paginationFunctions;
const itemsPerPage = 5 // could be sent from UI based on preferences?
// currentBooks is being used to store copies of fetched data
// to avoid "unecessary" queries to DB. 
// Could be prolematic as POST and DELETE operations mean "state" becomes stale
// One solution would be to re-render list (query DB) after adding and deleting books.
// If so, keep the previous search critera and current page in state and use these to keep the view the same for the user.
let currentBooks;  //takes books and tucks them into "pages" [  [{},{}],  [{},{}]  ]; PAGINATION
let numberOfPages; // replaces booksCopy. Type=number kept in global state and perserves correct number of page buttons.
let currentView = {pages:0, books:[[{},{}], [{}]],query:"title", currentPage:1, } //this could be used to more succinctly deal with the above.

const bookRouter = express.Router();

// GET BOOKS ROUTE:----------------------------------------------------------------------------------------------------------------------------
bookRouter.get("/getAllBooks/:bySortValue", async (req,res) =>{
    /*  1.Fetches books by sort criteria from DB. Assigns this to global booksCopy variable for use in other routes.
        2.Paginates that data and sends only the first page to the front end.
        3.Assigns fetched data to global currentBooks. This is subsequently used on getPage routes avoids unecessary queries to DB.
        4. Creates objcet used by client for creating corrrect number of pages buttons.
    */

    // Task #1
    let query = req.query.sort
    // this is because of the value of the buttons on UI are also the "labels". Would be nice to get rid of this.
    if(query=== "author"){
        query = "author_lastName"
    }else if(query === "status"){
        query = "have_read"
    };
   // const response = await fetch(`http://localhost:5000/book/${query}`);
   // const books = await response.json();
    
    numberOfPages = getTotalPages(books,itemsPerPage);
    // Task #2
    const pages = createPages(numberOfPages, itemsPerPage, books);

    // Task #3 
    currentBooks = pages.map(page => page);
    
    // Task #4
    const pagination = {totalPages:getTotalPages(books, itemsPerPage)}
    
    res.render("home",{
        books : pages[0],
        pagination : pagination
    })
    
});

bookRouter.get("/:page", (req,res) => {
    /*
    when a user clicks a page button on the UI
    this route gets the request. :page (req.query.page) will get converted to type=nubmer
    and used to send books : page[toNumber(req.query.page)]
    pagination object sent as well so that the correct number of page buttons persist (re-render really).
    */
    
    // * booksCopy and currentBooks may be problematic as global copies of fetched data due to potential size.
    const currentPage = Number(req.query.page) -1 
    const pagination = {totalPages: numberOfPages}
    
    res.render("home", {
        books : currentBooks[currentPage],
        pagination :pagination
    })
});

export default bookRouter;