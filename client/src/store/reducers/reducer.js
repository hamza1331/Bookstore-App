import { 
    login,
    logout,
    addBookInStore,
    deleteBook,
    showBookModal,
    hideBookModal,
    showUpdateModal,
    hideUpdateModal,
    newBookUpdate
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    userName:'',
    books:[],
    bookModal:false,
    updateModal:false,
    updateBook:{},
    updateIndex:0
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return{
            ...state,
            isLoggedIn:true,
            userName:action.payload
        }
        case showUpdateModal:
        let newBook = state.books[action.payload]
        return {
            ...state,
            updateBook:newBook,
            updateModal:true,
            updateIndex:action.payload
        }
        case newBookUpdate:
        let updatedBooksArray = state.books.map((book,index)=>{
            if(index===state.updateIndex)
                return action.payload
            else
            return book
        })
        return {
            ...state,
            books:updatedBooksArray
        }
        case hideUpdateModal:
        return {
            ...state,
            updateBook:{},
            updateModal:false
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