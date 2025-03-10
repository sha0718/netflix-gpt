import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {

    const [isSignINform, setIsSignINform] = useState(true);

    const [errorMessage, setErrorMessage] = useState(null); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const name = useRef(null);  
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => { 
        if (!email.current || !password.current || (!isSignINform && !name.current)) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        console.log(email.current.value); 
        console.log(password.current.value);
         console.log(name.current ? name.current.value : '');

        const message = checkValidData(email.current.value, password.current.value, name.current ? name.current.value : '');
        setErrorMessage(message);

        if (message) return;

        if (!isSignINform) {
            console.log("Sign Up function");
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/162859986?s=400&v=4"
                      }).then(() => {
                        const {uid , email, displayName, photoURL} = auth.currentUser;
                                        dispatch(addUser({ uid : uid , email : email, displayName : displayName, photoURL : photoURL}));
                        
                        navigate("/browse");
                      }).catch((error) => {
                        setErrorMessage(error.message);
                      });
                    console.log(user);
                    // navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`Error: ${errorMessage} (${errorCode})`); 
                });
        } else {
            console.log("Sign In");
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);  
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`Error: ${errorMessage} (${errorCode})`); 
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignINform(!isSignINform);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg" srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_small.jpg 959w" alt="" aria-hidden="true" className="default-ltr-cache-19j6xtr" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="text-3xl font-bold text-white">{isSignINform ? "Sign In" : "Sign Up"}</h1>
                {!isSignINform && <input ref={name} type="text" placeholder="Name" className="p-4 my-4 w-full bg-gray-700 " />} 
                <input ref={email} type="email" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700 " />
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
                <p className="text-red-500 font-bold py-2">{errorMessage}</p>
                <button className="bg-red-700 p-4 my-6 w-full rounded-lg" onClick={handleButtonClick}>{isSignINform ? "Sign In" : "Sign Up"} </button>
                <p className="text-center cursor-pointer" onClick={toggleSignInForm}>{isSignINform ? "New to Netflix? Sign up now." : "Already registered? Sign in now."}</p>
            </form>
        </div>
    );
};

export default Login;