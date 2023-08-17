import express from "express";
import "./loadEnvironment.mjs"
import cors from "cors";
import bookRouter from "./routes/book_route.mjs";



const PORT = process.env.PORT;
const app = express();
//------------------------------------------------------------------------------------------------
//MIDDLEWARE:
app.use(cors());
app.use(express.json());


//ROUTES:
app.use("/book", bookRouter);


//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`My Books listening on port ${PORT}`);
});