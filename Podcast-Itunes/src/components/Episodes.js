import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PodcastContainer = () => {
  const [podcast, setPodcast] = useState(null);
  const { podcastId } = useParams();

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
          const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}`
          )}`;
          const response = await fetch(allOriginsUrl);
          const data = await response.json();
          const jsonData = await JSON.parse(data.contents);

          const podcastData = await jsonData.results[0];
          setPodcast(podcastData);
         
      
      }catch(error){
        console.error('errrrrrrooooooooor!', error);
      }
    }
      fetchPodcast()
      
}, [podcastId])
if (!podcast) {
  return <div>Loading...</div>;
}
   console.log(podcast);
    const {  trackCount} = podcast;
  return (
   <p>
   Episode : {trackCount
}
   </p>
  )
}

export default PodcastContainer
