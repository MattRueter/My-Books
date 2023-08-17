import db from "../db/conn.mjs";

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

// ADD a book
async function queryDB_post (query, currentCollection){
    const collection = await db.collection(currentCollection);
    const result = await collection.insertOne(query);

    return result;
}

async function queryDB_delete(query, currentCollection){
    const collection = await db.collection(currentCollection);
    const result = await collection.deleteOne(query);

    return result;
};
async function queryDB_updateOne(query, currentCollection, edit){
    const collection = await db.collection(currentCollection);
    const result = await collection.updateOne(query, { $set : edit} );

    return result;
}
async function queryDB_updateMany(query, currentCollection, edit){
    const collection = await db.collection(currentCollection);
    const result = await collection.updateMany(query, { $set : edit} );

    return result;
}

// DB utilities:
//check new item isn´t already in DB.
async function documentExists (query, currentCollection) {
    let collection = await db.collection(currentCollection);
    let result = await collection.find(query).toArray();

    if(result.length > 0){
        return true
    }else{
        return false
    }
}

export const queryType = { 
    queryDB, 
    queryDB_sort, 
    queryDB_post, 
    queryDB_delete, 
    queryDB_updateOne,
    queryDB_updateMany,
    documentExists 
};