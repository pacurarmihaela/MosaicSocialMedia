const commentReducer = (state ={comments: [], loading: false, error:false,uploading:false,deleting:false }, action)=>{
    switch(action.type){
        case "CREATE_COMMENT_START":
            return {...state, error: false,uploading:true };
        case "CREATE_COMMENT_SUCCESS":
            return {...state, comments:[action.payload, ...state.comments], uploading: false, error:false};
        case "CREATE_COMMENT_FAIL":
            return {...state, error: true, uploading:false};

        //deleting a comment
        case "DELETE_COMMENT_START":
            return {...state, deleting:true, error:null};
        case "DELETE_COMMENT_SUCCESS":
            const deletingComment = state.comments.filter(comment => comment._id !== action.payload);
            return {
                ...state,
                comments: deletingComment,
                deleting: false,
            };
        
        case "DELETE_COMMENT_FAIL":
            return {...state, deleting:false, error:true };
        
            //Fetching comments
            case "FETCH_COMMENTS_START":
                return {...state, loading: true,error:false};
            case "FETCH_COMMENTS_SUCCESS":
                console.log("Action payload:", action.payload);
                return {...state, comments: action.payload, loading:false, error:false};
            case "FETCH_COMMENTS_FAIL":
                return {...state, loading:false, error:true};

            //for uploading a comment
            case "UPLOAD_COMMENT_START":
                return {...state, uploading:true, error:false};
            case "UPLOAD_COMMENT_SUCCESS":
                return {...state, uploading:false}
            case "UPLOAD_COMMENT_FAIL":
                return {...state, uploading: false, error:true};
            default:
                return state;
    }
}

export default commentReducer;