import { 
    login,
    logout

} from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    userName:'',
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        console.log(action.payload)
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
        default:
        return state
    }
}