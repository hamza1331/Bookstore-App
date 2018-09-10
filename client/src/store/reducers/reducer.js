import { 
    login,
    logout,
    addBookInStore

} from "../actions/actionNames";
const initialState = {
    isLoggedIn:false,
    userName:'',
    books:[]
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return{
            ...state,
            isLoggedIn:true,
            userName:action.payload
        }
        case logout:
        return {
            ...state,
            isLoggedIn:false,
            userName:''
        }
        case addBookInStore:
        console.log(action.payload)
        return {
            ...state,
            books:[...state.books,action.payload]
        }
        default:
        return state
    }
}