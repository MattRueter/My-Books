function convertToBoolean (params) {
    if(params === "true"){
        return true

    }else if(params === "false" ){
        return false
    }else{
        return params
    }
};


export const utils = { convertToBoolean }