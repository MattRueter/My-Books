// This brings in dotenv and runs dotenv.config();
import "../loadEnvironment.mjs";
import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
const myDB ="myLibrary";

let conn;
try{
    conn = await client.connect();
}catch(e){
    console.log(e);
}

let db = conn.db(myDB);

export default db;
