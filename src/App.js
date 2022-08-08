import { useEffect, useState } from 'react';
import "./App.css";
import SearchIcon from "./Icons/search.svg";
import MovieCard from "./components/MovieCard.jsx"

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=8560b4e8';

// const movie1 = {
//     "Title": "Cars 3",
//     "Year": "2017",
//     "imdbID": "tt3606752",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTc0NzU2OTYyN15BMl5BanBnXkFtZTgwMTkwOTg2MTI@._V1_SX300.jpg"
// }

const App = () => {

    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(()=>{
        searchMovies('cars');
    },[]);

    return(
        <div className='app'>
            <h1>Popular</h1>

            <div className='search'>
                <input placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movie Found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;