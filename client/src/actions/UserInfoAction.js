import * as UserApi from "../api/UserRequest";


export const getUser = (id) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_INFO_START" });
    try {
        const { data } = await UserApi.getUser(id);
        console.log("Retrieve info ACTION:", data);
        dispatch({ type: "RETRIEVE_INFO_SUCCESS", payload: data }); 
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETRIEVE_INFO_FAIL" });
    }
};


export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action for updating : ",data)
        dispatch({type: "UPDATING_SUCCESS", payload: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}


export const followUser = (userId, followId)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER_START"});
    try{
        const {data} = await UserApi.followUser(userId, followId);

        dispatch({type: "FOLLOW_USER_SUCCESS", payload: followId})

    }catch(error){
        dispatch({type: "FOLLOW_USER_FAIL"});
        console.log("Failed to follow user:", error);
    }
}

export const unfollowUser = (userId, unfollowId)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER_START"});
    try{
       const {data} = await UserApi.unfollowUser(userId, unfollowId)

        dispatch({type: "UNFOLLOW_USER_SUCCESS", payload: unfollowId})
    }
    catch(error){
        console.log(error);
        dispatch({type: "UNFOLLOW_USER_FAIL"});
    }
}

export const getExploreAccounts = (userId)=> async(dispatch)=>{
    dispatch({type: "EXPLORE_ACCOUNTS_START"});
    try{
        const {data} = await UserApi.getExploreAccounts(userId)

        dispatch({type: "EXPLORE_ACCOUNTS_SUCCESS", payload: data})

    }catch(error){
        console.log(error);
        dispatch({type: "EXPLORE_ACCOUNTS_FAIL"});
    }
}