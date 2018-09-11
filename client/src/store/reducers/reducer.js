import { 
    login,
    logout,
    addBookInStore,
    deleteBook,
    showBookModal,
    hideBookModal
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    userName:'',
    books:[],
    bookModal:false
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return{
            ...state,
            isLoggedIn:true,
            userName:action.payload
        }
        case showBookModal:
        return{
            ...state,
            bookModal:true
        }
        case hideBookModal:
        return {
            ...state,
            bookModal:false
        }
        case deleteBook:
        let updatedBooks = state.books.filter(book=>book._id!==action.payload)
        return{
            ...state,
            books:updatedBooks
        }
        case logout:
        return {
            ...state,
            isLoggedIn:false,
            userName:''
        }
        case addBookInStore:
        return {
            ...state,
            books:[...state.books,action.payload]
        }
        default:
        return state
    }
}