import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { paginationFunctions } from "./utils/pagination.mjs";

const PORT = 3000;
const app = express();
const { getTotalPages, createPages } = paginationFunctions;
const itemsPerPage = 5 // could be sent from UI based on preferences?
let currentBooks;
let booksCopy;
const books =[
    {
    author: "Italo Calvino",
    author_firstName: "Italo",
    author_lastName: "Calvino",
    genres: 
    (2) ['Italian Literature', 'Short Stories'],
    have_read: true, 
    language: "English",
    title: "Baron in the Trees", 
    _id: "64dd6e812448e1d7a4c7dd8b"
    },
    {
    author: "Italo Calvino",
    author_firstName: "Italo",
    author_lastName: "Balvino",
    genres: 
    (2) ['Italian Literature', 'Short Stories'],
    have_read: true, 
    language: "English",
    title: "Invisible Cities", 
    _id: "64dd6e812448e1d7a4c7dd8b"
    },
    {
    author: "Italo Calvino",
    author_firstName: "Italo",
    author_lastName: "Stalinalvino",
    genres: 
    (2) ['Italian Literature', 'Short Stories'],
    have_read: true, 
    language: "English",
    title: "If on a Winter's Night a Traveler.", 
    _id: "64dd6e812448e1d7a4c7dd8b"
    },
    {
    author: "Italo Calvino",
    author_firstName: "Italo",
    author_lastName: "Malvino",
    genres: 
    (2) ['Italian Literature', 'Short Stories'],
    have_read: true, 
    language: "English",
    title: "Adam, One Afternoon", 
    _id: "64dd6e812448e1d7a4c7dd8b"
    },
    {
        author: "Italo Calvino",
        author_firstName: "Italo",
        author_lastName: "Calvino",
        genres: 
        (2) ['Italian Literature', 'Short Stories'],
        have_read: true, 
        language: "English",
        title: "Baron in the Trees", 
        _id: "64dd6e812448e1d7a4c7dd8b"
        },
        {
        author: "Italo Calvino",
        author_firstName: "Italo",
        author_lastName: "Balvino",
        genres: 
        (2) ['Italian Literature', 'Short Stories'],
        have_read: true, 
        language: "English",
        title: "Invisible Cities", 
        _id: "64dd6e812448e1d7a4c7dd8b"
        },
        {
        author: "Italo Calvino",
        author_firstName: "Italo",
        author_lastName: "Stalinalvino",
        genres: 
        (2) ['Italian Literature', 'Short Stories'],
        have_read: true, 
        language: "English",
        title: "If on a Winter's Night a Traveler.", 
        _id: "64dd6e812448e1d7a4c7dd8b"
        },
        {
        author: "Italo Calvino",
        author_firstName: "Italo",
        author_lastName: "Malvino",
        genres: 
        (2) ['Italian Literature', 'Short Stories'],
        have_read: true, 
        language: "English",
        title: "Adam, One Afternoon", 
        _id: "64dd6e812448e1d7a4c7dd8b"
        },
        {
            author: "Italo Calvino",
            author_firstName: "Italo",
            author_lastName: "Calvino",
            genres: 
            (2) ['Italian Literature', 'Short Stories'],
            have_read: true, 
            language: "English",
            title: "Baron in the Trees", 
            _id: "64dd6e812448e1d7a4c7dd8b"
            },
            {
            author: "Italo Calvino",
            author_firstName: "Italo",
            author_lastName: "Balvino",
            genres: 
            (2) ['Italian Literature', 'Short Stories'],
            have_read: true, 
            language: "English",
            title: "Invisible Cities", 
            _id: "64dd6e812448e1d7a4c7dd8b"
            },
            {
            author: "Italo Calvino",
            author_firstName: "Italo",
            author_lastName: "Stalinalvino",
            genres: 
            (2) ['Italian Literature', 'Short Stories'],
            have_read: true, 
            language: "English",
            title: "If on a Winter's Night a Traveler.", 
            _id: "64dd6e812448e1d7a4c7dd8b"
            },
            {
            author: "Italo Calvino",
            author_firstName: "Italo",
            author_lastName: "Malvino",
            genres: 
            (2) ['Italian Literature', 'Short Stories'],
            have_read: true, 
            language: "English",
            title: "Adam, One Afternoon", 
            _id: "64dd6e812448e1d7a4c7dd8b"
            },
            {
                author: "Italo Calvino",
                author_firstName: "Italo",
                author_lastName: "Calvino",
                genres: 
                (2) ['Italian Literature', 'Short Stories'],
                have_read: true, 
                language: "English",
                title: "Baron in the Trees", 
                _id: "64dd6e812448e1d7a4c7dd8b"
                },
                {
                author: "Italo Calvino",
                author_firstName: "Italo",
                author_lastName: "Balvino",
                genres: 
                (2) ['Italian Literature', 'Short Stories'],
                have_read: true, 
                language: "English",
                title: "Invisible Cities", 
                _id: "64dd6e812448e1d7a4c7dd8b"
                },
                {
                author: "Italo Calvino",
                author_firstName: "Italo",
                author_lastName: "Stalinalvino",
                genres: 
                (2) ['Italian Literature', 'Short Stories'],
                have_read: true, 
                language: "English",
                title: "If on a Winter's Night a Traveler.", 
                _id: "64dd6e812448e1d7a4c7dd8b"
                },
                {
                author: "Italo Calvino",
                author_firstName: "Italo",
                author_lastName: "Malvino",
                genres: 
                (2) ['Italian Literature', 'Short Stories'],
                have_read: true, 
                language: "English",
                title: "Adam, One Afternoon", 
                _id: "64dd6e812448e1d7a4c7dd8b"
                },
]

