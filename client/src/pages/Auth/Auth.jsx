import React, {useState} from "react";
import {logIn, signUp} from "../../actions/AuthAction";
import {useDispatch, useSelector} from "react-redux";
import {UilRaindrops} from "@iconscout/react-unicons";
import "./Auth.css"

//Define the Auth Component
const Auth = () => {
    const dispatch = useDispatch();
    // Fetching loading state from Redux store
    const loading = useSelector((state) => state.authReducer.loading);
    console.log(loading);
    // State for managing sign up and log in modes
    const [isSignUp, setIsSignUp] = useState(true);
    // State for managing form data
    const [data, setData] = useState({firstname: "", lastname: "", password: "", confirmpass: "", username:""})
    // State for managing password confirmation
    const [confirmPass, setConfirmPass] = useState(true);

    // Function to handle input change
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
       e.preventDefault();
       if(isSignUp){
         // If signing up, check if passwords match before dispatching sign up action
        data.password === data.confirmpass ? dispatch(signUp(data)):setConfirmPass(false);
       }else{
        // If logging in, dispatch log in action
        dispatch(logIn(data));
       }
    }

    // Function to reset form data and confirmation state
    const resetForm = () =>{
        setConfirmPass(true);
        setData({firstname: "", lastname:"", password:"", confirmpass:"", username:""});
    }

    return(
        <div className="Auth">
             {/* Left side of the authentication form */}
            <div className="a-left">
                <div className="webname">
                <UilRaindrops    />
                    <h1>Mosaic</h1>
                   <h5>Pin Your interest</h5>
                </div>
            </div>

            {/* FOR THE RIGHT SIDE */}
            <div className="a-right">
              <form className="infoForm authForm" onSubmit={handleSubmit}>
                <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

                {isSignUp &&
                
                <div>
                    <input type="text" placeholder="First Name" className="infoInput"name="firstname" onChange={handleChange} value={data.firstname}/>

                    <input type="text" placeholder="Last Name" className="infoInput"name="lastname" onChange={handleChange} value={data.lastname}/>

                </div>
                }

                <div>
                    <input type="text" className="infoInput" placeholder="Username" name="username" onChange={handleChange} value={data.username}/>
                </div>
                <div>
                    <input type="password" className="infoInput" placeholder="Password" name="password" onChange={handleChange} value={data.password} />
                    {isSignUp &&
                    <input type="password" className="infoInput" placeholder="Confirm Password" name="confirmpass" onChange={handleChange} data={data.confirmpass} />}
                </div>
                <span style={{display:confirmPass? "none":"block"}}>*Passwords don't match</span>

                <div>
                    <span onClick={()=> {setIsSignUp((prev)=>!prev); resetForm()}}>
                        {isSignUp ? "Already have an Account? Log In ": "Dont have an account? Sign up!"}
                    </span>
                </div>
                <button className="button infoButton" type="submit" disabled={loading}>
                    {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
                </button>

              </form>
            </div>
        </div>
    )
}

export default Auth;