import Header from "./Header";
import { useState } from "react";

const Login = () => {

    const [isSignINform, setIsSignINform] = useState(true);

    const toggleSignInForm = () => {
        setIsSignINform(!isSignINform);
    }
  return (
    <div>
      <Header />
      <div className = "absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_small.jpg 959w" alt="" aria-hidden="true" class="default-ltr-cache-19j6xtr"/>
    </div>
    <form className = " w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
    <h1 className = "text-3xl font-bold text-white">{isSignINform ? "Sign In" : "Sign Up"}</h1>
   {!isSignINform && <input type="Full Name" placeholder="Name" className="p-4 my-4 w-full bg-gray-700 " />} 
        <input type="email" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700 " />
        <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
        <button className="bg-red-700 p-4 my-6 w-full rounded-lg">{isSignINform ? "Sign In" : "Sign Up"}</button>
        <p className="text-center cursor-pointer" onClick={toggleSignInForm}>{isSignINform ? "New to Netflix? Sign up now." : "Already registered? Sign in now."}</p>
    </form>
    </div>
  );
};  

export default Login;