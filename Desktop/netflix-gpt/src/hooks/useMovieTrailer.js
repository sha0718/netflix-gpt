import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useSelector } from "react-redux";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const trailerVideo = useSelector(store => store.movies?.trailerVideo
    );

    const getMovieVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
        const json = await data.json();
        console.log(json);
        const trailer = json.results.filter((video) => video.type === "Trailer")[0];
        console.log(trailer);
        dispatch(addTrailerVideo(trailer));
        
    }
    
    useEffect(() =>
         {
           !trailerVideo && getMovieVideos();  
    }, []);

};

export default useMovieTrailer;