import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllMovieShows from './Components/AllMovieShows';
import MovieList from './Components/MovieList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllMovieShows />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
