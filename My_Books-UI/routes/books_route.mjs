import express from "express";
import fetch from "node-fetch";
import { paginationFunctions } from "../utils/pagination.mjs";
import { utilityFunctions } from "../utils/utilityFunctions.mjs";


const bookRouter = express.Router();
const apikey = process.env.API_KEY;
const { getTotalPages, createPages } = paginationFunctions;
const { checkQueryName, sanitizeInput, sanitizeButtonInput } = utilityFunctions;

// currentView global object----------------------------------------------------------------------------
    let currentView = {pages:0, perPage: 10, books:[], sortBy:"title", currentPage:1, }
    // currentView is being used to store copies of fetched data. 
    // It keeps current State to avoid unecessary queries to DB
    // Could also attach this to req once user logged in.
  


// GET BOOKS ROUTE:----------------------------------------------------------------------------------------------------------------------------
bookRouter.get("/getAllBooks/:bySortValue", checkQueryName, sanitizeButtonInput, async (req,res) =>{
    /*  RENDERING.
        1.Fetches books by sort criteria from DB. Assigns this to global booksCopy variable for use in other routes.
        2.Paginates that data and sends only the first page to the front end.
        STATE.
        Assigns values to global STATE variable 'currentView'.
    */
        const username = req.session.passport.user.username;
        // Create query:
        const sortBy = req.query.sort;
        const userid = req.session.passport.user.id
        const response = await fetch(`https://my-books-api-2v9z.onrender.com/book/usersBooks/${userid}/${sortBy}`,{headers:{Authorization: apikey}});
        const usersBooks = await response.json();
        
        // STATE: Update currentView Obj:
        currentView.sortBy = sortBy
        currentView.pages = getTotalPages(usersBooks,currentView.perPage);
        currentView.books = createPages(currentView.pages, currentView.perPage, usersBooks);
        
        // RENDER:
        if(usersBooks.length >0){
            res.render("home",{
                books : currentView.books[0],
                pagination : { totalPages: currentView.pages }
            })
        }else{
            res.render("home",{
                books: [],
                currentUser: username
            })
        }; 
});

bookRouter.get("/:page", (req,res) => {
    /*
    This route takes the book array saved in State (currentView) and manipulates it.
    when a user clicks a page button on the UI
    this route gets the request. :page (req.query.page) will get converted to type=nubmer
    and used to send books : page[toNumber(req.query.page)]
    pagination object sent as well so that the correct number of page buttons persist (re-render really).
    */
    const username = req.session.passport.user.username;
    
    // STATE: Update currentView obj:
    currentView.currentPage = Number(req.query.page) -1
    
    res.render("home", {
        books : currentView.books[currentView.currentPage],
        pagination : {totalPages: currentView.pages},
        currentUser: username
    })
});

//---------------------- DELETE --------------------
bookRouter.post("/delete", sanitizeInput,async(req,res) =>{
    const username = req.session.passport.user.username
    const userid = req.session.passport.user.id
    const title = req.body.title;

    const response = await fetch(`https://my-books-api-2v9z.onrender.com/book/deleteBook/${userid}/${title}`, {method:"DELETE", headers:{Authorization: apikey}});
    const deletedBook = await response
    console.log(deletedBook.status)
    if(deletedBook.status === "204"){
        res.end()
    }else{
        res.render("home",{
            books : [],
            pagination : {totalPages: currentView.pages},
            currentUser: username
        });         
    }

});

bookRouter.post("/addBook", sanitizeInput,async(req,res) =>{
    const username = req.session.passport.user.username
    const userid = req.session.passport.user.id
    const book ={
        title: req.body.title,
        author_lastName: req.body.author_lastName,
        author_firstName: req.body.author_firstName,
        language: req.body.language,
        owner: userid
    }
    const bookString = JSON.stringify(book)
    
    const response = await fetch(`https://my-books-api-2v9z.onrender.com/book/addBook/${bookString}`, {method:"POST", headers:{Authorization: apikey}} );
    //const newBook = await response.json();

    res.render("home",{
        books : [],
        pagination : {totalPages: currentView.pages},
        currentUser: username
    })
});

export default bookRouter;