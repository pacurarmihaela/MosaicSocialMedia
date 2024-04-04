
import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });

    try {
        const { data } = await AuthApi.logIn(formData);
        localStorage.setItem('profile', data.token); 
       
        dispatch({ type: "AUTH_SUCCESS", payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: "AUTH_FAIL" });
    }
};


export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });

    try {
        const { data } = await AuthApi.signUp(formData);
        
        console.log(localStorage.setItem('token'))
        dispatch({ type: "AUTH_SUCCESS", payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: "AUTH_FAIL" });
    }
};


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('token'); // Clearing the specific token data
        dispatch({ type: "LOG_OUT_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOG_OUT_FAIL", payload: error });
        console.error("Logout failed", error);
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: "DELETE_USER_START" });

    try {
        
        const response = await AuthApi.deleteUser(userId);

        dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
        dispatch({
            type: "DELETE_USER_FAIL",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
