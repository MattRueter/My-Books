import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { paginationFunctions } from "./utils/pagination.mjs";

const PORT = 3000;
const app = express();
const { getTotalPages } = paginationFunctions;

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
    const query = req.query.sort
    //const response = await fetch(`http://localhost:5000/book/${queryValue}`);
    //const books = await response.json();
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
    
    //move pagination logic into fact funk or class which turns out needed object wherever it
    // may be needed.
    const itemsPerPage = 5
    const pagination = {totalPages:getTotalPages(books, itemsPerPage), perPage:itemsPerPage }

    res.render("home",{
        books: books,
        pagination: pagination
    })

});



//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Client UI listening on port ${PORT}`);
    
});




//---------------- NODE FETCH example ------------------------------
/*
const response = await fetch("http://localhost:5000/book/author/Simenon,Georges");
const data = await response.json();
console.log(data);
*/