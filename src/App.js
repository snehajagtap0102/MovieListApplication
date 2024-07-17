import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllMovieShows from './Components/AllMovieShows';
import MovieTabs from './Components/MovieTabs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllMovieShows />}></Route>
        {/* <Route path='/' element={<MovieTabs />}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
