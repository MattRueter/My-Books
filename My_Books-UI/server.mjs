import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { dirname } from "path";
import { fileURLToPath } from "url";


const PORT = 3000;
//const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(__dirname)
const app = express();



//------------------------------------------------------------------------------------------------
//MIDDLEWARE:
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(express.static("./"));
/*
app.use(
    express.urlencoded({
      extended: true,
    })
);
*/

app.get("/home", (req,res) =>{
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
    

    res.render("home",{
        books: books
    })

    res.end()
});



//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Client UI listening on port ${PORT}`);
    
});

//rework with pug?
app.post("/login", (req,res) =>{
    console.log("from login");
    console.log(req.body.password);
    
    if(req.body.password === "testingly"){
        res.redirect("/home")
        //res.sendFile(__dirname + "/index.html")
    }else{
        res.sendFile(__dirname + "/login.html")
    };

});




//---------------- NODE FETCH example ------------------------------
/*
const response = await fetch("http://localhost:5000/book/author/Simenon,Georges");
const data = await response.json();
console.log(data);
*/