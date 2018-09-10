import { 
    login,
    logout,
    addBookInStore
} from "./actionNames";



export function LoginAction(username){
    return dispatch=>{
        dispatch({
            type:login,
            payload:username
        })
    }
}
export function LogoutAction(){
    return dispatch=>{
        dispatch({
            type:logout
        })
    }
}

export function addBookInStoreAction(book){
    return dispatch=>{
        dispatch({
            type:addBookInStore,
            payload:book
        })
    }
}