//------------------------------------------------------------------------------------------------
//MIDDLEWARE:
app.set('view engine', 'pug');
app.use(cors());
app.use(express.json());
app.use(express.static("./"));


// ROUTES ----------------------------------------------------
app.get("/", (req,res) =>{
    //just sending the html files for now.
    res.render("home", {books:[]})
});



app.get("/getAllBooks/:bySortValue", async (req,res) =>{
    /*  1.Fetches books by sort criteria from DB.
        2.Paginates that data and sends only the first page to the front end.
        3.Assigns fetched data to global currentBooks. This is subsequently used on getPage routes avoids unecessary queries to DB.
        4. Creates objcet used by client for creating corrrect number of pages buttons.
    */

    // Task #1
    const query = req.query.sort
    //const response = await fetch(`http://localhost:5000/book/${queryValue}`);
    //const books = await response.json();
    booksCopy = books.map(page => page);

    // Task #2
    const pages = createPages(getTotalPages(books,itemsPerPage), itemsPerPage, books);

    // Task #3
    currentBooks = pages.map(page => page);
    
    // Task #4
    const pagination = {totalPages:getTotalPages(books, itemsPerPage), perPage:itemsPerPage }
    
    res.render("home",{
        books : pages[0],
        pagination : pagination
    })
    
});

app.get("/getPage/:page", (req,res) => {
    /*
    when a user clicks a page button on the UI
    this route gets the request. :page (req.query.page) will get converted to type=nubmer
    and used to send books : page[toNumber(req.query.page)]
    pagination object sent as well so that the correct number of page buttons persist (re-render really).
    */
    // * Books and currentBooks may be problematic as global copies of fetched data due to potential size.
    const currentPage = Number(req.query.page) -1 
    const pagination = {totalPages:getTotalPages(booksCopy, itemsPerPage), perPage:itemsPerPage }
    
    res.render("home", {
        books : currentBooks[currentPage],
        pagination :pagination
    })
});



//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`My Books Client is listening on port ${PORT}`);
    
});




//---------------- NODE FETCH example ------------------------------
/*
const response = await fetch("http://localhost:5000/book/author/Simenon,Georges");
const data = await response.json();
console.log(data);
*/