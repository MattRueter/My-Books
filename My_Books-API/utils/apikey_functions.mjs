import db from "../db/conn.mjs";

function apiIncluded(req,res,next){
    const apikey  = req.headers.authorization;
    if(apikey){
        next()
    }else{
        res.json("no api key")
    }
}

async function apiAuth (req, res, next) {
    const apikey = req.headers.authorization;
    const query ={api_key: apikey};
    let collection = await db.collection("clients");
    let result = await collection.find(query).toArray();
  
    result.length <= 0 ? result = null : result = result;

    if(result){
        next()
    }else{
        res.json("access denied.")
    }
}

export const apiFunctions ={ apiAuth, apiIncluded }