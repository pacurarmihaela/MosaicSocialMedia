 

const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false },action) => {
  switch (action.type) {

    case "AUTH_START":
      return {...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action?.payload}));
      return {...state,  authData: action.payload, loading: false, error: false };
      case "AUTH_FAIL":
      return {...state, loading: false, error: true };

    case "UPDATING_START":
      return {...state, updateLoading: true , error: false}
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action?.payload}));
      return {...state, authData: action.payload, updateLoading: false, error: false}
     case "UPDATING_FAIL":
      return {...state, updateLoading: true, error: true}



    case "LOG_OUT_SUCCESS":
      localStorage.clear();
      return {...state,  authData: null, loading: false, error: false, updateLoading: false }
    case "LOG_OUT_FAIL":
      return { ...state, error: action.payload };
      case "DELETE_USER_START":
        // Set loading to true at the start of the deletion process
        return {
            ...state,
            loading: true,
            error: null, // Reset any previous errors
        };
    case "DELETE_USER_SUCCESS":
      localStorage.clear(); 
      return {
          ...state,
          authData: null,
          loading: false,
          error: null,
      };
    case "DELETE_USER_FAIL":
        return {
            ...state,
            loading: false,
            error: action.payload,
        };


    case "FOLLOW_USER":
      return {...state, authData: {...state.authData, user: {...state.authData.user, followings: [...state.authData.user.followings, action.data]} }}
    
    case "UNFOLLOW_USER":
      return {...state, authData: {...state.authData, user: {...state.authData.user, followings: [...state.authData.user.followings.filter((personId)=>personId!==action.data)]} }}

      default:
      return state;
  }
};

export default authReducer;