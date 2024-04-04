const postReducer = (
    state = { posts: [], loading: false, error: false,deleting:false, uploading: false, desc:''},
    action
  ) => {
    switch (action.type) {
      // belongs to PostShare.jsx
      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "UPLOAD_SUCCESS":
        return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
      case "UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };
      // belongs to Posts.jsx
      case "RETRIEVING_START":
        return { ...state, loading: true, error: false };
      case "RETRIEVING_SUCCESS":
        return { ...state, posts: action.data, loading: false, error: false };
      case "RETRIEVING_FAIL":
        return { ...state, loading: false, error: true };

      case "EDIT_DESC_START":
        return{...state, editing:true, error:false};
        case "EDIT_DESC_SUCCESS":
              const updatedPost = { ...state.posts, desc: action.payload.desc };
              return { ...state, posts: updatedPost, editing: false, error: false };    
      case "EDIT_DESC_FAIL":
        return{...state, editing:false, error:true}

      case "DELETE_POST_START":
        return{...state, deleting:true,error:null};
      case "DELETE_POST_SUCCESS":
        const deletingPost = state.posts.filter(post => post._id !== action.payload);
            return {
                ...state,
                posts: deletingPost,
                deleting: false,
            };
      case "DELETE_POST_FAIL":
        return{...state, deleting:false, error:true}

      default:
        return state;
    }
  };
  
  export default postReducer;