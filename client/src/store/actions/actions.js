import { 
    login,
    logout,
    addBookInStore,
    deleteBook,
    showBookModal,
    hideBookModal,
    showUpdateModal,
    hideUpdateModal,
    newBookUpdate,
    pushGenre,
    deleteGenre,
    updateGenre
} from "./actionNames";



export function LoginAction(username){
    return dispatch=>{
        dispatch({
            type:login,
            payload:username
        })
    }
}
export function updateGenreAction(genre){
    return dispatch=>{
        dispatch({
            type:updateGenre,
            payload:genre
        })
    }
}
export function deleteGenreAction(id){
    return dispatch=>{
        dispatch({
            type:deleteGenre,
            payload:id
        })
    }
}
export function pushGenreAction(genre){
    return dispatch=>{
        dispatch({
            type:pushGenre,
            payload:genre
        })
    }
}

export function newBookUpdateAction(book){
    return dispatch=>{
        dispatch({
            type:newBookUpdate,
            payload:book
        })
    }
}

export function hideUpdateModalAction(){
    return dispatch=>{
        dispatch({
            type:hideUpdateModal
        })
    }
}

export function showUpdateModalaction(index){
    return dispatch=>{
        dispatch({
            type:showUpdateModal,
            payload:index
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