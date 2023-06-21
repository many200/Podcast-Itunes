import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Episodes from './Episodes';
import Img from '../200w.gif'


const PodcastContainer = () => {
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
      navigate('/')
    }
    const { collectionName, artworkUrl60, trackTimeMillis} = podcast;
    const releaseDat = podcast.releaseDate;
    const filteredDate = releaseDat.slice(0, 10);
    
    const totalSeconds = Math.floor(trackTimeMillis / 1000);

    // Conversion en heures
    const hours = Math.floor(totalSeconds / 3600);
    
    // Conversion en minutes
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    // Conversion en secondes
    const seconds = totalSeconds % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    


  return (
    <div className='detalle'>
     <h2 onClick={handleClick} className='title'>Podcaster</h2>
     <div className="detalle-content">
     <div className='detalle-left-content'>
      <div className='img-left-content'>
      <Link to={`/podcast/${podcastId}/episode/${podcast.trackId}`}>
              <img src={artworkUrl60} width='140px' alt="" />
            </Link>
      </div>

      <div className='title-left-content'>
   
      
      <p>
      {collectionName}
        </p> 
        <p>
      By : {podcast.trackName}
              </p>

      </div>

      <div className='description-left-content'>
        <h1>Descriptions  </h1>
        <p className='description'>{podcast.shortDescription || collectionName}</p>

      </div>

     </div>
     <div className='right-content'>
     <div className="first-detall-right-content">
     {<Episodes/>}
     </div>

     <div className="second-detall-right-content">
     {podcast.trackViewUrl && (
      <div className='first-title'>
        <div className='first-title-content'>
          <div className="data-first-title-content">
        <label >Title :</label>
        <label >Date :</label>
        <label >Duration :</label>

          </div>
           {/* <Episodes podcast={podcast}/> */}
        </div> 
        <Link to={`/podcast/${podcastId}/episode/${podcast.trackId}`} className='title'>
        <div className="data2-first-title-content">
        <label className='name-content' >{collectionName}</label>
        <label className='date-content' >{filteredDate}</label>
        <label className='time-content' >{formattedTime}</label>

          </div>
          </Link>
          <div>
                  <p dangerouslySetInnerHTML={{ __html: podcast.long}}></p>
                </div>
     
      </div>
      
      
    )}
     </div>

     </div>

     </div>
    </div>
  )
}

export default PodcastContainer
