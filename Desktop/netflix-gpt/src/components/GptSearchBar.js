import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResults } from '../utils/gptSlice';
import { useDispatch } from 'react-redux';
const { GoogleGenerativeAI } = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI("AIzaSyDh31d7Wh5SPQ88JVNUqUp45C9t00JwoJQ");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GptSearchBar = () => {

    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);

    const searchText = useRef(null);

    const searchMovieTMDB = async(movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
      const json = await data.json();
      return json.results;
    }

    const handleGptSearchClick = async() => {
        console.log(searchText.current.value);

        const gptQuery  = "Act as a movie recommendation system and recommend me a movie based on the following description: " + searchText.current.value + ". only give me names of 5 movies. comma separated like the example result below. Example: The Dark Knight, Inception, Interstellar, The Prestige, Memento";
        
        const prompt = gptQuery;
        const result = await model.generateContent(prompt);
        
        console.log(result.response.text());

        const gptMovies = result.response.text().split(', ');

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); 

        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);

        dispatch(addGptMoviesResults({movieNames: gptMovies, movieResults: tmdbResults}));
      }
      
  return (
    <div className = "pt-[10%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" placeholder={lang[langKey]?.gptSearchPlaceholder}  className = "p-4 m-4 col-span-9"/>
        <button className = "col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey]?.search}</button>
        </form>
    </div>
  );
}    


export default GptSearchBar;