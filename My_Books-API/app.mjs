import express from "express";
import "./loadEnvironment.mjs"
import cors from "cors";
import bookRouter from "./routes/book_route.mjs";
import userRouter from "./routes/user_route.mjs";
import { apiFunctions } from "./utils/apikey_functions.mjs";

const PORT = process.env.PORT;
const app = express();
const {apiAuth,apiIncluded} = apiFunctions;
//------------------------------------------------------------------------------------------------
//MIDDLEWARE:
app.use(cors());
app.use(express.json());
app.use(apiIncluded);
app.use(apiAuth);

//ROUTES:
app.use("/book", bookRouter);
app.use("/user", userRouter);


//--------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`My Books API listening on port ${PORT}`);
});