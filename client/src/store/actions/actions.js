import { 
    login,
    logout,
    addBookInStore,
    deleteBook,
    showBookModal,
    hideBookModal
} from "./actionNames";



export function LoginAction(username){
    return dispatch=>{
        dispatch({
            type:login,
            payload:username
        })
    }
}
export function showBookModalAction(){
    return dispatch=>{
        dispatch({
            type:showBookModal
        })
    }
}
export function hideBookModalAction(){
    return dispatch=>{
        dispatch({
            type:hideBookModal
        })
    }
}
export function deleteBookAction(id){
    return dispatch=>{
        dispatch({
            type:deleteBook,
            payload:id
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