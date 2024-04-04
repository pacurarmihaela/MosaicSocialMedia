const userInfoReducer = (state = {user: null, loading: false, error: false, updateLoading: false, exploreAccounts:[]}, action) => {
    switch (action.type) {
        case "RETRIEVE_INFO_START":
            return {...state, loading: true, error: false};
        case "RETRIEVE_INFO_SUCCESS":
            console.log("Retrieve Payload:", action.payload);
            return {...state, user: action.payload, loading: false, error: false};
        case "RETRIEVE_INFO_FAIL":
            return {...state, loading: false, error: true};

        case "UPDATING_START":
            return {...state, updateLoading: true, error:false}
        case "UPDATING_SUCCESS":
            console.log("Update Payload:",action.payload);
            localStorage.setItem("profile", JSON.stringify({...action?.payload}));
            return {...state,user:action.payload, updateLoading:false, error:false};
        case "UPDATING_FAIL":
            return{...state,updateLoading:false, error:true }

        case "FOLLOW_USER_START":
            return{...state, updateLoading: true, error:false}
        case "FOLLOW_USER_SUCCESS":
            console.log("Follow Payload:",action.payload);
            return{
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
                updateLoading:false,
                error:false
            }
        case "FOLLOW_USER_FAIL":
            return {...state, updateLoading:false, error:true}

        case "UNFOLLOW_USER_START":
            return {...state, updateLoading:true, error:false}
        case "UNFOLLOW_USER_SUCCESS":
            console.log("Unfollow Payload:",action.payload);
            return {
                ...state,
                user: {
                    ...state.user,
                    
                    followings: state.user.followings.filter((id) => id !== action.payload),
                },
                updateLoading: false,
                error: false,
            };
            case "UNFOLLOW_USER_FAIL":
                return{...state, updateLoading:false, error:true}


                case "EXPLORE_ACCOUNTS_START":
                    return {
                        ...state,
                        loading: true,
                        error: null, 
                    };
                    case "EXPLORE_ACCOUNTS_SUCCESS":
                      console.log("Retreieve explore accounts :",action.payload);
                    return {
                      ...state,
                      exploreAccounts: action.payload,
                      loading: false,
                    };
                  case "EXPLORE_ACCOUNTS_FAIL":
                    return {
                      ...state,
                      loading: false,
                      error: true, 
                    };
            
            default: 
            return state;
    }
}

export default userInfoReducer;