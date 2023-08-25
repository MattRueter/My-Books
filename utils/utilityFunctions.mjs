function logger (req,res,next){
    console.log("--------- MY LOGGER ----------");
    console.log("logged in user:")

    console.log("------------ END -------------");
    next()
}


function checkQueryName(req, res, next){
    // sort buttons are labeled "author" and "status"
    // this middleware fixes them ahead of querying DB.
    // Would like to fix this on the client side.

    if(req.query.sort === "author"){
        req.query.sort = "author_lastName"
    }else if(req.query.sort === "status"){
        req.query.sort = "have_read"
    };
    next()
}

export const utilityFunctions ={ checkQueryName, logger };