import db from "../db/conn.mjs";

//generic find query 
// "query" query argument is defined on the route which calls query functions

//FIND:
async function queryDB (query, currentCollection){
    let collection = await db.collection(currentCollection);
    let result = await collection.find(query).toArray();

    return result
}
//FIND and SORT:
async function queryDB_sort(query, currentCollection, sortCriteria){
    let collection = await db.collection(currentCollection);
    let result = await collection.find(query).sort(sortCriteria).toArray();

    return result
}

//check new item isn´t already in DB.
async function isDuplicate (query, currentCollection) {
    let collection = await db.collection(currentCollection);
    let result = await collection.find(query).toArray();
  
    if(result.length > 0){
        return true
    }else{
        return false
    }
}

export const queryType = { queryDB, queryDB_sort, isDuplicate }