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
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    userName:'',
    books:[],
    bookModal:false,
    updateModal:false,
    updateBook:{},
    updateIndex:0,
    genres:[]
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
        case updateGenre:
        let updatedGenresArray = state.genres.map((genre)=>{
            if(genre._id===action.payload.id)
                return action.payload.data
            else
                return genre
        })
        return {
            ...state,
            genres:updatedGenresArray
        }
        case hideBookModal:
        return {
            ...state,
            bookModal:false
        }
        case pushGenre:
        return {
            ...state,
            genres:[...state.genres,action.payload]
        }
        case deleteBook:
        let updatedBooks = state.books.filter(book=>book._id!==action.payload)
        return{
            ...state,
            books:updatedBooks
        }
        case deleteGenre:
        let updatedGenres = state.genres.filter(genre=>genre._id!==action.payload)
        return {
            ...state,
            genres:updatedGenres
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