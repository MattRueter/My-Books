
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
function sanitizeButtonInput(req, res, next){
    // possilby unecessary but to avoid someone directly changing the text value of the sort buttons
    // and overriding / manipulating the sorting code.
    // find a better defense (using key or index for example)
    const acceptableInputs = ["title", "author_lastName", "language","have_read"];
    const test = acceptableInputs.findIndex((element) => element === req.query.sort);

    if(test < 0){
        res.send("button has changed")
    }else{
        next()
    }
}

function sanitizeInput(req,res,next){
    const regex = /[{}$()=]/g
    const reqBodyValues = Object.values(req.body);

    for(let i=0; i<reqBodyValues.length; i++){
        const match = reqBodyValues[i].match(regex)
        if(match){
            res.send("input can't contain the following characters { } ( ) $ = ");
            return
        }
    }

    next()
}

async function checkIfUserExits (req,res, next){
    const username = req.body.username;
    const response = await fetch(`https://my-books-api-2v9z.onrender.com/user/getUser/${username}`,{headers:{Authorization: apikey}});
    const data = await response.json();

    if(data.length > 0){
        res.status(403).send("Choose a different user name.")
    }else{
        next()
    }
}
export const utilityFunctions ={ checkQueryName, sanitizeInput, sanitizeButtonInput, checkIfUserExits };