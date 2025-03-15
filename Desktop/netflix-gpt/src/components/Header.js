import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';  
import {LOGO, SUPPORTED_LANGUAGES} from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
    
          }).catch((error) => {
            navigate("/error");
          });
    }

    useEffect(() => {
        console.log("Body component mounted");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid , email, displayName, photoURL} = user;
                dispatch(addUser({ uid : uid , email : email, displayName : displayName, photoURL : photoURL}));
                navigate("/browse");
            
            }
             else {
              dispatch(removeUser());
              navigate("/");
                
            }
          });

// unsubscribe when component unmounts
          return () => unsubscribe();          
          
    }, []);

    const handleGPTSearch = () => {
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
      console.log(e.target.value);
      dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className = "absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className = "w-44 mx-auto md:mx-0" src = {LOGO} alt = "Netflix Logo" />
            {user && (<div className = "flex p-2 items-center space-x-5 justify-between">
             {showGptSearch && 
              ( <select className = "p-2 m-2 bg-black text-white rounded lg" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>
            )}
            <button className='text-white py-2 px-4 mx-4 rounded-lg bg-red-600' onClick={handleGPTSearch}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
            <img className = " hidden md:block w-12 h-12"
             alt = "usericon" src = {user.photoURL} />
        <button onClick={handleSignOut} className = "bg-red-600 p-2 rounded-lg text-white ">Sign Out</button>
        </div>
)} 
   
        </div>
        
) };

export default Header;