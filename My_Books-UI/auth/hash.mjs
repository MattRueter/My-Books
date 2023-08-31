import bcrypt from "bcrypt";

const hashPassword = async(password, saltRounds)=>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);        
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }catch (err){
        console.log(err);
    }
    return null;
};
const comparePassword = async (password, _dbPassword) => {
    try{
        const matchFound = await bcrypt.compare(password, _dbPassword);
        return matchFound;
    }catch (err){
        console.log(err);
    }
    return false;
};

export const hashsingMethods = {hashPassword, comparePassword};