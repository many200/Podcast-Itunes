import React  from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PodcastContainer from './components/PodcastContainer';
import EpisodeDetalle from './components/EpisodeDetalle';
function App() {
  
  return (

<div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:podcastId" element={<PodcastContainer/>} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetalle/>} />
        
      </Routes>
    </div>
  );
}

export default App;