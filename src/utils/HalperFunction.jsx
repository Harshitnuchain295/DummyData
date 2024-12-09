
export const storeUserCredentails=({user_type,access,refresh})=>{
    localStorage.setItem("user_type",user_type)
    localStorage.setItem("access",access)
    localStorage.setItem("refresh",refresh)
}

export const GetUserCredentials=()=>{
    return {
        access: localStorage.getItem("access")||null,
    user_type: localStorage.getItem("user_type")||null,
    refresh: localStorage.getItem("refresh")|| null,
    }
}



export const ClearUserCredentials=()=>{
    localStorage.clear();
}

export const UpdateAccessToken=(access)=>{
    localStorage.setItem("access",access)
}
