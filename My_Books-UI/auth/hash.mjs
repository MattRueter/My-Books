import bcrypt from "bcrypt";

const udb = [
    {id:555, username: "ted", password:"$2b$10$mYRMSXCrJUBMjrpKkoyVDeo.q4CP8378vET5eJDYMWnUDFwjQzJNy"},
    {id:777, username: "jill", password: "funk"},
];

const hashPassword = async(password, saltRounds)=>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);        
        const hash = await bcrypt.hash(password, salt);
        console.log("");
        console.log("---- Hashed and salted password below:--------- ");
        console.log(hash);
        console.log("---------END OF HASHING-------------------------");
        console.log("");
        return hash;
    }catch (err){
        console.log(err);
    }
    return null;
};
const comparePassword = async (password, _dbPassword) => {
    try{
        const matchFound = await bcrypt.compare(password, _dbPassword);
        console.log("");
        console.log("---------CHECKING PASSWORD ---------------");
        console.log(`INPUT: ${password}, DB: ${_dbPassword}`);
        console.log(`Does password match? ${matchFound}`);
        console.log("------END OF CHECKING PASSWORD------------");
        console.log("");
        return matchFound;
    }catch (err){
        console.log(err);
    }
    return false;
};

export const hashsingMethods = {hashPassword, comparePassword};