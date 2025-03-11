import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMoies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies(); 
    useUpcomingMovies();  

    return (
        <div>
            <Header />
            <MainContainer />
            <SecondaryContainer />
        </div>
    );  
}
export default Browse;