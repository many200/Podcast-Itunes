import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Img from '../200w.gif'

const EpisodeDetalle = () => {
  const [podcast, setPodcast] = useState(null);
  const { podcastId } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPodcast = async () => {
      try {
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`
            
          )}`;
          const response = await fetch(allOriginsUrl);
          const data = await response.json();
          const jsonData = await JSON.parse(data.contents);
          const podcastData = await jsonData.results[1];
          setPodcast(podcastData);
       
      }catch(error){
        console.error('errrrrrrooooooooor!', error);
      }
    }
      fetchPodcast()
      
}, [podcastId])
if (!podcast) {
    return( 
        <div>
        <h3>Please wait the page is loading...</h3>
        <img src={Img} alt="" />
        </div>);
}
    const handleClick = (e) =>{
      e.preventDefault()
      window.localStorage.removeItem('podcastData')
        window.localStorage.removeItem('lastFetchTime')
      navigate(`/podcast/${podcastId}`)
    }
    const { collectionName, artworkUrl60} = podcast;
console.log(podcast);
  return (
    <div className='detalle'>
     <h2 onClick={handleClick} className='title'>Podcaster</h2>
     <div className="detalle-content">
     <div className='detalle-left-content'>
      <div className='img-left-content'>
        <img src={artworkUrl60} width='140px' alt="" />
           </div>

      <div className='title-left-content'>
        <p>{collectionName}</p> 
        <p>By : {podcast.trackName}</p>

      </div>

      <div className='description-left-content'>
        <h1>Descriptions : </h1>
        <p className='description'>{podcast.shortDescription || collectionName }</p>

      </div>

     </div>
     <div className='right-container'>
        <div className="home-right-container">

       
    <div className='content-right-containt'>
        <h1>{collectionName}</h1>
    </div>
    <div>
        <h4 className='long-description'>
            {podcast.description}
        </h4>
    </div>
    <div>
 <audio controls className='audio'>
   <source src={podcast.previewUrl} type="audio/mpeg" />
 </audio>
 </div> 
 </div>
     </div>

     </div>
    </div>
  )
}

export default EpisodeDetalle


